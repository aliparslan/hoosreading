require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);

// mapping user's choice to their level of reading
const mappings = {
    "A1": "lower elementary school student",
    "A2": "upper elementary school student",
    "B1": "middle school student",
    "B1+": "high school student",
    "B2": "college student",
    "Non-Technical": "layperson"
}

// global variable to keep track of user's query
let query = '';

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === "translate") {
        query = request.level;
        revertTextNodes(document.body);
        await modifyTextNodes(document.body, request.level);
    } else if (request.action === "revert") {
        revertTextNodes(document.body);
    }
});

async function callOpenAI(content) {
    // Log actions for debugging
    // console.log("Button clicked, level: " + query);
    // console.log("mapping: " + mappings[query]);
    // console.log("Original content being processed: " + content);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": `You are an assistant that listens to directions carefully. Take the following text and modify it so it is suitable for the reading comprehension of a ${mappings[query]}, but contains the same content and is about the same length. Only return the text, don't speak anything else. Ignore names, dates, metadata, and non-semantic texts.`
                },
                {
                    "role": "user",
                    "content": content
                }
            ]
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content; // Return the modified text
}

// Function to modify text nodes
async function modifyTextNodes(element) {
    if (['SCRIPT', 'STYLE', 'IFRAME', 'NOSCRIPT', 'BUTTON', 'INPUT', 'NAV'].includes(element.tagName)) {
        return;
    }
    if (element.nodeType === 3) {
        const trimmedText = element.textContent.trim();
        if (trimmedText && !element.originalText && trimmedText.length > 15) { // Store original text
            element.originalText = element.textContent;
            // element.textContent = '[Translated] ' + element.textContent;
            element.textContent = await callOpenAI(trimmedText); // call api
        }
    } else if (element.nodeType === 1) {
        element.childNodes.forEach(modifyTextNodes);
        // for (const child of element.childNodes) {
        //     await modifyTextNodes(child);
        // }
    }
}

// Function to revert text nodes to their original state
function revertTextNodes(element) {
    if (element.nodeType === 3 && element.originalText) {
        element.textContent = element.originalText;
        delete element.originalText;
    } else if (element.nodeType === 1) {
        element.childNodes.forEach(revertTextNodes);
    }
}

