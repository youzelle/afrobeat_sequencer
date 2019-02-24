//MUSIC PLAYER SETUP

const one = [false, false, false, false, false, false, false, false];
const two = [false, false, false, false, false, false, false, false];
const three = [false, false, false, false, false, false, false, false];
const four = [false, false, false, false, false, false, false, false];

const beatsMatrix = [one, two, three, four]

let counter = 0;
let row = 0;
let col = 0;
let playing;
const numberOfBeats = 8;
const numberOfInstr = 4;

//store DOM elements in JS array
const soundLinks = [[],[],[],[]];

for (let i = 0; i < numberOfBeats; i++) {
    soundLinks[0].push(document.getElementById("a" + i));
    soundLinks[1].push(document.getElementById("b" + i));
    soundLinks[2].push(document.getElementById("c" + i));
    soundLinks[3].push(document.getElementById("d" + i))
}

//SET UP AUDIO
const audio = [];
for (let j = 0; j < numberOfInstr; j++) {
    audio.push(document.getElementById("audio" + j));
}

try {

    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();

} catch (e) {
    alert("Features of this app not supported.");
    throw new Error("Web Audio API not supported.");
}

// creates a link between audio context and file
const xylo = audioContext.createMediaElementSource(audio[0]);
const djembeOne = audioContext.createMediaElementSource(audio[1]);
const djembeTwo = audioContext.createMediaElementSource(audio[2]);
const maracas = audioContext.createMediaElementSource(audio[3]);

const gainNode = audioContext.createGain();

xylo.connect(gainNode);
djembeOne.connect(gainNode);
djembeTwo.connect(gainNode);
maracas.connect(gainNode);

// creates link to the speaker
gainNode.connect(audioContext.destination);

gainNode.gain.value = 1;

//Gets stream of data from the speaker output - gives the ability to store
const dest = audioContext.createMediaStreamDestination();
//connects sound producing part of node
gainNode.connect(dest);

//This records the stream 
var mediaRecorder = new MediaRecorder(dest.stream);

let chunks = [];

//when data is available an event is raised, this listens for it
mediaRecorder.ondataavailable = function(event) {
    chunks.push(event.data);
}

mediaRecorder.onstop = function(event) {
    // Make blob out of our blobs, and open it.
    const blob = new Blob(chunks, { "type" : "audio/webm;codecs=opus" });    

    // creates the download link
    document.getElementById("keepBut").setAttribute("href", URL.createObjectURL(blob));
    document.getElementById("keepBut").setAttribute("download", "drumBeat");

    chunks = [];

}

//BUTTON HELPERS

function swapButtons(hide, show) {
    document.getElementById(show).classList.remove("hidden");
    document.getElementById(hide).classList.add("hidden");
}

function toggleDisable(button) {
    let ele = document.getElementById(button)
    if (ele.disabled) {
        console.log("Enabling button", button);
        ele.removeAttribute("disabled");
    } else {
        console.log("Disabling button", button);
        ele.setAttribute("disabled", "disabled");
    }
}

//CONTROLS

//uses input from slider to update output tag value
function bpmChange(val) {
    document.getElementById('bpmValue').innerHTML = val;
}

//sets time interval based on slider bpm value
function timeInterval() {
    return Math.floor((60000)/(document.getElementById("bpm").value*2));
}

//autoplay policy puts audiocontext in suspended state before user interaction
//need to call resume() to put in running state 
function start() {
    event.preventDefault();
    audioContext.resume().then(() => {
        console.log("Playback resumed successfully");
      });
    playing = setInterval(playAudio, timeInterval());
    document.getElementById("pause").classList.remove("isActiveCtr");
    document.getElementById("start").classList.add("isActiveCtr");
    swapButtons("start", "pause");

}

function pause() {
    event.preventDefault();
      clearInterval(playing);
      document.getElementById("pause").classList.add("isActiveCtr");
      document.getElementById("start").classList.remove("isActiveCtr");
      swapButtons("pause", "start");
  }
  
function stop() {
    event.preventDefault();
    window.location.reload()
}

//only want to start recording if play button is active
function startRec() {
    event.preventDefault();
    mediaRecorder.start();
    document.getElementById("stoprec").classList.remove("isActiveCtr");
    document.getElementById("startrec").classList.add("isActiveCtr");
    swapButtons("startrec", "stoprec");
    console.log("recorder started");
};

function stopRec() {
    event.preventDefault();
    mediaRecorder.requestData();
    mediaRecorder.stop();
    document.getElementById("stoprec").classList.add("isActiveCtr");
    document.getElementById("startrec").classList.remove("isActiveCtr");
    swapButtons("stoprec", "startrec");
    console.log("recorder stopped");
};

//MUSIC SEQUENCER
function tabActive() {
    event.preventDefault();
    row = this.getAttribute("data-row");
    col = this.getAttribute("data-col");
    beatsMatrix[row][col] = !beatsMatrix[row][col];
    soundLinks[row][col].classList.toggle("isActiveButt");
}

//adds event listener to each element with className
for (let r = 0; r < numberOfInstr; r++) {
    console.log(soundLinks);
    soundLinks[r].forEach(element => element.addEventListener("click", tabActive));
}

function playAudio() {
    for (row = 0; row < numberOfInstr; row++) {
        if (counter > -1) 
            soundLinks[row][counter].classList.add("counterPos");
    }
    for (row = 0; row < numberOfInstr; row++) {
        if (counter > 0) {
            soundLinks[row][counter - 1].classList.remove("counterPos");
        } else {
            soundLinks[row][numberOfBeats - 1].classList.remove("counterPos");
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
}

//Event LISTENERS
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("startrec").addEventListener("click", startRec);
document.getElementById("stoprec").addEventListener("click", stopRec);
document.getElementById("bpm").addEventListener("input", timeInterval);
