let playing;
let counter = 0;
let audio = [];
let chunks = [];


try {

    AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();

} catch (e) {
    alert("Features of this app not supported.");
    throw new Error("Web Audio API not supported.");
}

  //Gets stream of data from the nodes - gives the ability to store
  const dest = audioContext.createMediaStreamDestination();

  //new instance of MediaRecorder
  const mediaRecorder = new MediaRecorder(dest.stream);

//setUpMusiicMachine

function musicMachine() {
     //store DOM elements in JS array
     let musicMachine = [[],[],[],[]];
     for (let i = 0; i < 8; i++) {
        musicMachine[0].push(document.getElementById("0" + i));
        musicMachine[1].push(document.getElementById("1" + i));
        musicMachine[2].push(document.getElementById("2" + i));
        musicMachine[3].push(document.getElementById("3" + i))
    }

    let drum = document.querySelectorAll('.drum');
    Array.from(drum).forEach(element => element.addEventListener("click", drumHit));

    return musicMachine;
}

function setUpAudio() {

    //pass audio element to media context
    const xylo = audioContext.createMediaElementSource(document.getElementById("audio0"));
    const djembeOne = audioContext.createMediaElementSource(document.getElementById("audio1"));
    const djembeTwo = audioContext.createMediaElementSource(document.getElementById("audio2"));
    const maracas = audioContext.createMediaElementSource(document.getElementById("audio3"));


    const gainNode = audioContext.createGain();

    gainNode.gain.value = 1;

    //connects sound producing part of node
    gainNode.connect(dest);

    xylo.connect(gainNode).connect(audioContext.destination);
    djembeOne.connect(gainNode).connect(audioContext.destination);
    djembeTwo.connect(gainNode).connect(audioContext.destination);
    maracas.connect(gainNode).connect(audioContext.destination);

    //audio = [xylo, djembeOne, djembeTwo, maracas]

    audio = [document.getElementById("audio0"),
            document.getElementById("audio1"),
            document.getElementById("audio2"),
            document.getElementById("audio3")
        ]

}

function setUpRecorder() {
    //when data is available an event is raised, this listens for it    
    mediaRecorder.ondataavailable = handleChunks;

    mediaRecorder.onstop = downloadChunks;

}

function handleChunks(event) {
    try {
        chunks.push(event.data);
    } catch (error) {
        console.log('The following error occurred: ' + error);
    }
}

function downloadChunks(event) {
    // Make blob out of our blobs, and open it.
    //make sure down but is enabled
    const blob = new Blob(chunks, { "type" : "audio/webm;codecs=opus" });    
    const url = URL.createObjectURL(blob);

    document.getElementById("keepBut").setAttribute("href", url);
    document.getElementById("keepBut").setAttribute("download", "drumBeat");  

   document.getElementById("keepBut").addEventListener("click", () => {
       setTimeout(() => {
           window.URL.revokeObjectURL(url);
           //diasble download
       },
       2000)
   });

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

function timeInterval() {
    return Math.floor((60000)/(document.getElementById("bpm").value*2));
}

//autoplay policy 
function start() {
    event.preventDefault();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
        console.log("Playback resumed successfully");
    }
    playing = setInterval(scheduler, timeInterval());
    swapButtons("start", "pause");

}

function pause() {
    event.preventDefault();
      clearInterval(playing);
      swapButtons("pause", "start");
  }
  
function stop() {
    //disable download
    event.preventDefault();
    counter = 0;
    for (let r = 0; r < 4; r++) {
        musicMachine()[r].forEach(element => {
            element.classList.remove("counterPos", "hit");
    })}
    clearInterval(playing);
    swapButtons("pause", "start");
}

//only want to start recording if play button is active
function startRec() {
    event.preventDefault();
    mediaRecorder.start();
    swapButtons("startrec", "stoprec");
    console.log("recorder started");
};

function stopRec() {
    event.preventDefault();
    mediaRecorder.requestData();
    mediaRecorder.stop();
    swapButtons("stoprec", "startrec");
    console.log("recorder stopped");
};

function clearDownload(event, url) {
    event.preventDefault();
    console.log("Downloading")
    window.URL.revokeObjectURL(url);
}
 
//MUSIC SEQUENCER
function drumHit() {
    event.preventDefault();
    row = this.getAttribute("data-row");
    col = this.getAttribute("data-col");
    musicMachine()[row][col].classList.toggle("hit");
}

function scheduler() {
    for (let row = 0; row < 4; row++) {
        highlighter(row, counter);
        playAudio(row, counter);
    }

    counter++;
    if (counter === 8) {
        counter = 0;
    }
}

function highlighter(row, counter) {
    if (counter > -1) {
        musicMachine()[row][counter].classList.add("counterPos");
    }
    if (counter > 0) {
        musicMachine()[row][counter - 1].classList.remove("counterPos");
    } else {
        musicMachine()[row][7].classList.remove("counterPos");
    }
}

// //refractor seperate highlighter and play audio
function playAudio(row, counter) {
    if (musicMachine()[row][counter].classList.contains("hit")) { 
        audio[row].currentTime = 0;
        audio[row].play();
    }
}

function main(){
    musicMachine();
    setUpAudio();
    setUpRecorder();
    //adds event listener to each element with className
  
    //Event LISTENERS
    document.getElementById("start").addEventListener("click", start);
    document.getElementById("pause").addEventListener("click", pause);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("startrec").addEventListener("click", startRec);
    document.getElementById("stoprec").addEventListener("click", stopRec);

    document.getElementById("bpm").addEventListener("input", timeInterval);
}




main();
