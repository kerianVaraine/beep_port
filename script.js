/*
 AudioScheduledSourceNode (like the OscillatorNode)'s start() and stop() method accept a time parameter,
  which allows to schedule both method relatively with the AudioContext own clock. 
  This is far more precise than any other external timing method. 
  Also note that these nodes also have an onended event handler.
 */


//Interaction
let background = document.getElementById("background");
let playing = false;

function startStop(){
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

// adding divs
function addDiv(frequency, duration){
    let newDiv = document.createElement("div");
    
    newDiv.setAttribute("style","background-color: #" + Math.ceil(frequency));
    newDiv.style.width = 100 + "vw";
    newDiv.style.height = Math.ceil(duration) * 5 + "px";
    background.append(newDiv);

}

// Seedable random generator
let seedableRandom = Math.seed(101);


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

// seeded Random so all play cannon

 // callback for play note, choose random note, and random duration

 function nextNote() {
     if(playing){
    let frequency = seedableRandom() * 500 + 150
    // changeColour(Math.floor(frequency));
    
    let duration = Math.random() * 10 + 0.2;
        playNote(frequency, duration, nextNote);
        addDiv(frequency, duration);
        pageScroll();
    }
 }
 
//continueous scrolling
 let scrollDirection = 1, pageScroll;
 pageScroll = function() {
     window.scrollBy(0,scrollDirection); // horizontal and vertical scroll increments
     scrolldelay = setTimeout(pageScroll,5); // scrolls every 100 milliseconds
 }

 pageScroll(); //need to turn this on or off depending on if playing or not