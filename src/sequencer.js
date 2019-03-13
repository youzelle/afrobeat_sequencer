//MUSIC SEQUENCER

let counter = 0;
let row = 0;
let col = 0;
let playing;
const numberOfBeats = 8;
const numberOfInstr = 4;

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