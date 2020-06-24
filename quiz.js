const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerEl = document.getElementById("question-container");

let shuffledQuestions, currentQuestionIndex

const questionEl = document.getElementById("question");
const answerButtonEl = document.getElementById("answer-buttons");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startQuiz() {
    var sec = 25;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time is out!! :(");
    }
}
    startButton.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();

}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);


}

function showQuestion (question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
        answerButtonEl.appendChild(button)
    })
}
function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    }
}

function selectAnswer (e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.lenght > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");    
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass (element, correct) {
    clearStatusClass (element);
    if (correct) {
        element.classList.add("correct");
}
    else {
        element.classList.add("wrong");

    }
}
function clearStatusClass (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");

}


const questions = [
	{
		question: "What is does a variable store?",
		answers: [
            { text: "values", correct: true},
            { text: "nuts", correct: false},
            { text: "boxes", correct: false},
            { text: "all of the above", correct: false},
        ]
    },
    {
		question: "Where should you put the JavaScript <script> tag in the HTML?",
		answers: [
            { text: "header", correct: false},
            { text: "the top of the body", correct: false},
            { text: "the bottom of the body", correct: true},
            { text: "footer", correct: false},
        ]
    },
    {
		question: "JavaScript is the _________ of the body.",
		answers: [
            { text: "muscles", correct: true},
            { text: "bones", correct: false},
            { text: "skin", correct: false},
            { text: "eyes", correct: false},
        ]
    },
    {
		question: ".getElementById does what?",
		answers: [
            { text: "searches for an element with a matching class", correct: false},
            { text: "searches for an element with a mathcing id", correct: true}
        ]
    },
]