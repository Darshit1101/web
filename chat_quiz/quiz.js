const quizData = [
    // ... (previous questions)

    {
        question: "What is the largest mammal?",
        answers: {
            a: "Elephant",
            b: "Blue Whale",
            c: "Giraffe"
        },
        correctAnswer: "b"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: {
            a: "William Shakespeare",
            b: "Charles Dickens",
            c: "Jane Austen"
        },
        correctAnswer: "a"
    },
    // Add more questions...
];

const quizContainer = document.getElementById("quiz");
const feedbackContainer = document.getElementById("feedback");
const progressContainer = document.getElementById("progress");
const submitButton = document.getElementById("submitBtn");
const resultsContainer = document.getElementById("results");

let currentQuestion = 0;
let score = 0;

function buildQuiz() {
    const output = [];
    const progressBarWidth = (currentQuestion / quizData.length) * 100;

    progressContainer.innerHTML = `<div class="progress-bar" style="width: ${progressBarWidth}%;"></div>`;

    const question = quizData[currentQuestion];
    const answers = [];

    for (const choice in question.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question${currentQuestion}" value="${choice}">
                ${choice}: ${question.answers[choice]}
            </label>`
        );
    }

    output.push(
        `<div class="question">${currentQuestion + 1}. ${question.question}</div>
        <div class="answers">${answers.join("")}</div>`
    );

    quizContainer.innerHTML = output.join("");
}

function showFeedback(isCorrect) {
    const feedback = isCorrect ? "Correct!" : "Incorrect!";
    feedbackContainer.innerHTML = feedback;
}

function submitQuiz() {
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestion}"]:checked`);

    if (!selectedAnswer) {
        feedbackContainer.innerHTML = "Please select an answer.";
        return;
    }

    const userAnswer = selectedAnswer.value;
    const question = quizData[currentQuestion];

    if (userAnswer === question.correctAnswer) {
        score++;
    }

    showFeedback(userAnswer === question.correctAnswer);

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        buildQuiz();
    } else {
        displayResults();
    }
}

function displayResults() {
    const percentageScore = (score / quizData.length) * 100;
    const grade = getGrade(percentageScore);

    resultsContainer.innerHTML = `
        <p>Your Score: ${score} out of ${quizData.length}</p>
        <p>Percentage: ${percentageScore.toFixed(2)}%</p>
        <p>Grade: ${grade}</p>
    `;
}

function getGrade(percentageScore) {
    if (percentageScore >= 90) return "A";
    if (percentageScore >= 80) return "B";
    if (percentageScore >= 70) return "C";
    if (percentageScore >= 60) return "D";
    return "F";
}

buildQuiz();
