let hours = 0;
let minutes = 0;
let seconds = 0;

let savedHours = 0;
let savedMinutes = 0;
let savedSeconds = 0;
let savedPomHours = 0;
let savedPomMinutes = 0;
let savedPomSeconds = 0;
let sandTop = 0;
let pomMode = "off";
let pomCount = 0;

const setButton = document.getElementById('submit'); 
const submitIcon = document.getElementById('submitIcon');
const clock = document.getElementsByClassName('remaining')[0];
const getSandTop = document.getElementsByClassName("innersandbottom")[0];
const getSandBottom = document.getElementsByClassName("innersandtop")[0];
const alarmIcon = document.getElementsByClassName("alarm-icon")[0];
let alarmbell  = document.getElementById("alarm-bell").value;
const bellSound = new Audio('service-bell_daniel_simion.wav');


let counter = 0;
let myInterval = 0;
let isPaused = false;

//Toggle between pomodoro mode and regular timer
let chk  = document.getElementById("toggler").value;

function toggle(){
    if(chk == 'on'){
        chk = 'off';
        document.getElementsByClassName("totalpoms")[0].style.display = "block";
        document.getElementById("pom-input").style.display="block";
        return chk;
    } else if( chk == 'off'){
        chk = 'on';
        document.getElementsByClassName("totalpoms")[0].style.display = "none";
        document.getElementById("settings-reg").style.display= "block";
        document.getElementById("pom-input").style.display="none";
        return chk;
    };
};

//alarm sound toggel
function alarmToggle(){
    if (alarmbell == 'on'){
        alarmbell = 'off';
        alarmIcon.classList.add('fa-bell');
        alarmIcon.classList.remove('fa-bell-slash');
        return alarmbell;
    } else {
        alarmbell = 'on';
        alarmIcon.classList.remove("fa-bell");
        alarmIcon.classList.add("fa-bell-slash");
        return alarmbell;
    }
}

function everything(){
    //get the value that has been entered for work/regular timer
let enteredHours = document.getElementsByClassName('reg-hours')[0].value;
let enteredMinutes = document.getElementsByClassName('reg-minutes')[0].value;
let enteredSeconds = document.getElementsByClassName('reg-seconds')[0].value;
    
//get the value that has been entered for rest timer
let enteredPomHours = document.getElementsByClassName('pom-hours')[0].value;
let enteredPomMinutes = document.getElementsByClassName('pom-minutes')[0].value;
let enteredPomSeconds = document.getElementsByClassName('pom-seconds')[0].value;

//check to see if this is a new value
if (savedHours == enteredHours && savedPomHours == enteredPomHours && savedMinutes == enteredMinutes && savedPomMinutes == enteredPomMinutes && savedSeconds == enteredSeconds && savedPomSeconds == enteredPomSeconds){

//if true, no new value has been entered, they are pausing or restarting

//check to see if the clock had been paused
if (isPaused == false){
    //if the clock is paused, restart the clock
    clearInterval(myInterval);
    if(pomMode == 'off'){
        makeItPretty(savedHours, savedMinutes, savedSeconds);
    }else{
        makeItPretty(savedPomHours, savedPomMinutes, savedPomSeconds);
    }
        isPaused = true;
        submitIcon.classList.remove('fa-pause');
        submitIcon.classList.add('fa-play');
} else {
    clearInterval(myInterval);
    isPaused = false;
    myInterval = setInterval(function(){
        counter++;
    if(pomMode == 'off'){
        makeItPretty(savedHours, savedMinutes, savedSeconds);
    }else{
        makeItPretty(savedPomHours, savedPomMinutes, savedPomSeconds);
    }
}, 1000)
        submitIcon.classList.remove('fa-play');
        submitIcon.classList.add('fa-pause');
    };
}else{   
//if the value is new, reset the clock
    counter = 0;
    isPaused = false;
        submitIcon.classList.remove('fa-play');
        submitIcon.classList.add('fa-pause');
clearInterval(myInterval);
    savedHours = enteredHours;
    savedMinutes = enteredMinutes;
    savedSeconds = enteredSeconds;
    savedPomHours = enteredPomHours;
    savedPomMinutes = enteredPomMinutes;
    savedPomSeconds = enteredPomSeconds;
//start the clock 
myInterval = setInterval(function(){
        counter++;
        if(pomMode == 'off'){
        makeItPretty(savedHours, savedMinutes, savedSeconds);
    }else{
        makeItPretty(savedPomHours, savedPomMinutes, savedPomSeconds);
    }
}, 1000)};
    
function pomodoro(){
    clearInterval(myInterval);
        time = 0;
        counter = 0;
    
    if (chk == 'on'){
    //if on, then pom mode is off
        console.log("regular timer only");
    }else{
        //the clock has got to 0 and pom mode is on
        pomCount++;
        MyInterval = setInterval(function(){
            counter++;
            if(pomMode == 'off'){
                makeItPretty(savedHours, savedMinutes, savedSeconds);
                console.log("reg time");
            }else{
                makeItPretty(savedPomHours, savedPomMinutes, savedPomSeconds);
                console.log("pom time");
            }
        }, 1000);
        pomMode = 'off';
        
    }
}
//make it ready to be displayed and display it
function makeItPretty(x, y, z){
let time = 0;
//turn all values into seconds and combine them into one value
let timeInSecs = (x * 3600) + (y * 60) + (z * 1);

let parsed = parseInt(timeInSecs);
  
//Make numbers be in 2 digits
function DD(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
        output = '0' + output;
    };
    return output;
};
//turn seconds back into hours, minutes, and seconds
    time = timeInSecs - counter;
//check to see if time has run out and if alarm should sound
if (time === 0 && alarmbell == 'off'){
        clearInterval(myInterval);
        clock.innerHTML = "00" + ':' + "00" + ':' + "00";
        bellSound.play();
        pomodoro();
}else if(time === 0 && alarmbell == 'on'){
         clearInterval(myInterval);
        clock.innerHTML = "00" + ':' + "00" + ':' + "00";
        pomodoro();
} else {
    var hr = Math.floor(time / 3600);
    let nhr = Math.floor((time % 3600) / 60);
    var min = Math.floor(nhr);
    var sec = Math.floor(time % 60);
    
//Output numbers as double digits
    ddhr = DD(hr, 2);
    ddmin = DD(min, 2);
    ddsec = DD(sec, 2);
    clock.innerHTML = ddhr + ':' + ddmin + ':' + ddsec;
}
    
//hourglass animation  
let sandTop = (time/parsed*100)/2;
let sandBottom = 50 - sandTop;
getSandTop.style.height = sandTop + "%";
getSandBottom.style.height = sandBottom + "%";

};


}

setButton.addEventListener('click', () => {
 everything();
});

