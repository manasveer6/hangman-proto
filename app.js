let letterCount = 0;
let maxLetterCount;
let word = [];
let answerWord = "tea";
let wrongAttemptCount = 0;
const maxAttemptCount = 7;

function fetchData() {
  maxLetterCount = 0;

  fetch("https://random-word-api.herokuapp.com/word")
    .then((response) => response.json())
    .then((data) => {
      answerWord = data[0];
      maxLetterCount = answerWord.length;
      console.log(data, maxLetterCount);

      if (maxLetterCount > 7) {
        fetchData();
      } else {
        for (let i = 0; i < maxLetterCount; i++) {
          let newQLetter = document.createElement("div");
          newQLetter.classList.add("q-letter");
          document.querySelector(".words").appendChild(newQLetter);
        }
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

fetchData();

const indicateWrongWord = (event) => {
  wrongAttemptCount++;

  $(`.${event}`).css("filter", "brightness(0.5)");

  setTimeout(() => {
    $("body").css("background-color", "white");
  }, 100);
  $("body").css("background-color", "red");

  if (wrongAttemptCount == 1) {
    document.getElementsByClassName("game-part")[0].style.opacity = 1;
    document.getElementsByClassName("game-part")[1].style.opacity = 1;
  } else {
    document.getElementsByClassName("game-part")[
      wrongAttemptCount
    ].style.opacity = 1;
  }
};

const indicateCorrectWord = (event) => {
  $(`.${event}`).css("filter", "brightness(0.5)");
  console.log(`letter ${event}`);
  setTimeout(() => {
    $("body").css("background-color", "white");
  }, 100);
  $("body").css("background-color", "green");
};

// function setWord(event) {

//     if(letterCount < maxLetterCount) {
//         $(".q-letter")[letterCount].innerHTML = event;
//         word.push(event);
//         console.log(word);
//         console.log(word.join(''));
//         letterCount++;
//     }
//     if(letterCount === maxLetterCount){

//         let userWord = word.join('');

//         if(userWord === answerWord) {
//             setTimeout(() => {
//                 $("body").css("background-color", "white");
//             }, 100);
//             $("body").css("background-color", "green");
//         }

//         else {
//             setTimeout(() => {
//                 $("body").css("background-color", "white");
//             }, 100);
//             $("body").css("background-color", "red");
//         }
//     }
// }

function setWord(event) {
  console.log(event);

  if (answerWord.includes(event)) {
    for (let i = 0; i < maxLetterCount; i++) {
      if (answerWord[i] === event) {
        $(".q-letter")[i].innerHTML = event;
      }
    }
    indicateCorrectWord(event);
  } else {
    indicateWrongWord(event);
  }
}

$(".letter").on("click", function() {
  setWord(this.innerHTML.toLowerCase());
});

$(document).on("keydown", function(event) {
  console.log(event.key);
  if (/^[a-zA-Z]$/.test(event.key)) {
    setWord(event.key.toLowerCase());
  }
});
