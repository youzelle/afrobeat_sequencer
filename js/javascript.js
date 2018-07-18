// const drumSequencer = [true, false, false, true, true, false, false, false];

// const audio = document.getElementById('soundOne');


// function start() {
// 	let counter = 0;
// 	event.preventDefault();
// 	setInterval(function(){ 
// 	if (drumSequencer[counter] === true) {
// 	audio.play().catch(function(error) {
// 		console.log('error', error)
// 	})}
// 	console.log(counter);
// 	counter++;
// 	//loops through array
// 		if (counter === 8) {
// 			counter = 0;
// 		}
// 		//stops array if double click on screen
// 		if (document.addEventListener().dblclick === true) {
// 			break;
// 		}
		
// }, 1000);}



// function stop() {
// 	audio.pause();
// 	audio.currentTime = 0;
// }

// //starts audio
// document.addEventListener('click', start)

// //stops audio
// document.addEventListener('dblclick', stop)


const drumSequencer = [true, false, false, true, true, false, false, false];

const audio = document.getElementById('soundOne');
let stopped = false;
let counter = 0;



function restart(){
   stopped = false;
   start();
}

function start() {
    setTimeout(function(){ 
        if (drumSequencer[counter] === true) { 
        audio.play().catch(function(error) {
        console.log('error', error)
         })}
        console.log(counter);
        counter++;
        //loops through array
            if (counter === 8) {
                counter = 0;
            }
            //stops array if double click on screen
            if (stopped==false) {
              start();
              counter++;
            }
    }, 1000);}



function stop() {
    audio.pause();
    audio.currentTime = 0;
    stopped = true;
}

//starts audio
document.addEventListener('click', restart)

//stops audio
document.addEventListener('dblclick', stop)
