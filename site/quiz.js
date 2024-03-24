var comprehensionData = [
    //array of comprension objects 
    {
        paragraph: "I remember my first day at school very well. I knew the school quite well because my older sister, Sandy, went there and every day, dad and I met her at the school gate after school. Every day, she ran out of the school with her friends. She often carried a painting. I felt jealous. I wanted to paint too! I was five years old when I started school. Most children in my class started school in September, but I started school in January, when I was five years old, because my birthday is in December. Three other kids started school on the same day as me. I was excited about my first day. I had my new uniform: a black skirt, a white t-shirt and green jumper, and a new red bag. When we arrived that day, a teacher met the new children at the school gate. Dad hugged me and said goodbye. I stood with the other children. I didn’t talk to them because I was too nervous. Then, Mrs Wilson took us to our classroom. All the other children were already there. They looked at us when we entered the room. When thirty children looked at me, I started to cry! But I wasn’t upset for long. I sat with the other children on the carpet and the class teacher, Miss Holland, read us a story. Later, we drew pictures with coloured pencils, and at break time, I made friends with a girl called Megan. At the end of the day, I ran to the school gate with Megan and my picture, just like Sandy always did.",
        questions: [
            { 
                question: "The writer was jealous of Sandy because she _____ at school.",
                options: ["learned to write", "painted pictures", "had many friends"],
                answer: "painted pictures"
            }, 
            {
                question: "The writer started school in ___.",
                options: ["September", "December", "January"],
                answer: "January"
            },
            {
                question: "The writer and ___ other children started school that day.",
                options: ["three", "five", "ten"],
                answer: "three"
            },
            {
                question: "Before the writer started school, she felt ___.",
                options: ["excited", "nervous", "upset"],
                answer: "excited"
            },
            {
                question: "The writer started to cry when ___.",
                options: ["she entered the school", "other children looked at her", "her father left"],
                answer: "other children looked at her"
            },
            {
                question: "The writer started to cry when ___.",
                options: ["painted a picture", "learned to write", "listened to a story"],
                answer: "other children looked at her"
            } 
        ]
    }
]

function displayRandomComprehension() {
    var randomIndex = Math.floor(Math.random() * comprehensionData.length);
    var selectedComprehension = comprehensionData[randomIndex];
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''); // For labeling options

    // Set the comprehension paragraph text
    document.getElementById('comprehension-paragraph').innerText = selectedComprehension.paragraph;

    // Clear previous questions
    var quizQuestionsContainer = document.getElementById('quiz-questions');
    quizQuestionsContainer.innerHTML = '';

    // Create and append question elements with multiple choice options
    selectedComprehension.questions.forEach(function(questionObj, questionIndex) {
        var questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        var questionParagraph = document.createElement('p');
        questionParagraph.innerText = questionObj.question;
        questionDiv.appendChild(questionParagraph);

        // Generate multiple choice options
        questionObj.options.forEach(function(option, optionIndex) {
            var optionId = 'question' + questionIndex + '_option' + optionIndex;
            var optionLabelLetter = alphabet[optionIndex] + '. ';

            var optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.id = optionId;
            optionInput.name = 'question' + questionIndex;
            optionInput.value = option;
            
            var optionLabel = document.createElement('label');
            optionLabel.htmlFor = optionId;
            optionLabel.innerText = optionLabelLetter + option;

            questionDiv.appendChild(optionInput);
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br')); // For readability
        });

        quizQuestionsContainer.appendChild(questionDiv);
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayRandomComprehension);
