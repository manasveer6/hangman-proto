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
      console.error(error);
    });
}

fetchData();

const hasPlayerWon = () => {
  let win = true;
  if (wrongAttemptCount === maxAttemptCount) {
    return false;
  }
  for (let i = 0; i < maxLetterCount; i++) {
    if ($(".q-letter")[i].innerHTML === "") {
      win = false;
    }
  }
  return win;
};

const drawHangman = () => {
  if (wrongAttemptCount === 1) {
    document.getElementsByClassName("game-part")[0].style.opacity = 1;
    document.getElementsByClassName("game-part")[1].style.opacity = 1;
  } else {
    document.getElementsByClassName("game-part")[
      wrongAttemptCount
    ].style.opacity = 1;
  }
};

const drawFreeHangman = () => {
  const hangmangParts = document.getElementsByClassName("game-part");
  Array.from(hangmangParts).forEach((part, index) => {
    if (index >= 2) {
      const style = window.getComputedStyle(part);
      const currentTop = parseInt(style.top, 10);
      part.style.top = currentTop + 64 + "px";
      part.style.opacity = 1;
    }
  });

  const smileyElements = document.querySelector(".head").children;
  Array.from(smileyElements).forEach((element) => (element.style.opacity = 1));
};

const drawDeadHangman = () => {
  document.querySelectorAll(".eye").forEach(function(eye) {
    eye.classList.remove("eye");
    eye.classList.add("dead-eye");
    eye.style.opacity = 1;
  });

  let mouth = document.querySelector(".mouth");
  mouth.style.transform = "rotate(180deg)";
  mouth.style.opacity = 1;

  for (let i = 0; i < maxLetterCount; i++) {
    $(".q-letter")[i].innerHTML = answerWord[i];
  }
};

const indicateWrongWord = (event) => {
  wrongAttemptCount++;

  if (wrongAttemptCount === maxAttemptCount) {
    drawDeadHangman();
  }

  $(`.${event}`).css("filter", "brightness(0.5)");

  setTimeout(() => {
    $("body").css("background-color", "white");
  }, 100);
  $("body").css("background-color", "red");

  drawHangman();
};

const indicateCorrectWord = (event) => {
  $(`.${event}`).css("filter", "brightness(0.5)");
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
  if (hasPlayerWon()) {
    console.log("you win");
    drawFreeHangman();
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
