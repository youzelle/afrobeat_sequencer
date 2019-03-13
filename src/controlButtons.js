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
    audioContext.resume().then(() => {
        console.log("Playback resumed successfully");
      });
    playing = setInterval(playAudio, timeInterval());
    document.getElementById("pause").classList.remove("isActiveCtr");
    document.getElementById("start").classList.add("isActiveCtr");
    swapButtons("start", "pause");

}

function pause() {
    event.preventDefault();
      clearInterval(playing);
      document.getElementById("pause").classList.add("isActiveCtr");
      document.getElementById("start").classList.remove("isActiveCtr");
      swapButtons("pause", "start");
  }
  
function stop() {
    event.preventDefault();
    window.location.reload()
}

//only want to start recording if play button is active
function startRec() {
    event.preventDefault();
    mediaRecorder.start();
    document.getElementById("stoprec").classList.remove("isActiveCtr");
    document.getElementById("startrec").classList.add("isActiveCtr");
    swapButtons("startrec", "stoprec");
    console.log("recorder started");
};

function stopRec() {
    event.preventDefault();
    mediaRecorder.requestData();
    mediaRecorder.stop();
    document.getElementById("stoprec").classList.add("isActiveCtr");
    document.getElementById("startrec").classList.remove("isActiveCtr");
    swapButtons("stoprec", "startrec");
    console.log("recorder stopped");
};


//Event LISTENERS
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("startrec").addEventListener("click", startRec);
document.getElementById("stoprec").addEventListener("click", stopRec);
document.getElementById("bpm").addEventListener("input", timeInterval);

