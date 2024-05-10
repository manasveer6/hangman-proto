var letterCount = 0;
var maxLetterCount;
var word = [];
var answerWord = "tea";

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
        for (var i = 0; i < maxLetterCount; i++) {
          var newQLetter = document.createElement("div");
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

const indicateWrongAnswer = () => {
  setTimeout(() => {
    $("body").css("background-color", "white");
  }, 100);
  $("body").css("background-color", "red");
};

const indicateCorrectAnswer = () => {
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

//         var userWord = word.join('');

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
    indicateCorrectAnswer();
  } else {
    indicateWrongAnswer();
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
