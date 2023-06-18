var letterCount = 0;
var maxLetterCount;
var word = [];
var answerWord = "tea";

function fetchData() {
    maxLetterCount = 0;

    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {
            answerWord = data[0];
            maxLetterCount = answerWord.length;
            console.log(data, maxLetterCount);

            if(maxLetterCount > 7) {
                fetchData();
            }
            else {
                for(var i = 0; i < maxLetterCount; i++) {
                    var newQLetter = document.createElement("div");
                    newQLetter.classList.add("q-letter");
                    document.querySelector(".words").appendChild(newQLetter);
            }
        }
    })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

fetchData();

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
    console.debug('Entering setWord function');
    
    if (letterCount < maxLetterCount) {
        console.debug('letterCount:', letterCount);
        $(".q-letter")[letterCount].innerHTML = event;
        word.push(event);
        console.debug('word:', word);
        console.debug('word joined:', word.join(''));
        letterCount++;
    }
    
    console.debug('letterCount after increment:', letterCount);
    
    if (letterCount === maxLetterCount) {
        console.debug('Reached maxLetterCount');
        
        console.debug('word joined:', word.join(''));
        console.debug('answerWord:', answerWord);
        
        var userWord = word.join('');

        if(userWord === answerWord) {
            console.debug('Word matches answer');
            setTimeout(() => {
                $("body").css("background-color", "white");
            }, 100);
            $("body").css("background-color", "green");
        } else {
            console.debug('Word does not match answer');
            setTimeout(() => {
                $("body").css("background-color", "white");
            }, 100);
            $("body").css("background-color", "red");
        }
    }
}


$(".letter").on("click", function() {
    setWord(this.innerHTML);
});

$(document).on("keydown", function(event) {
    if(/^[a-zA-Z]$/.test(event.key)) {
        setWord(event.key.toLowerCase());
    }
})