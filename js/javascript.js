// const drumSequencer = [true, false, false, true, true, false, false, false];

// const audio = document.getElementById('soundOne');
// let counter = 0;

// let start = setInterval(playLoop, 1000);

// function playLoop() { 
//   if (drumSequencer[counter] === true) {
//   audio.play(); 
//   }
//   console.log(counter);
//   counter++;
//   //loops through array
//     if (counter === 8) {
//       counter = 0;
//     }
// };  


// function stop() {
//   clearInterval(playLoop);
// }



// //starts audio, but start must be an object
// document.addEventListener('click', start)

// //stops audio
// document.addEventListener('dblclick', stop)



const drumSequencer = [false, false, false, false, false, false, false, false];


// User selects which sound to play

let djembeOne = document.getElementsByClassName("a");

function tabActive() {
    let key = this.getAttribute("data-key");
    drumSequencer[key] = !drumSequencer[key];
    console.log(key);
    document.getElementById("a" +key).classList.toggle("isActive");
}

//adds event listener to each element with className
for (let i = 0; i< djembeOne.length; i++) {
    djembeOne[i].addEventListener("click", tabActive)
}

const audio = document.getElementById('soundOne');
let stopped = false;
let counter = 0;


function start() {
   stopped = false;
   playAudio();
};

//why doesnt this work with setInterval?
//precision of execution
function playAudio() {
    setTimeout(function(){ 
        if (drumSequencer[counter] === true) { 
        audio.play();
        }
        console.log(counter +':'+ Date.now());
        counter++;
        //loops through array
        if (counter === 8) {
            counter = 0;
        }
        //stops loop if double click on screen
        if (stopped == false) {
            playAudio();
        }
    }, 1000);
    document.getElementById("a" +counter).classList.add("counterPos");
    setTimeout(document.getElementById("a" +counter).classList.remove("counterPos"), 1000);
};


function pause() {
    audio.pause();
    audio.currentTime = 0;
    stopped = true;
};


console.log(drumSequencer);

//see counter


//Event Listeners


//starts audio
document.getElementById("start").addEventListener('click', start)

//stops audio
document.getElementById("pause").addEventListener('click', pause)

