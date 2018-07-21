const drumSequencer = [false, false, false, false, false, false, false, false];

const audio = document.getElementById('soundOne');
let counter = 0;
let playing;
const numberOfItems = drumSequencer.length;

//store DOM elements
const elements = [];
for (let i = 0; i < numberOfItems; i++) elements.push(document.getElementById("a" + i));

// User selects which sound to play

let djembeOne = document.getElementsByClassName("a");

function tabActive() {
    let key = this.getAttribute("data-key");
    drumSequencer[key] = !drumSequencer[key];
    document.getElementById("a" +key).classList.toggle("isActive");
}

//adds event listener to each element with className
for (let i = 0; i< djembeOne.length; i++) {
    djembeOne[i].addEventListener("click", tabActive)
}


function start() {
    playing = setInterval(playAudio, 1000)
}


function playAudio() {
    elements[counter].classList.add("counterPos");
    if (counter > 0) {
            elements[counter -1].classList.remove("counterPos");
        } else {
            elements[numberOfItems - 1].classList.remove("counterPos");
           }
        console.log(drumSequencer[drumSequencer[counter]]);
    if (drumSequencer[counter] === true) { 
       audio.play();
     }
    console.log(counter +':'+ Date.now());
     counter++;
//     //loops through array
    if (counter === 8) {
        counter = 0;
     counter = counter % numberOfItems;
    }
};

function pause() {
    audio.pause();
    clearInterval(playing);
};

console.log(drumSequencer);

//Event Listeners

//starts audio
document.getElementById("start").addEventListener('click', start)

//stops audio
document.getElementById("pause").addEventListener('click', pause)

