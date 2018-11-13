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

// console.log(numberOfBeats)

const audio = [];
for (let j = 0; j < numberOfInstr; j++) {
    console.log(document.getElementById('audio0'))
    audio.push(document.getElementById("audio" + j));
}
console.log(audio)

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext()


    let audioZero = document.getElementById("audio0")
    let audioOne = document.getElementById("audio1")
    let audioTwo = document.getElementById("audio2")
    let audioThree = document.getElementById("audio3")

    // creates a link between audio context and file
    const xylo = audioContext.createMediaElementSource(audioZero)
    const djembeOne = audioContext.createMediaElementSource(audioOne)
    const djembeTwo = audioContext.createMediaElementSource(audioTwo)
    const maracas = audioContext.createMediaElementSource(audioThree)


    let gainNode = audioContext.createGain()

    xylo.connect(gainNode)
    djembeOne.connect(gainNode)
    djembeTwo.connect(gainNode)
    maracas.connect(gainNode)

// const audio = [ xylo.connect(gainNode), djembeOne.connect(gainNode), djembeTwo.connect(gainNode),
//     maracas.connect(gainNode)]

//store DOM elements in JS array
const soundLinks = [[],[],[],[]];
// index here matches index in music arrays, use instead of data key
for (let i = 0; i < numberOfBeats; i++) {
    soundLinks[0].push(document.getElementById("a" + i));
    soundLinks[1].push(document.getElementById("b" + i));
    soundLinks[2].push(document.getElementById("c" + i));
    soundLinks[3].push(document.getElementById("d" + i))
}
// // const char = ['a', 'b', 'c', 'd'];

// // for (let s = 0; s < soundLinks.length; s++) {
// //     for ( let t = 0; t < char.length; t++ ) {
// //         for ( let i = 0; i<numberOfBeats; i++) {
// //             soundLinks[s].push(document.getElementById(char[t] + i))
// //         }
// //     }
// // };

// creates link to the speaker
    gainNode.connect(audioContext.destination);
    console.log(audioContext.destination);

    gainNode.gain.value = 1;

    //Gets stream of data from the speaker output - gives the ability to store
    const dest = audioContext.createMediaStreamDestination()
    //connects sound producing part of node
    gainNode.connect(dest)

    //This records the stream 
    var mediaRecorder = new MediaRecorder(dest.stream)

    let chunks = [];

    //when data is available an event is raised, this listens for it
    mediaRecorder.ondataavailable = function(evt) {
        chunks.push(evt.data);
    }

    mediaRecorder.onstop = function(evt) {
       // Make blob out of our blobs, and open it.
       var blob = new Blob(chunks, { 'type' : "audio/webm;codecs=opus" });

       var anchorTag = document.createElement("a")
       //var anchorTag = document.getElementById("downLoad");
       
       anchorTag.innerHTML="<figcaption>keep</figcaption>";

       // creates the download link
       //anchorTag.href = URL.createObjectURL(blob);
       anchorTag.setAttribute("href", URL.createObjectURL(blob));
       anchorTag.setAttribute('download', 'drumBeat');


       var par = document.getElementById("pDlBut");
       var child = document.getElementById("dlBut")
       par.removeChild(child);
       document.getElementById("downLoad").appendChild(anchorTag);

       chunks = [];

    }

document.getElementById("startrec").addEventListener("click", function() {
    event.preventDefault();
    mediaRecorder.start();
    document.getElementById("clear").classList.remove('isActiveCtr');
    document.getElementById("startrec").classList.add('isActiveCtr');
    console.log("recorder started");
})

document.getElementById("clear").addEventListener("click", function() {
        event.preventDefault();
        mediaRecorder.requestData();
        mediaRecorder.stop();
        document.getElementById("clear").classList.add('isActiveCtr');
        document.getElementById("startrec").classList.remove('isActiveCtr');
})


// User selects which sound to play
function tabActive() {
    event.preventDefault();
    row = this.getAttribute('data-row');
    col = this.getAttribute('data-col');
    beatsMatrix[row][col] = !beatsMatrix[row][col];
    soundLinks[row][col].classList.toggle('isActiveButt');
}

//adds event listener to each element with className
for (let r = 0; r < numberOfInstr; r++) {
    console.log(soundLinks);
    soundLinks[r].forEach(element => element.addEventListener('click', tabActive));
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
    event.preventDefault();
    playing = setInterval(playAudio, timeInterval())
    document.getElementById("pause").classList.remove('isActiveCtr');
    document.getElementById("start").classList.add('isActiveCtr');
}


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

function pause() {
  event.preventDefault();
    clearInterval(playing);
     document.getElementById("pause").classList.add('isActiveCtr');
    document.getElementById("start").classList.remove('isActiveCtr');
}

//Event Listeners
//starts audio
document.getElementById("start").addEventListener('click', start)
//stops audio
document.getElementById("pause").addEventListener('click', pause)
//bpm sets time interval
document.getElementById("bpm").addEventListener('input', timeInterval)



// document.querySelector(".startOne").addEventListener("click", function() {
//     audioZero.play();
// });

// document.querySelector(".startTwo").addEventListener("click", function() {
//     audioOne.play();
// });






    