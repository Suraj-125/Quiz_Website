let currentQuestionindex = 0;
let score = 0;
let timer ;

const questionContainer = document.getElementById("question-container");
const resultContainer= document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-btn");

//Fetch questions from the local json file

fetch('questions.json').then(response=>response.json()).then(questions=>{
    //Display the first question
    displayQuestion(questions[currentQuestionindex]);

    //Start the timer for the first question
    startTimer(10);

    //Event Listner for the next button

    nextButton.addEventListener("click",()=>{
        clearTimeout(timer);
        const selectOption = document.querySelector("input[type='radio']:checked");

        //Check if an option is selected

        if(selectOption){
            if(selectOption.value === questions[currentQuestionindex].correctAnswer){
                score ++ ;
            }

            //move to the next question or display the result

            currentQuestionindex++;
            if(currentQuestionindex < questions.length){
                
                startTimer(10);
                displayQuestion(questions[currentQuestionindex]);
            }else{
                displayResult();
            }
            //Clear the selected option

            selectOption.checked = false;
        }
    });
});

//Function to display a question

function displayQuestion(question){
    questionContainer.innerHTML=`<h2>${question.question}</h2>
    ${question.options.map(option =>`
    <label class="option">
    <input class="radio" type="radio" name="option" value="${option}">${option}</label></br>`).join("")          
    }`;
}

//Function to display a the final result

function displayResult(){
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    scoreDisplay.textContent = `${score}/${currentQuestionindex}`;
}

//Function to start the timer

function startTimer(seconds){
    let timeLeft = seconds;
    updateTimerDisplay = (timeLeft);
    timer = setInterval (() => {
        timeLeft--;

        //Update the timer display

        updateTimerDisplay(timeLeft);

        //Check if the time has ran out

        if(timeLeft<=0){
            clearTimeout(timer);

            //Move to the next question or display the result
            currentQuestionindex++;
            if(currentQuestionindex<questions.length){
                displayQuestion(questions[currentQuestionindex]);
                //Start the timer for the next question

                startTimer(10);
            }else{
                displayResult();
            }
        }
    },1000);
}

//Function to update the timer display

function updateTimerDisplay(seconds){
    const timerDisplay = document.getElementById("timer-display");
    timerDisplay.textContent= `Time Left : ${seconds}s`;
}