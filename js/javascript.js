
// // Need one array that all tabs can access
// const drumSequencerOne = [false, false, false, false, false, false, false, false];
// const drumSequencerTwo = [false, false, false, false, false, false, false, false];
// const drumSequencerThree = [false, false, false, false, false, false, false, false];
// const drumSequencerFour = [false, false, false, false, false, false, false, false];


// const audioOne = document.getElementById('soundOne');
// const audioTwo = document.getElementById('soundTwo');

// let counter = 0;
// let playing;
// const numberOfItems = drumSequencerOne.length;

// //store DOM elements in JS array
// const elementsOne = [];
// for (let i = 0; i < numberOfItems; i++) elementsOne.push(document.getElementById("a" + i));
// console.log(elementsOne[0]);

// const elementsTwo = [];
// for (let j = 0; j < numberOfItems; j++) elementsTwo.push(document.getElementById("b" + j));

// // User selects which sound to play
// function tabActive() {
//     let key = this.getAttribute('data-key');
//     console.log('tabActive' +key);
//     drumSequencerOne[key] = !drumSequencerOne[key];
//     elementsOne[key].classList.toggle('isActive');
// }

// //adds event listener to each element with className
// elementsOne.forEach(function(element) {
//     element.addEventListener('click', tabActive)
// })

// elementsTwo.forEach(function(element) {
//     element.addEventListener('click', tabActive)
// })

// //uses input from slider to update output tag value
// function bpmChange(val) {
//     document.getElementById('bpmValue').innerHTML = val;
// }
// //sets time interval based on slider bpm value
// function timeInterval() {
//     return Math.floor((60000)/(document.getElementById('bpm').value*2));
// }

// function start() {
//     playing = setInterval(playAudio, timeInterval())
// }

// const begin = Date.now();

// function playAudio() {
//     elementsOne[counter].classList.add('counterPos');
//     elementsTwo[counter].classList.add('counterPos');
//     if (counter > 0) {
//         elementsOne[counter - 1].classList.remove('counterPos');
//         elementsTwo[counter - 1].classList.remove('counterPos');
//     } else {
//         elementsOne[numberOfItems - 1].classList.remove('counterPos');
//         elementsTwo[numberOfItems - 1].classList.remove('counterPos');
//     }
//     if (drumSequencerOne[counter] === true) { 
//         audioOne.play();
//     }
//     if (drumSequencerTwo[counter] === true) {
//         audioTwo.play();
//     }
//     let timing = (Date.now() - begin);
//     console.log(counter +':'+ timing);
//     counter++;
//     console.log("inter: " +timeInterval());
//     //loops through array
//     if (counter === 8) {
//         counter = 0;
//      // counter = counter % numberOfItems;
//     }
// };

// function pause() {
//     audioOne.pause();
//     audioTwo.pause();
//     clearInterval(playing);
// };

// console.log(drumSequencerOne);
// console.log(drumSequencerTwo);

// //Event Listeners
// //starts audio
// document.getElementById("start").addEventListener('click', start)
// //stops audio
// document.getElementById("pause").addEventListener('click', pause)
// //bpm sets time interval
// document.getElementById("bpm").addEventListener('input', timeInterval)




// Need one array that all tabs can access
const one = [false, false, false, false, false, false, false, false];
const two = [false, false, false, false, false, false, false, false];

const beatsMatrix = [one, two];
console.log(beatsMatrix);

//Change to store sounds in JS & use data attribute to link to arrays
const audioOne = document.getElementById('soundOne');
const audioTwo = document.getElementById('soundTwo');

let counter = 0;
let playing;
const numberOfBeats = 8;


//store DOM elements in JS array
const soundLinks = [[],[]];
//index here matches index in music arrays, use instead of data key
for (let i = 0; i < numberOfBeats; i++) {
    soundLinks[0].push(document.getElementById("a" + i));
    soundLinks[1].push(document.getElementById("b" + i));
}
console.log(soundLinks);

// User selects which sound to play
function tabActive() {
    let key = this.getAttribute('data-key');
    console.log('tabActive' +key);
    beatsMatrix[0][key] = !beatsMatrix[0][key];
    soundLinks[0][key].classList.toggle('isActive');
}

//adds event listener to each element with className
soundLinks[0].forEach(element => element.addEventListener('click', tabActive));

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
    soundLinks[0][counter].classList.add('counterPos');
    soundLinks[1][counter].classList.add('counterPos');
    if (counter > 0) {
        soundLinks[0][counter - 1].classList.remove('counterPos');
        soundLinks[1][counter - 1].classList.remove('counterPos');
    } else {
        soundLinks[0][numberOfBeats - 1].classList.remove('counterPos');
        soundLinks[1][numberOfBeats - 1].classList.remove('counterPos');
    }
    if (beatsMatrix[0][counter] === true) { 
        audioOne.play();
    }
    if (beatsMatrix[1][counter] === true) {
        audioTwo.play();
    }
    let timing = (Date.now() - begin);
    console.log(counter +':'+ timing);
    counter++;
    console.log("inter: " +timeInterval());
    //loops through array
    if (counter === 8) {
        counter = 0;
     // counter = counter % numberOfItems;
    }
};

function pause() {
    audioOne.pause();
    audioTwo.pause();
    clearInterval(playing);
};

console.log(beatsMatrix[0]);
console.log(beatsMatrix[1]);

//Event Listeners
//starts audio
document.getElementById("start").addEventListener('click', start)
//stops audio
document.getElementById("pause").addEventListener('click', pause)
//bpm sets time interval
document.getElementById("bpm").addEventListener('input', timeInterval)

