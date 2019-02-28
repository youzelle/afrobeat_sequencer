
const musicMachine = [[],[],[],[]];
const numberOfInstr = 4;
let counter = 0;
let playing;
const numberOfBeats = 8;
const audio = [];
let chunks = [];


try {

    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();

} catch (e) {
    alert("Features of this app not supported.");
    throw new Error("Web Audio API not supported.");
}

  //Gets stream of data from the speaker output - gives the ability to store
  const dest = audioContext.createMediaStreamDestination();

  //new instance of MediaRecorder
  const mediaRecorder = new MediaRecorder(dest.stream);

function setUp() {

  

    //store DOM elements in JS array
    for (let i = 0; i < numberOfBeats; i++) {
        musicMachine[0].push(document.getElementById("0" + i));
        musicMachine[1].push(document.getElementById("1" + i));
        musicMachine[2].push(document.getElementById("2" + i));
        musicMachine[3].push(document.getElementById("3" + i))
    }

    //get audio elements 
    for (let j = 0; j < numberOfInstr; j++) {
        audio.push(document.getElementById("audio" + j));
    }

    //pass audio element to media context
    const xylo = audioContext.createMediaElementSource(audio[0]);
    const djembeOne = audioContext.createMediaElementSource(audio[1]);
    const djembeTwo = audioContext.createMediaElementSource(audio[2]);
    const maracas = audioContext.createMediaElementSource(audio[3]);

    const gainNode = audioContext.createGain();

    gainNode.gain.value = 1;

    //connects sound producing part of node
    gainNode.connect(dest);

    xylo.connect(gainNode).connect(audioContext.destination);
    djembeOne.connect(gainNode).connect(audioContext.destination);
    djembeTwo.connect(gainNode).connect(audioContext.destination);
    maracas.connect(gainNode).connect(audioContext.destination);

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
    if (audioContext.state === 'suspended') {
        audioContext.resume();
        console.log("Playback resumed successfully");
    }
    playing = setInterval(playAudio, timeInterval());
    // document.getElementById("pause").classList.remove("isActiveCtr");
    // document.getElementById("start").classList.add("isActiveCtr");
    swapButtons("start", "pause");

}

function pause() {
    event.preventDefault();
      clearInterval(playing);
    //   document.getElementById("pause").classList.add("isActiveCtr");
    //   document.getElementById("start").classList.remove("isActiveCtr");
      swapButtons("pause", "start");
  }
  
function stop() {
    event.preventDefault();
    counter = 0;
    for (let r = 0; r < numberOfInstr; r++) {
        musicMachine[r].forEach(element => {
            element.classList.remove("counterPos", "isActiveButt");
    })}
    clearInterval(playing);
    swapButtons("pause", "start");
}

//only want to start recording if play button is active
function startRec() {
    event.preventDefault();
    mediaRecorder.start();
    // document.getElementById("stoprec").classList.remove("isActiveCtr");
    // document.getElementById("startrec").classList.add("isActiveCtr");
    swapButtons("startrec", "stoprec");
    console.log("recorder started");
};

function stopRec() {
    event.preventDefault();
    mediaRecorder.requestData();
    mediaRecorder.stop();
    // document.getElementById("stoprec").classList.add("isActiveCtr");
    // document.getElementById("startrec").classList.remove("isActiveCtr");
    swapButtons("stoprec", "startrec");
    console.log("recorder stopped");
};

//MUSIC SEQUENCER
function tabActive() {
    event.preventDefault();
    row = this.getAttribute("data-row");
    col = this.getAttribute("data-col");
    musicMachine[row][col].classList.toggle("isActiveButt");
}

function playAudio() {
    //let id = row 
    for (row = 0; row < numberOfInstr; row++) {
        if (counter > -1) musicMachine[row][counter].classList.add("counterPos");
        
        if (counter > 0) {
            musicMachine[row][counter - 1].classList.remove("counterPos");
        } else {
            musicMachine[row][numberOfBeats - 1].classList.remove("counterPos");
        }
        //beatsMatrix[row][counter]
        if (musicMachine[row][counter].classList.contains("isActiveButt")) { 
            console.log('true');
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

function main(){
    setUp();
    //adds event listener to each element with className
    for (let r = 0; r < numberOfInstr; r++) {
        musicMachine[r].forEach(element => element.addEventListener("click", tabActive));
    }
    //Event LISTENERS
    document.getElementById("start").addEventListener("click", start);
    document.getElementById("pause").addEventListener("click", pause);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("startrec").addEventListener("click", startRec);
    document.getElementById("stoprec").addEventListener("click", stopRec);
    document.getElementById("bpm").addEventListener("input", timeInterval);
}

main();
