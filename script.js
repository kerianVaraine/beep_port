/*
 AudioScheduledSourceNode (like the OscillatorNode)'s start() and stop() method accept a time parameter,
  which allows to schedule both method relatively with the AudioContext own clock. 
  This is far more precise than any other external timing method. 
  Also note that these nodes also have an onended event handler.
 */


// Seed for note pitches
/* might be worth making this customizable by user if they like, 
or default 'composer's choice' option played.
*/
let noteSeed = 6420;

//Interaction
let background = document.getElementById("background");
let playing = 0;

//div height ratio for addDiv function
let heightDurationRation = 3;

//Note duration multiplier and minimum
let durationMultiplyer = 10;
let durationMin = 0.3;

function startStop(){
    if(playing == 0){
        playing = 1;
        nextNote();
    }else {
        playing = 0;
    }
}

function changeColour(color){
    document.getElementById("background").style.backgroundColor = "#" + color;
}

// adding divs
function addDiv(frequency, duration){
    let divHeight = Math.ceil(duration * heightDurationRation);
    let newDiv = document.createElement("div");
    
    newDiv.setAttribute("style","background-color: #" + Math.ceil(frequency));
    newDiv.style.width = 100 + "vw";
    newDiv.style.height = divHeight + "px";
    background.append(newDiv);
    window.scrollBy(0,divHeight);
}

// Seedable random generator
let seedableRandom = Math.seed(noteSeed);


///////////////////////////////
// Audio stuff
// create web audio api context
//////
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


// function to init, play and stop oscillator
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

// seeded Random so all play cannon
 // callback for play note, choose random note, and random duration

 function nextNote() {
     if(playing == 1){
    let frequency = seedableRandom() * 500 + 150
    // changeColour(Math.floor(frequency));
    
    let duration = Math.random() * durationMultiplyer + durationMin;
        playNote(frequency, duration, nextNote);
        addDiv(frequency, duration);
    }
 }