const questions = [
  {
    question: "What does a large language model actually predict?",
    options: [
      "The next token",
      "The entire paragraph",
      "The final answer",
      "The user's intention"
    ],
    answer: "The next token"
  },
  {
    question: "In the commit-message format used in this course, what comes before the colon?",
    options: [
      "The type, such as feat or fix",
      "The filename",
      "The programmer name",
      "The date"
    ],
    answer: "The type, such as feat or fix"
  },
  {
    question: "What must a unit test do before the bug is fixed?",
    options: [
      "Fail",
      "Pass",
      "Stop running",
      "Delete the code"
    ],
    answer: "Fail"
  },
  {
    question: "Where should the styling for a webpage live?",
    options: [
      "In a separate CSS file",
      "Inside Python",
      "Inside the browser console",
      "Inside a text file"
    ],
    answer: "In a separate CSS file"
  },
  {
    question: "What does a loop inside another loop usually mean for time complexity?",
    options: [
      "It is quadratic",
      "It is constant",
      "It is logarithmic",
      "It has no complexity"
    ],
    answer: "It is quadratic"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");
const quizCard = document.querySelector(".quiz-card");
const resultCard = document.getElementById("resultCard");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");

function showQuestion() {
  answered = false;
  const questionData = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  questionElement.textContent = questionData.question;
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressPercent.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(progress));
  optionsElement.replaceChildren();
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "See my score"
    : "Next question";

  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option, button));
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption, selectedButton) {
  if (answered) return;
  answered = true;

  const correctAnswer = questions[currentQuestion].answer;
  const optionButtons = optionsElement.querySelectorAll("button");

  optionButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedOption === correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct! Well done.";
    feedbackElement.classList.add("success");
  } else {
    selectedButton.classList.add("incorrect");
    feedbackElement.textContent = `Not quite. The correct answer is: ${correctAnswer}`;
    feedbackElement.classList.add("error");
  }

  nextButton.disabled = false;
}

function showResults() {
  quizCard.hidden = true;
  resultCard.hidden = false;
  finalScore.textContent = `${score} / ${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent = "Perfect score! Excellent work.";
  } else if (score >= 3) {
    resultMessage.textContent = "Good effort! Review the questions and try again.";
  } else {
    resultMessage.textContent = "Keep practising. You will improve with every attempt.";
  }
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultCard.hidden = true;
  quizCard.hidden = false;
  showQuestion();
});

showQuestion();
