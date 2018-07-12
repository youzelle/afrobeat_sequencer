const drumSequencer = [true, false, false, true, true, false, false, false];

const audio = document.getElementById('soundOne');

// for (let i = 0; i<drumSequencer.length; i++) {
// 	if (drumSequencer[i] === true) {
// 		audio.play();
// 	}
// }




function start() {
	let counter = 0;

	setInterval(function(){ 
	if (drumSequencer[counter] === true) {
	audio.play().catch(function(error) {
		console.log('error', error)
	})}
	console.log(counter);
	counter++;
}, 1000);}


document.addEventListener('click', start)
