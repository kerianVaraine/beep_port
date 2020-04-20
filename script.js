/*
 AudioScheduledSourceNode (like the OscillatorNode)'s start() and stop() method accept a time parameter,
  which allows to schedule both method relatively with the AudioContext own clock. 
  This is far more precise than any other external timing method. 
  Also note that these nodes also have an onended event handler.
 */


//Interaction
let background = document.getElementById("background");
let backgroundColour = background.style.backgroundColor;
let playing = false;

function startStop(){
    console.log('clicked');
    if(!playing){
        playing = true;
        nextNote();
    }else {
        playing = false;
    }
}

function changeColour(color){
    document.getElementById("background").style.backgroundColor = "#" + color;
}


///////////////////////////////
// Audio stuff
// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration, callback) {
	// create Oscillator node
	var oscillator = audioCtx.createOscillator();
	
	oscillator.type = 'square';
	oscillator.frequency.value = frequency; // value in hertz
	oscillator.connect(audioCtx.destination);
  oscillator.onended = callback;
	oscillator.start(0);
	oscillator.stop(audioCtx.currentTime + duration);
}
 // callback for play note, choose random note, and random duration

 function nextNote() {
     if(playing){
    let n = Math.random() * 500 + 100
    changeColour(Math.floor(n));
    //duration
    let d = Math.random() * 15 + 1;
    playNote(n, d, nextNote);
     }
 }


 