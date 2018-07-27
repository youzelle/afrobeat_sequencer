const one = [false, false, false, false, false, false, false, false];
const two = [false, false, false, false, false, false, false, false];

const beatsMatrix = [one, two];

//Change to store sounds in JS & use data attribute to link to arrays
// const audioOne = document.getElementById('soundOne');
// const audioTwo = document.getElementById('soundTwo');

let counter = 0;
let row = 0;
let col = 0;
let playing;
const numberOfBeats = one.length;
const numberOfInstr = beatsMatrix.length;

const audio = [];
for (let j = 0; j < numberOfInstr; j++) {
    audio.push.(document.getElementByTagName("audio")[j]);
}

//store DOM elements in JS array
const soundLinks = [[],[]];
//index here matches index in music arrays, use instead of data key
for (let i = 0; i < numberOfBeats; i++) {
    soundLinks[0].push(document.getElementById("a" + i));
    soundLinks[1].push(document.getElementById("b" + i));
}

console.log("beatsMatrixDOM: " + soundLinks);


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
}

const begin = Date.now();

function playAudio() {
    for (row = 0; row < numberOfInstr; row++) {
        if (counter > -1) 
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
        if (beatsMatrix[row][counter] === true) { 
           (document.getElementById(row)).play();
        }
    }
    let timing = (Date.now() - begin);
    console.log(counter +':'+ timing);
    counter++;
    console.log("inter: " +timeInterval());
    //loops through array
    if (counter === 8) {
        counter = 0;
    }
};

function pause() {
    clearInterval(playing);
};

//Event Listeners
//starts audio
document.getElementById("start").addEventListener('click', start)
//stops audio
document.getElementById("pause").addEventListener('click', pause)
//bpm sets time interval
document.getElementById("bpm").addEventListener('input', timeInterval)

