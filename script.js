// Travel Quiz Data
const quizData = [
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        correct: 1 // Japan is at index 1
    },
    {
        question: "In which city would you find the Colosseum?",
        options: ["Paris", "Athens", "Rome", "Madrid"],
        correct: 2 // Rome is at index 2
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Malta", "Vatican City", "San Marino"],
        correct: 2 // Vatican City is at index 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Selecting Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreArea = document.getElementById("score-area");

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hidden");
    scoreArea.classList.add("hidden");
    showQuestion();
}

// Function to display a question
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(selectedIndex, button) {
    let correctIndex = quizData[currentQuestionIndex].correct;
    
    // Disable all buttons after selection
    const allButtons = optionsContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        button.style.backgroundColor = "#55efc4"; // Green for Correct
        score++;
    } else {
        button.style.backgroundColor = "#ff7675"; // Red for Wrong
        allButtons[correctIndex].style.backgroundColor = "#55efc4"; // Show the right one
    }

    nextButton.classList.remove("hidden");
}

// Function for Next Button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = "Quiz Completed!";
    scoreArea.innerHTML = `<h3>You scored ${score} out of ${quizData.length}! 🌍</h3>`;
    scoreArea.classList.remove("hidden");
    nextButton.innerText = "Restart Quiz";
    nextButton.classList.remove("hidden");
    nextButton.onclick = () => location.reload(); // Simple reload to restart
}

// Initialize the quiz
startQuiz();
