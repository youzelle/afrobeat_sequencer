const musicMachine = [];
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const dest = audioContext.createMediaStreamDestination();

 //store DOM elements in JS array
 for (let i = 0; i < numberOfBeats; i++) {
    musicMachine[0].push(document.getElementById("0" + i));
    musicMachine[1].push(document.getElementById("1" + i));
    musicMachine[2].push(document.getElementById("2" + i));
    musicMachine[3].push(document.getElementById("3" + i))
}


//load music samples
 //get audio elements 
 for (let j = 0; j < numberOfInstr; j++) {
    audio.push(document.getElementById("audio" + j));
}

// audio.filter(numberOfInstrumentsBiggerThanJ)
// const numberOfInstrumentsBiggerThanJ = (x) => x < numberOfInstr

function playXylo() {
    const xylo = audioContext.createMediaElementSource(audio[0]);
    xylo.connext(dest).connect(audioContext.destination);
    xylo.start();
}

function playDjembeOne() {
    const djembeOne = audioContext.createMediaElementSource(audio[1]);
    djembeOne.connect(dest).connect(audioContext.destination);
    djembeOne.start();
}

function playDjembeTwo() {
    const djembeTwo = audioContext.createMediaElementSource(audio[2]);
    djembeTwo.connect(dest).connect(audioContext.destination);
    djembeTwo.start();
}

function playMaracas() {
    const maracas = audioContext.createMediaElementSource(audio[3]);
    maracas.connect(dest).connect(audioContext.destination);
    maracas.start();
}



//bpm
const bpmControl = document.getElementById("bpm");

//What does false do? preventDefault?
bpmControl.addEventListener("input", timeInterval, false);

//sets time interval based on slider bpm value
function timeInterval() {
    return Math.floor((60000)/(bpmControl.value*2));
}

// How frequently to call scheduling function (in milliseconds)
let lookahead = 25.0; 

// How far ahead to schedule audio (sec)
let scheduleAheadTime = 0.1; 

let currentNote = 0;

// when the next note is due.
let nextNoteTime = audioContext.currentTime; 

function nextNote() {

    // Add beat length to last beat time
    nextNoteTime += timeInterval(); 

    // Advance the beat number, wrap to zero
    currentNote++;
    if (currentNote === 8) {
            currentNote = 0;
    }
}


function scheduleNote(beatNumber, time) {

    // push the note on the queue, even if we're not playing.

    if (musicMachine[0].querySelectorAll('li')[currentNote].classList.contains("isActiveButt")) {
        playXylo();
    }
    if (musicMachine[1].querySelectorAll('li')[currentNote].classList.contains("isActiveButt")) {
        playDjembeOne();
    }
    if (musicMachine[2].querySelectorAll('li')[currentNote].classList.contains("isActiveButt")) {
        playDjembeTwo();
    }
    if (musicMachine[3].querySelectorAll('li')[currentNote].classList.contains("isActiveButt")) {
        playMaracas();
    }
}

function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
}
