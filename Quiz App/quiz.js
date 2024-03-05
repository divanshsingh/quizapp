const questions = [
    {
        question: "What is the capital city of Australia?",
        answer: [
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Brisbane", correct: false}
        ]
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"',
        answer: [
            {text: "William Wordsworth", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Jane Austen", correct: false},
            {text: "Charles Dickens", correct: false}
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: [
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},
            {text: "Mars", correct: false}
        ]
    },
    {
        question: "Which ocean is the largest in the world?",
        answer: [
            {text: "Indian Ocean", correct: false},
            {text: "Atlantic Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answer: [
            {text: "Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: " Vincent van Gogh", correct: false},
            {text: "Michelangelo", correct: false}
        ]
    }
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answer.forEach((answer)=>{
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener("click", selectAnswer)
    })

}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Start Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz()