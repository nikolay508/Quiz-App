const questions = [
    {
        question: 'Who is the best football player?',
        answers: [
            { text: 'Messi', correct: false},
            { text: 'Ronaldo', correct: true},
            { text: 'Ronaldinho', correct: false},
            { text: 'Garnacho', correct: false},
        ]
    },
    {
        question: 'Who is the best basketball player?',
        answers: [
            { text: 'Jordan', correct: true},
            { text: 'Kobe', correct: false},
            { text: 'Lebron', correct: false},
            { text: 'Shaq', correct: false},
        ] 
    },
    {
        question: 'How many champions leagues does Real Madrid has?',
        answers: [
            { text: '10', correct: false},
            { text: '14', correct: true},
            { text: '2', correct: false},
            { text: '0', correct: false},
        ]
    },
    {
        question: 'How many champions leagues does Bayern Munich has?',
        answers: [
            { text: '100', correct: false},
            { text: '18', correct: false},
            { text: '7', correct: false},
            { text: '6', correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();