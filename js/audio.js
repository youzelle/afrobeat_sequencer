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