// const drumSequencer = [true, false, false, true, true, false, false, false];

// const audio = document.getElementById('soundOne');
// let counter = 0;

// let start = setInterval(playLoop, 1000);

// function playLoop() { 
//   if (drumSequencer[counter] === true) {
//   audio.play(); 
//   }
//   console.log(counter);
//   counter++;
//   //loops through array
//     if (counter === 8) {
//       counter = 0;
//     }
// };  


// function stop() {
//   clearInterval(playLoop);
// }



// //starts audio, but start must be an object
// document.addEventListener('click', start)

// //stops audio
// document.addEventListener('dblclick', stop)


// const drumSequencer = [true, false, false, true, true, false, false, false];

const drumSequencer = [ false, false, false, false, false, false, false, false];

function toggle() {
  drumSequencer[0] = !drumSequencer[0];
  console.log(drumSequencer);
}

const audio = document.getElementById('soundOne');
let stopped = false;
let counter = 0;


function start(){
   stopped = false;
   playAudio();
};

//why doesnt this work with setInterval?
//precision of execution
function playAudio() {
    setTimeout(function(){ 
        if (drumSequencer[counter] === true) { 
        audio.play();
        }
        console.log(counter +':'+ Date.now());
        counter++;
        //loops through array
        if (counter === 8) {
            counter = 0;
        }
        //stops loop if double click on screen
        if (stopped == false) {
            playAudio();
        }
    }, 1000);}


//doesnt stop loop immediately
function pause() {
    audio.pause();
    audio.currentTime = 0;
    stopped = true;
};


console.log(drumSequencer);

//toggle array elements
document.getElementById("a1").addEventListener('click', toggle);

//starts audio
document.addEventListener('click', start)

//stops audio
document.addEventListener('dblclick', pause)
