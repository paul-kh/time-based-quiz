/* Pseudo code
> Render quizes
- Create elements
            > Container div
            > Row 1 > Col 1 > h3                    : for question
            > Row 2 > Col 1 to col 4 > 4 buttons    : for answer choices
            > Row 3 > col 1 > p                     : for showing result (correct or incorrect!)          
- Load data from the array Questions 
- Add Event listener to each answer choice button  !!!!! CHALLENGE: How to pause forEach loop for user to click a button?

> Verify user's answer
- compare user's answer to the value of answer key in the array questions
- Display result at the result bar for user to see
- Record result in an array
- if wrong answer > 0 then score = time remaining / #wrong answer
- if wrong answer = 0, then score = time remaining

> Set timer
- Start timer once the Start Quiz button is clicked

> Record user's score
- Render user's info: initial, score, button to save to local storeage
- 


*/

const startQuizBtnEl = document.getElementById("start-quiz-btn");
const containerEl = document.createElement("div");
let remainingTime = 75;
let userScores = [0];
let myInterval = null;



document.body.append(containerEl);
containerEl.setAttribute("class", "d-none");

// ================================================================================

function initQuiz() { // initialize quiz --------------------------------------------------------------

    const quizIntro = document.getElementById("quiz-intro");


    quizIntro.setAttribute("class", "d-none");
    // containerEl.setAttribute("class", "d-none");

} // end of initQuiz() ===============================================================================

function renderQuizzes() { // render quiz -------------------------------------------------------------------------

    let questionNum = 0;
    // create skelleton of question-answer container and elements
    containerEl.setAttribute("class", "container mt-5 bg-light");
    const questionRow = document.createElement("div");
    questionRow.setAttribute("class", "row");
    const questionCol = document.createElement("div");
    questionCol.setAttribute("class", "col");
    const questionContent = document.createElement("h3");
    const answersRow = document.createElement("div");
    answersRow.setAttribute("class", "row");
    const statusResultRow = document.createElement("div");
    const statusResultCol = document.createElement("div");
    const statusResultHtml = document.createElement("span");
    statusResultRow.setAttribute("class", "row");
    statusResultCol.setAttribute("class", "col-12");



    containerEl.append(questionRow);
    questionRow.append(questionCol);
    questionCol.append(questionContent);
    containerEl.append(answersRow);

    containerEl.append(statusResultRow);
    statusResultRow.append(statusResultCol);
    statusResultCol.append(statusResultHtml);

    // create 4 empty buttons for answer choices
    let btnAnswerChoices = [];
    for (let i = 0; i < 4; i++) {
        const answersCol = document.createElement("div");
        answersCol.setAttribute("class", "col-12 mt-1");
        const answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "btn btn-primary btn-sm");
        answersRow.append(answersCol);
        answersCol.append(answerBtn);
        btnAnswerChoices[i] = answerBtn;
    }

    // show each question
    function showNextQuestion(questionNum) {
        // pull question data from the array questions
        questionContent.innerText = questions[questionNum].title;
        // update innerText of each answer choice button with data from the Questions array
        for (let i = 0; i < 4; i++) {
            btnAnswerChoices[i].innerText = (i + 1) + ". " + questions[questionNum].choices[i];

        }

    } // end of showQuestion()

    // show first question
    showNextQuestion(questionNum);
    let userChoice = "";
    console.log("Answer should be :", questions[questionNum].answer);

    //add click event to each answer choice button to show next question
    for (let i = 0; i < 4; i++) {        
        btnAnswerChoices[i].addEventListener("click", function () {
            if (remainingTime <= 0){alert("timeup")};
            userChoice = btnAnswerChoices[i].innerText.substring(3, btnAnswerChoices[i].innerText.length);
            console.log("User chose :", userChoice);

            //compare user's choice to the correct answer in Questions array 
            if (userChoice === questions[questionNum].answer) {
                console.log("Correct!");
                // store the remaining time as the score for this correct answer in an array
                userScores.push(remainingTime);
                console.log("User scores: ", userScores);
                statusResultHtml.innerHTML = "Correct!";
                // Bonus: add audio when user answered correctly  
            } else { 
                statusResultHtml.innerHTML = "Wrong!"; 
                // deduct 15 seconds from remaining time
                remainingTime = remainingTime - 15;
                clearInterval(myInterval);
                startTimer(remainingTime);
                // Bonus: add audio when user answered incorrectly
            }
            console.log("Next Answer should be :", questions[questionNum].answer);
            console.log(questionNum);
            console.log("length: ", questions.length);

            // Check if reaching the last question

            setTimeout(function () {
                if (questionNum === questions.length - 1) {
                    console.log("no more question");
                    console.log("total score: ", totalScore());
                    // Hide the quiz container
                    containerEl.setAttribute("class", "d-none");
                    // Show form for user to put their initial
                    showUserForm();
                    // Show form for user to put their initial
                    // Save to local storage
                    save2LocalStorage();
                    return;
                }
                statusResultHtml.innerHTML = "";
                questionNum = questionNum + 1;
                showNextQuestion(questionNum);
            }, 500);

        });
    }
} // end of renderQuizzes()

function showUserForm() {

    document.getElementById("user-form").setAttribute("class", "container mt-5 bg-light");
    document.getElementById("user-score").innerHTML = "Your total score is <strong><span style='color:red'>" + totalScore(); +"</strong></span>";
    clearInterval(myInterval);
    document.getElementById("time").innerHTML = "";


}
function save2LocalStorage() {
    document.querySelector(".initial-js").addEventListener("click", function () {
        document.getElementById("user-form").setAttribute("class", "d-none");
        document.getElementById("high-score").setAttribute("class", "container mt-5 bg-light");
    });

    document.querySelector(".go-back-js").addEventListener("click", function () {
        document.getElementById("high-score").setAttribute("class", "d-none");
        location.reload();
    });
}
function startTimer(time) {
        myInterval = setInterval(function () {
        time = time - 1;
        remainingTime = time; // assign to global variable
        if (time <= 0) {
            clearInterval(myInterval);
            document.getElementById("time").innerHTML = "Remaining time (sec): 0";
            alert("Time is up");
            containerEl.setAttribute("class", "d-none");
            showUserForm();
        }  
        document.getElementById("time").innerHTML = "Remaining time (sec): " + remainingTime;
    }, 1000);
}
function totalScore(){
    let userScore = 0;
    for (let i = 0; i < userScores.length; i++){
        userScore = userScore + userScores[i];
    }
    return userScore;

}
function startQuiz() {

    startQuizBtnEl.addEventListener("click", function () {
        // execute initQuiz()
        startTimer(remainingTime);
        initQuiz();
        renderQuizzes(); // execute renderQuizzes()

    });

} // end of function startQuiz()


startQuiz();


