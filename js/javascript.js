// window.addEventListener('load', function () {
// //your code right here;

// const one = [false, false, false, false, false, false, false, false];
// const two = [false, false, false, false, false, false, false, false];
// const three = [false, false, false, false, false, false, false, false];
// const four = [false, false, false, false, false, false, false, false];

// const beatsMatrix = [one, two, three, four];
// console.log(beatsMatrix);

// let counter = 0;
// let row = 0;
// let col = 0;
// let playing;
// const numberOfBeats = 8;
// const numberOfInstr = 4;

// console.log(numberOfBeats)

// const audio = [];
// for (let j = 0; j < numberOfInstr; j++) {
//     console.log(document.getElementById('audio0'))
//     audio.push(document.getElementById("audio" + j));
// }
// console.log(audio)

// //store DOM elements in JS array
// const soundLinks = [[],[],[],[]];
// // index here matches index in music arrays, use instead of data key
// for (let i = 0; i < numberOfBeats; i++) {
//     soundLinks[0].push(document.getElementById("a" + i));
//     soundLinks[1].push(document.getElementById("b" + i));
//     soundLinks[2].push(document.getElementById("c" + i));
//     soundLinks[3].push(document.getElementById("d" + i))
// }
// // const char = ['a', 'b', 'c', 'd'];

// // for (let s = 0; s < soundLinks.length; s++) {
// //     for ( let t = 0; t < char.length; t++ ) {
// //         for ( let i = 0; i<numberOfBeats; i++) {
// //             soundLinks[s].push(document.getElementById(char[t] + i))
// //         }
// //     }
// // };


// // User selects which sound to play
// function tabActive() {
//     event.preventDefault();
//     row = this.getAttribute('data-row');
//     col = this.getAttribute('data-col');
//     beatsMatrix[row][col] = !beatsMatrix[row][col];
//     soundLinks[row][col].classList.toggle('isActive');
// };

// //adds event listener to each element with className
// for (let r = 0; r < numberOfInstr; r++) {
//     console.log(soundLinks);
//     soundLinks[r].forEach(element => element.addEventListener('click', tabActive));
// }

// //uses input from slider to update output tag value
// function bpmChange(val) {
//     document.getElementById('bpmValue').innerHTML = val;
// }

// //sets time interval based on slider bpm value
// function timeInterval() {
//     return Math.floor((60000)/(document.getElementById('bpm').value*2));
// }

// console.log(timeInterval())

// function start() {
//     event.preventDefault();
//     playing = setInterval(playAudio, timeInterval())
//     document.getElementById("start").classList.add("isActive");
//     document.getElementById("pause").classList.remove("isActive");
// }


// function playAudio() {
//     for (row = 0; row < numberOfInstr; row++) {
//         if (counter > -1) 
//             soundLinks[row][counter].classList.add('counterPos');
//     }
//     for (row = 0; row < numberOfInstr; row++) {
//         if (counter > 0) {
//             soundLinks[row][counter - 1].classList.remove('counterPos');
//         } else {
//             soundLinks[row][numberOfBeats - 1].classList.remove('counterPos');
//         }
//     }
//     //match data key of row to data key of sound
//     for (row = 0; row < numberOfInstr; row++) {
//         if (beatsMatrix[row][counter]) { 
//            audio[row].currentTime = 0;
//            audio[row].play();
//         }
//     }
//     counter++;
//     //loops through array
//     if (counter === 8) {
//         counter = 0;
//     }
// }

// function pause() {
//   event.preventDefault();
//     clearInterval(playing);
//     document.getElementById("start").classList.remove("isActive");
//     document.getElementById("pause").classList.add("isActive");
// }

// //Event Listeners
// //starts audio
// document.getElementById("start").addEventListener('click', start)
// //stops audio
// document.getElementById("pause").addEventListener('click', pause)
// //bpm sets time interval
// document.getElementById("bpm").addEventListener('input', timeInterval)

// }, false);

document.querySelector(".start").addEventListener("click", function() {
    audioZero.play();
});

document.querySelector(".startrec").addEventListener("click", function() {
    mediaRecorder.start();
    console.log("recorder started");
});

document.querySelector(".stoprec").addEventListener("click", function() {
        mediaRecorder.requestData();
        mediaRecorder.stop();
});



    let audioContext = new AudioContext();


    let audioZero = document.getElementById("audio0")
    let audioOne = document.getElementById("audio1")
    let audioTwo = document.getElementById("audio2")
    let audioThree = document.getElementById("audio3")

    // creates a link between audio context and file
    const maracas = audioContext.createMediaElementSource(audioZero)

    let gainNode = audioContext.createGain()
    maracas.connect(gainNode)

    // creates link to the speaker
    gainNode.connect(audioContext.destination);
    console.log(audioContext.destination);

    gainNode.gain.value = 1;

    //Gets stream of data from the speaker output - gives the ability to store
    const dest = audioContext.createMediaStreamDestination();

    //This records the stream 
    var mediaRecorder = new MediaRecorder(dest.stream);

    var types = ["video/webm", 
             "audio/webm", 
             "video/webm\;codecs=vp8", 
             "video/webm\;codecs=daala", 
             "video/webm\;codecs=h264", 
             "audio/webm\;codecs=opus", 
             "video/mpeg"];

    for (var i in types) { 
        console.log( "Is " + types[i] + " supported? " + (MediaRecorder.isTypeSupported(types[i]) ? "Maybe!" : "Nope :(")); 
    }


    let chunks = [];

    //when data is available an event is raised, this listens for it
    mediaRecorder.ondataavailable = function(evt) {
        console.log(evt, evt.data);
        chunks.push(evt.data);
    };

    mediaRecorder.onstop = function(evt) {
       // Make blob out of our blobs, and open it.
       var blob = new Blob(chunks, { 'type' : "audio/webm;codecs=opus" });

       var anchorTag = document.createElement("a");
       anchorTag.setAttribute('download', 'download');
       anchorTag.innerHTML="download me";

       // creates the download link
       anchorTag.href = URL.createObjectURL(blob);

       document.body.appendChild(anchorTag);

       chunks = [];

    };

