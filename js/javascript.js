const one = [false, false, false, false, false, false, false, false];
const two = [false, false, false, false, false, false, false, false];
const three = [false, false, false, false, false, false, false, false];
const four = [false, false, false, false, false, false, false, false];

const beatsMatrix = [one, two, three, four];

let counter = 0;
let row = 0;
let col = 0;
let playing;
const numberOfBeats = 8;
const numberOfInstr = 4;

const audio = [];
for (let j = 0; j < numberOfInstr; j++) {
    audio.push(document.getElementById("audio" + j));
}

//store DOM elements in JS array
const soundLinks = [[],[],[],[]];
//index here matches index in music arrays, use instead of data key
// for (let i = 0; i < numberOfBeats; i++) {
//     soundLinks[0].push(document.getElementById("a" + i));
//     soundLinks[1].push(document.getElementById("b" + i));
//     soundLinks[2].push(document.getElementById("c" + i));
//     soundLinks[3].push(document.getElementById("d" + i))
// }
const char = ['a', 'b', 'c', 'd'];

for (let s = 0; s < soundLinks.length; s++) {
    for ( let t = 0; t < char.length; t++ ) {
        for ( let i = 0; i<numberOfBeats; i++) {
            soundLinks[s].push(document.getElementById(char[t] + i))
        }
    }
}

// User selects which sound to play
function tabActive() {
    row = this.getAttribute('data-row');
    col = this.getAttribute('data-col');
    beatsMatrix[row][col] = !beatsMatrix[row][col];
    soundLinks[row][col].classList.toggle('isActive');
}

//adds event listener to each element with className
for (row = 0; row < numberOfInstr; row++) {
    soundLinks[row].forEach(element => element.addEventListener('click', tabActive));
}

//uses input from slider to update output tag value
function bpmChange(val) {
    document.getElementById('bpmValue').innerHTML = val;
}

//sets time interval based on slider bpm value
function timeInterval() {
    return Math.floor((60000)/(document.getElementById('bpm').value*2));
}

function start() {
    playing = setInterval(playAudio, timeInterval())
    document.getElementById("start").classList.add("isActive");
    document.getElementById("pause").classList.remove("isActive");
}


function playAudio() {
    for (row = 0; row < numberOfInstr; row++) {
        if (counter >= 0) 
            soundLinks[row][counter].classList.add('counterPos');
    }
    for (row = 0; row < numberOfInstr; row++) {
        if (counter > 0) {
            soundLinks[row][counter - 1].classList.remove('counterPos');
        } else {
            soundLinks[row][numberOfBeats - 1].classList.remove('counterPos');
        }
    }
    //match data key of row to data key of sound
    for (row = 0; row < numberOfInstr; row++) {
        if (beatsMatrix[row][counter]) { 
           audio[row].currentTime = 0;
           audio[row].play();
        }
    }
    counter++;
    //loops through array
    if (counter === 8) {
        counter = 0;
    }
};

function pause() {
    clearInterval(playing);
    document.getElementById("start").classList.remove("isActive");
    document.getElementById("pause").classList.add("isActive");
};

//Event Listeners
//starts audio
document.getElementById("start").addEventListener('click', start)
//stops audio
document.getElementById("pause").addEventListener('click', pause)
//bpm sets time interval
document.getElementById("bpm").addEventListener('input', timeInterval)