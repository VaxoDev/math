let questions = [
    { question: "რას უდრის 7 * 8?", answer: 56 },
    { question: "რას უდრის 12 * 5?", answer: 60 },
    { question: "გამოთვალეთ 15% 200-დან", answer: 30 },
    { question: "რას უდრის 9 * 7?", answer: 63 },
    { question: "გამოთვალეთ 25% 80-დან", answer: 20 },
    { question: "რას უდრის 6 * 9?", answer: 54 },
    { question: "გამოთვალეთ 10% 150-დან", answer: 15 },
    { question: "რას უდრის 13 * 4?", answer: 52 },
    { question: "გამოთვალეთ 50% 60-დან", answer: 30 },
    { question: "რას უდრის 11 * 6?", answer: 66 },
    { question: "გამოთვალეთ 20% 90-დან", answer: 18 },
    { question: "რას უდრის 14 * 3?", answer: 42 },
    { question: "გამოთვალეთ 30% 200-დან", answer: 60 },
    { question: "რას უდრის 8 * 7?", answer: 56 },
    { question: "გამოთვალეთ 40% 80-დან", answer: 32 },
    { question: "რას უდრის 5 * 16?", answer: 80 },
    { question: "გამოთვალეთ 5% 300-დან", answer: 15 },
    { question: "რას უდრის 9 * 6?", answer: 54 },
    { question: "გამოთვალეთ 60% 50-დან", answer: 30 },
    { question: "რას უდრის 7 * 12?", answer: 84 },
    { question: "გამოთვალეთ 35% 200-დან", answer: 70 },
    { question: "რას უდრის 18 * 4?", answer: 72 },
    { question: "გამოთვალეთ 45% 100-დან", answer: 45 },
    { question: "რას უდრის 13 * 5?", answer: 65 },
    { question: "გამოთვალეთ 70% 80-დან", answer: 56 },
    { question: "რას უდრის 6 * 15?", answer: 90 },
    { question: "გამოთვალეთ 80% 50-დან", answer: 40 },
    { question: "რას უდრის 17 * 3?", answer: 51 },
    { question: "გამოთვალეთ 55% 200-დან", answer: 110 },
    { question: "რას უდრის 8 * 9?", answer: 72 },
    { question: "გამოთვალეთ 65% 100-დან", answer: 65 },
    { question: "რას უდრის 14 * 6?", answer: 84 },
    { question: "გამოთვალეთ 75% 80-დან", answer: 60 },
    { question: "რას უდრის 11 * 7?", answer: 77 },
    { question: "გამოთვალეთ 85% 60-დან", answer: 51 },
    { question: "რას უდრის 16 * 5?", answer: 80 },
    { question: "გამოთვალეთ 95% 40-დან", answer: 38 },
    { question: "რას უდრის 9 * 8?", answer: 72 },
    { question: "გამოთვალეთ 22% 50-დან", answer: 11 },
    { question: "რას უდრის 12 * 7?", answer: 84 },
    { question: "გამოთვალეთ 18% 200-დან", answer: 36 },
    { question: "რას უდრის 15 * 4?", answer: 60 },
    { question: "გამოთვალეთ 33% 300-დან", answer: 99 },
    { question: "რას უდრის 13 * 6?", answer: 78 },
    { question: "გამოთვალეთ 28% 50-დან", answer: 14 },
    { question: "რას უდრის 7 * 14?", answer: 98 },
    { question: "გამოთვალეთ 42% 100-დან", answer: 42 },
    { question: "რას უდრის 19 * 3?", answer: 57 },
    { question: "გამოთვალეთ 88% 50-დან", answer: 44 }
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let numQuestions = 10;
let startTime;
let quizResults = [];

// DOM elements
const setupContainer = document.getElementById('setup-container');
const numQuestionsInput = document.getElementById('num-questions');
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-btn');
const quizInfoElement = document.getElementById('quiz-info');
const timeElement = document.getElementById('time');
const remainingValueElement = document.getElementById('remaining-value');
const scoreValueElement = document.getElementById('score-value');
const resultContainer = document.getElementById('result-container');
const feedbackElement = document.getElementById('feedback');
const questionReviewElement = document.getElementById('question-review');
const restartButton = document.getElementById('restart-btn');

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startQuiz() {
    numQuestions = parseInt(numQuestionsInput.value) || 10;
    startTime = Date.now();
    setupContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    quizInfoElement.style.display = 'flex';
    shuffleQuestions();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timeElement.textContent = timeLeft;
    startTimer();
}

function loadQuestion() {
    resetTimer();
    questionElement.textContent = questions[currentQuestionIndex].question;
    answerInput.value = '';
    answerInput.focus();
    remainingValueElement.textContent = numQuestions - currentQuestionIndex;
}

function showCorrectAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answer;
    window.alert(`Time's up! The correct answer was: ${correctAnswer}`);
    quizResults.push({
        question: questions[currentQuestionIndex].question,
        correctAnswer: correctAnswer,
        userAnswer: "No answer",
        isCorrect: false
    });
    proceedToNextQuestion();
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim();

    if (userAnswer === "") {
        alert("Please enter an answer before submitting!");
        return;
    }

    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = parseFloat(userAnswer) === correctAnswer || userAnswer === correctAnswer.toString();

    quizResults.push({
        question: questions[currentQuestionIndex].question,
        correctAnswer: correctAnswer,
        userAnswer: userAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        score++;
        scoreValueElement.textContent = score;
    }
    proceedToNextQuestion();
}

function proceedToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < numQuestions) {
        loadQuestion();
    } else {
        clearInterval(timer);
        questionContainer.style.display = 'none';
        quizInfoElement.style.display = 'none';
        showResults();
    }
}

function showResults() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const percentageCorrect = (score / numQuestions) * 100;

    let feedbackMessage = getFeedbackMessage(percentageCorrect);

    let resultHTML = `
        <h2>Quiz Results</h2>
        <p>You answered ${score} out of ${numQuestions} questions correctly.</p>
        <p>Total time: ${totalTime} seconds.</p>
        <p>Percentage correct: ${percentageCorrect.toFixed(2)}%</p>
        <p><strong>${feedbackMessage}</strong></p>
    `;

    feedbackElement.innerHTML = resultHTML;

    let reviewHTML = '<h3>Question Review:</h3>';
    quizResults.forEach((result, index) => {
        reviewHTML += `
            <div class="question-review ${result.isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Question ${index + 1}:</strong> ${result.question}</p>
                <p>Your answer: ${result.userAnswer}</p>
                <p>Correct answer: ${result.correctAnswer}</p>
                <p>${result.isCorrect ? '✓ Correct' : '✗ Incorrect'}</p>
            </div>
        `;
    });

    questionReviewElement.innerHTML = reviewHTML;
    resultContainer.style.display = 'block';
}

function getFeedbackMessage(percentageCorrect) {
    if (percentageCorrect === 100) {
        return "Perfect score! Excellent work!";
    } else if (percentageCorrect >= 90) {
        return "Outstanding performance! Keep up the great work!";
    } else if (percentageCorrect >= 80) {
        return "Great job! You have a strong grasp of the material.";
    } else if (percentageCorrect >= 70) {
        return "Good effort! There's room for improvement, but you're on the right track.";
    } else if (percentageCorrect >= 60) {
        return "You're making progress. Keep practicing to improve your score.";
    } else if (percentageCorrect >= 50) {
        return "You're halfway there. With more practice, you can definitely improve.";
    } else {
        return "Don't be discouraged. Keep studying and try again. You can do it!";
    }
}

submitButton.addEventListener('click', checkAnswer);

answerInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

startButton.addEventListener('click', startQuiz);

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizResults = [];
    resultContainer.style.display = 'none';
    setupContainer.style.display = 'block';
    scoreValueElement.textContent = '0';
    numQuestionsInput.value = '10';
});