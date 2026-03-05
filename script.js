const questions = [
    {
        question: "Which city is famous for its canals and gondolas?",
        answers: [
            { text: "Venice", correct: true },
            { text: "Paris", correct: false },
            { text: "Amsterdam", correct: false },
            { text: "London", correct: false }
        ]
    },
    {
        question: "Where is the Great Barrier Reef located?",
        answers: [
            { text: "Brazil", correct: false },
            { text: "Australia", correct: true },
            { text: "South Africa", correct: false },
            { text: "Mexico", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultDisplay = document.getElementById("result-display");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        showFinalResult();
    }
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

function showFinalResult() {
    questionElement.innerText = "Quiz Completed!";
    resultDisplay.innerHTML = `<h3>Final Score: ${score} / ${questions.length}</h3>`;
    resultDisplay.classList.remove("hide");
    nextButton.innerText = "Restart";
    nextButton.classList.remove("hide");
    nextButton.onclick = () => location.reload();
}

startQuiz();
