  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "When was the NBA first founded?",
      answers: {
        a: "1990",
        b: "1872",
        c: "1945",
        d: "1946"
      },
      correctAnswer: "d"
    },
    {
      question: "Which player has the least championship rings",
      answers: {
        a: "Bill Russell",
        b: "Michael Jordan",
        c: "Wilt Chamberlain"
      },
      correctAnswer: "c"
    },
    {
      question: "What was Paul Georges number when he played for the Indiana Pacers?",
      answers: {
        a: "48",
        b: "24",
        c: "13",
        d: "23"
      },
      correctAnswer: "a"
    },
    {
      question: "Who is the greatest basketball player of all time?",
      answers: {
        a: "Michael Jordan",
        b: "Wilt Chamberlain",
        c: "Bill Russell"
      },
      correctAnswer: "a"
    },
    {
      question: "Which player is known for shifting the way the game of basketball is played today?",
      answers: {
        a: "Michael Jordan",
        b: "Wilt Chamberlain",
        c: "Steph Curry",
        d: "James Harden"
      },
      correctAnswer: "c"
    },
    {
      question: "Which team has won the most NBA Championships?",
      answers: {
        a: "New York Knicks",
        b: "Boston Celtics",
        c: "Los Angeles Lakers"
      },
      correctAnswer: "b"
    },
    {
      question: "What does NBA stand for?",
      answers: {
        a: "Nerd-based Athletics",
        b: "National Basketball Association",
        c: "The Wrong Answer"
      },
      correctAnswer: "b"
    },
    {
      question: "Which team does LeBron James play for?",
      answers: {
          a: "Washington Wizards",
          b: "Los Angeles Lakers",
          c: "Detroit Pistons"
      },
      correctAnswer: "b"
    },
    {
      question: "Which team did Michael Jordan play for?",
      answers: {
        a: "Washington Wizards",
        b: "Los Angeles Lakers",
        c: "Detroit Pistons"
      },
      correctAnswer: "a"
    },
    {
      question: "How many teams are in the NBA?",
      answers: {
        a: "4",
        b: "27",
        c: "30"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of these ISN'T a player position in the NBA?",
      answers: {
        a: "Point-Guard",
        b: "Center",
        c: "Sloppy Defence"
      },
      correctAnswer: "c"
    }
  ];


  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
