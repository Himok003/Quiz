const DATA = [
    {
        question: 'Ko nozīmē pieauguša kaķa mijāšana priekš cilvēka?',
        answers: [
            { id: '1', value: 'Prasība pēc ēdiena', correct: true },
            { id: '2', value: 'Sveiciens', correct: false },
            { id: '3', value: 'Slimības pazīme', correct: false },
            { id: '4', value: 'Simpatijas izrādīšana', correct: false },
        ]
    },
    {
        question: 'Kuru nojūtu kaķiem ir vislabāk attīstīta?',
        answers: [
            { id: '5', value: 'Oža', correct: false },
            { id: '6', value: 'Dzirdes', correct: true },
            { id: '7', value: 'Redzes', correct: false },
            { id: '8', value: 'Taktīlā uztvere', correct: false },
        ]
    },
    {
        question: 'Cik parasti ir kaķiem dzirksteles?',
        answers: [
            { id: '9', value: '2', correct: false },
            { id: '10', value: '8', correct: false },
            { id: '11', value: '4', correct: true },
            { id: '12', value: '6', correct: false },
        ]
    },
    {
        question: 'Kā sauc par ieradumu, kad kaķi mauc ar mājām?',
        answers: [
            { id: '13', value: 'Mauslēgums', correct: true },
            { id: '14', value: 'Čirpums', correct: false },
            { id: '15', value: 'Nejēga', correct: false },
            { id: '16', value: 'Slīpēšana', correct: false },
        ]
    },
    {
        question: 'Kuru kaķu šķiru uzskata par lielāko pēc izmēra?',
        answers: [
            { id: '17', value: 'Siāmas kaķis', correct: false },
            { id: '18', value: 'Meinkūns', correct: true },
            { id: '19', value: 'Bengalskais kaķis', correct: false },
            { id: '20', value: 'Skotu viseplis', correct: false },
        ]
    },
    {
        question: 'Kā saucas mājas kaķa zinātniskais nosaukums?',
        answers: [
            { id: '21', value: 'Felis catus', correct: true },
            { id: '22', value: 'Panthera tigris', correct: false },
            { id: '23', value: 'Canis lupus', correct: false },
            { id: '24', value: 'Mus musculus', correct: false },
        ]
    },
    {
        question: 'Kuru kaķu orgānu ļauj tiem redzēt tumšā?',
        answers: [
            { id: '25', value: 'Ragveida plēve', correct: false },
            { id: '26', value: 'Pupiņas', correct: false },
            { id: '27', value: 'Krustiņi', correct: false },
            { id: '28', value: 'Tīklenes', correct: true },
        ]
    },
    {
        question: 'Kā saucas spēja, kas ļauj kaķiem kritīt uz kājām?',
        answers: [
            { id: '29', value: 'Kanāpa', correct: false },
            { id: '30', value: 'Gimnastika', correct: false },
            { id: '31', value: 'Koordinācija', correct: true },
            { id: '32', value: 'Kinētika', correct: false },
        ]
    },
    {
        question: 'Kāda ir kaķa vilnas krāsa, kurā apvienotas melnas un sarkanās plankumi?',
        answers: [
            { id: '33', value: 'Trīskrāsains', correct: false },
            { id: '34', value: 'Pelēks', correct: false },
            { id: '35', value: 'Rudiņš', correct: false },
            { id: '36', value: 'Tartāns', correct: true },
        ]
    },
    {
        question: 'Kādu raksturīgu skaņu izdara kaķis medīšanas laikā?',
        answers: [
            { id: '37', value: 'Miaukšana', correct: false },
            { id: '38', value: 'Čīrkšana', correct: true },
            { id: '39', value: 'Rronēšana', correct: false },
            { id: '40', value: 'Sūkšana', correct: false },
        ]
    },

];

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);
    
    questions.dataset.currentStep = index;
    
    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item-question">${DATA[index].question}</div>
            <ul class="quiz-questions-item-answers">${renderAnswers()}</ul>
        </div>
    `;
    // Логика рендеринга вопросов здесь
};

const renderResults = () => {
    let content = '';
	
	const getClassName = (answer, questionIndex) => {
		let className = '';
		
		if (!answer.correct && answer.id === localResults[questionIndex]){
			className = 'answer--invalid';
		}else if (answer.correct) {
			className = 'answer--valid';
			
		}
		
		return className;
	};
    
    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answer) => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
        .join('');
    
    DATA.forEach((question, index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item-question">${question.question}</div>
                <ul class="quiz-results-item-answers">${getAnswers(index)}</ul>
            </div>
        `;
    });
    results.innerHTML = content;
    results.classList.add('results--visible');
    questions.classList.add('questions--hidden');
    indicator.classList.add('indicator--hidden');
    btnNext.classList.add('btn-next--hidden');
    btnRestart.classList.add('btn-restart--visible');
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
    // Логика рендеринга индикатора здесь
};

quiz.addEventListener('change', (event) => {
    // Логика ответа здесь
    if (event.target.classList.contains('answer-input')) {
        console.log('input');
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    // Логика перезапуска или перехода к следующему вопросу здесь
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
        
        if (DATA.length === nextQuestionIndex) {
            renderResults();
            showNotification();

        } else {
            renderQuestions(nextQuestionIndex);
        }
        
        btnNext.disabled = true;
    }
    
    if (event.target.classList.contains('btn-restart')) {
		localResults = {};
		results.innerHTML = '';

        // Логика перезапуска теста
        questions.classList.remove('questions--hidden');
        results.classList.remove('results--visible');
        indicator.classList.remove('indicator--hidden');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        renderQuestions(0);
    }
});

const showNotification = () => {
    const correctAnswersCount = DATA.filter((question, index) => {
        const userAnswer = localResults[index];
        const correctAnswer = question.answers.find(answer => answer.correct);
        return userAnswer == correctAnswer.id;
    }).length;

    notification.innerHTML = `Pareizo atbilžu skaits: ${correctAnswersCount}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000); 
};

renderQuestions(0);
