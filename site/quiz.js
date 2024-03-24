var comprehensionData = [
    //array of comprension objects 
    {
        // Level 1: Lower Elementary comprehension object
        level: "1",
        title: "Memories of my first day at school",
        passages: ["I remember my first day at school very well. I knew the school quite well because my older sister, Sandy, went there and every day, dad and I met her at the school gate after school. Every day, she ran out of the school with her friends. She often carried a painting. I felt jealous. I wanted to paint too!",
         "I was five years old when I started school. Most children in my class started school in September, but I started school in January, when I was five years old, because my birthday is in December. Three other kids started school on the same day as me. I was excited about my first day. I had my new uniform: a black skirt, a white t-shirt and green jumper, and a new red bag. When we arrived that day, a teacher met the new children at the school gate. Dad hugged me and said goodbye. I stood with the other children. I didn’t talk to them because I was too nervous. Then, Mrs Wilson took us to our classroom. All the other children were already there. They looked at us when we entered the room. When thirty children looked at me, I started to cry!", 
         "But I wasn’t upset for long. I sat with the other children on the carpet and the class teacher, Miss Holland, read us a story. Later, we drew pictures with coloured pencils, and at break time, I made friends with a girl called Megan. At the end of the day, I ran to the school gate with Megan and my picture, just like Sandy always did."],
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
                question: "On the first day, the writer ___.",
                options: ["painted a picture", "learned to write", "listened to a story"],
                answer: "other children looked at her"
            } 
        ]
        // Level 2 comprehension object
    {
        level: "2",
        title: "An Adventure in the Forest",
        passages: ["It was a bright morning when we decided to ..."],
        citation: "Retrieved from https://example.com/",
        questions: [
            {
                question: "The group decided to explore the forest because they wanted to _____.",
                options: ["find a lost treasure", "study nature", "get some exercise"],
                answer: "study nature"
            }
    }
]
// Function to get the level from the URL parameter
function getLevelFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('level') || '1';  // Default to level 1 if no parameter is found
}

// Function to display the comprehension for a given level
function displayComprehensionForLevel(level) {
    const comprehensionLevelData = comprehensionData.find(data => data.level === `Level ${level}`);
    if (!comprehensionLevelData) {
        console.error('No comprehension data found for level', level);
        return;
    }

    var quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    var levelHeading = document.createElement('h2');
    levelHeading.innerText = comprehensionLevelData.level;
    quizContainer.appendChild(levelHeading);

    var passageTitle = document.createElement('h3');
    passageTitle.innerText = comprehensionLevelData.title;
    quizContainer.appendChild(passageTitle);

    comprehensionLevelData.passages.forEach(function(paragraphText) {
        var paragraph = document.createElement('p');
        paragraph.innerText = paragraphText;
        quizContainer.appendChild(paragraph);
    });

    comprehensionLevelData.questions.forEach(function(questionObj, questionIndex) {
        var questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        var questionText = document.createElement('p');
        questionText.innerText = questionObj.question;
        questionDiv.appendChild(questionText);

        questionObj.options.forEach(function(option, optionIndex) {
            var optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.id = `q${questionIndex}opt${optionIndex}`;
            optionInput.name = `question${questionIndex}`;
            optionInput.value = option;

            var optionLabel = document.createElement('label');
            optionLabel.htmlFor = optionInput.id;
            optionLabel.innerText = option;

            questionDiv.appendChild(optionInput);
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(questionDiv);
    });

    var submitButton = document.createElement('button');
    submitButton.innerText = 'Submit Quiz';
    submitButton.onclick = submitQuiz; // assuming you have defined submitQuiz
    quizContainer.appendChild(submitButton);
}

function submitQuiz() {
    var correctAnswersCount = 0;
    var level = getLevelFromURL();
    var comprehensionLevelData = comprehensionData.find(data => data.level === level);

    comprehensionLevelData.questions.forEach(function(questionObj, index) {
        var selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === questionObj.answer) {
            correctAnswersCount++;
        }
    });

    var score = (correctAnswersCount / comprehensionLevelData.questions.length) * 100;
    alert(`Your score is ${score}%`);

    if (score >= 80) {
        alert('Congratulations! You have passed this level.');
        if (level < 5) {
            var nextLevel = parseInt(level) + 1;
            var nextLevelButton = document.createElement('button');
            nextLevelButton.innerText = `Proceed to Level ${nextLevel}`;
            nextLevelButton.addEventListener('click', function() {
                window.location.href = `quiz.html?level=${nextLevel}`;
            });
            quizContainer.appendChild(nextLevelButton);
        } else {
            alert('You have reached the highest level available.');
        }
    } else {
        alert(`You scored below an 80. Based on these results, we conclude that this current reading level (${comprehensionLevelData.title}) aligns with your reading abilities.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const level = getLevelFromURL();
    displayComprehensionForLevel(level);
});
function submitQuiz() {
    var correctAnswersCount = 0;
    var level = getLevelFromURL();
    var comprehensionLevelData = comprehensionData.find(data => data.level === level);

    comprehensionLevelData.questions.forEach(function(questionObj, index) {
        var selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === questionObj.answer) {
            correctAnswersCount++;
        }
    });

    var score = (correctAnswersCount / comprehensionLevelData.questions.length) * 100;
    alert(`Your score is ${score}%`);

    if (score >= 80) {
        alert('Congratulations! You have passed this level.');
        if (level < 5) {
            var nextLevel = parseInt(level) + 1;
            var nextLevelButton = document.createElement('button');
            nextLevelButton.innerText = `Proceed to Level ${nextLevel}`;
            nextLevelButton.addEventListener('click', function() {
                window.location.href = `quiz.html?level=${nextLevel}`;
            });
            quizContainer.appendChild(nextLevelButton);
        } else {
            alert('You have reached the highest level available.');
        }
    } else {
        alert(`You scored below an 80. Based on these results, we conclude that this current reading level (${comprehensionLevelData.title}) aligns with your reading abilities.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const level = getLevelFromURL();
    displayComprehensionForLevel(level);
});



// Ensure this function is called when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const level = getLevelFromURL();
    displayComprehensionForLevel(level);
});