let savedHours = 0;
let savedMinutes = 0;
let savedSeconds = 0;
let sandTop = 0;

const setButton = document.getElementById('submit'); 
const submitIcon = document.getElementById('submitIcon');
const clock = document.getElementsByClassName('remaining')[0];
const getSandTop = document.getElementsByClassName("innersandbottom")[0];
const getSandBottom = document.getElementsByClassName("innersandtop")[0];
console.log(sandTop);
const alarmIcon = document.getElementsByClassName("alarm-icon")[0];
console.log(alarmIcon);

let counter = 0;
let myInterval = 0;
let isPaused = false;

setButton.addEventListener('click', () => {
//get the value that has been entered 
let enteredHours = document.getElementsByClassName('reg-hours')[0].value;
let enteredMinutes = document.getElementsByClassName('reg-minutes')[0].value;
let enteredSeconds = document.getElementsByClassName('reg-seconds')[0].value;

//check to see if this is a new value
if (savedHours == enteredHours && savedMinutes == enteredMinutes && savedSeconds == enteredSeconds){

//if true, no new value has been entered, they are pausing or restarting the clock

//check to see if the clock had been paused
if (isPaused == false){
clearInterval(myInterval);
        makeItPretty();
        console.log("paused");
        isPaused = true;
        submitIcon.classList.remove('fa-pause');
        submitIcon.classList.add('fa-play');
} else{
clearInterval(myInterval);
        isPaused = false;
        myInterval = setInterval(function(){
        counter++;
        makeItPretty();
}, 1000)
    console.log("started");
        submitIcon.classList.remove('fa-play');
        submitIcon.classList.add('fa-pause');
    };
}else{
 console.log("set clock");   
//if the value is new, reset the clock
    isPaused = false;
        submitIcon.classList.remove('fa-play');
        submitIcon.classList.add('fa-pause');
clearInterval(myInterval);
    savedHours = enteredHours;
    savedMinutes = enteredMinutes;
    savedSeconds = enteredSeconds;
//start the clock 
myInterval = setInterval(function(){
        counter++;
        makeItPretty();
}, 1000)};
    

//make it ready to be displayed and display it
function makeItPretty(){
let time = 0;
//turn all values into seconds and combine them into one value
let timeInSecs = (savedHours * 3600) + (savedMinutes * 60) + (savedSeconds * 1);
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
if (time === 0){
        clearInterval(myInterval);
        clock.innerHTML = "00" + ':' + "00" + ':' + "00";
}else{
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

});

let alarmbell  = document.getElementById("alarm-bell").value;
console.log(alarmbell);

function alarmToggle(){
    if (alarmbell == 'on'){
        alarmbell = 'off';
        console.log('off');
        alarmIcon.classList.add('fa-bell');
        alarmIcon.classList.remove('fa-bell-slash');
        return alarmbell;
    } else {
        alarmbell = 'on';
        console.log('on');
        alarmIcon.classList.remove("fa-bell");
        alarmIcon.classList.add("fa-bell-slash");
        return alarmbell;
    }
}

//Toggle between pomodoro mode and regular timer

let chk  = document.getElementById("toggler").value;

function toggle(){
    if(chk == 'on'){
        chk = 'off';
        document.getElementsByClassName("totalpoms")[0].style.display = "block";
        document.getElementById("settings-reg").style.display= "none";
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