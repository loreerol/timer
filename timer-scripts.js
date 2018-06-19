/* To do:

get the time entered
when the set button is clicked, or enter is pushed

take the three entries entered, convert all three to total seconds

send the time to the timer clock

decrement the time on the timer clock

the play button should be disabled while timer is running
    on set, button style = clicked

hook up pause button
    if pause button clicked, removed clicked style from play button
    add clicked style to pause button, unless the clock was clear

hook up stop button, it should reset the clock and return it to fresh state
    if pause button clicked, removed clicked style from play button
    add clicked style to pause button, unless the clock was clear

get sand animation set to correspond to remaining time

play sound when time is up

---

get pomodoro mode working

*/

const setButton = document.getElementById('submit'); 

const clock = document.getElementsByClassName('remaining')[0];

let counter = 0;

setButton.addEventListener('click', () => {
    //regular timer values
    const timerHours = document.getElementsByClassName('reg-hours')[0].value;
    const timerMinutes = document.getElementsByClassName('reg-minutes')[0].value;
    const timerSeconds = document.getElementsByClassName('reg-seconds')[0].value;
    
    //checking that the values are not empty
  if(timerHours != 0 || timerMinutes != 0 || timerSeconds != 0){
     let timeInSecs = (timerHours * 3600) + (timerMinutes * 60) + (timerSeconds * 1);
      let parsed = parseInt(timeInSecs);
   
let time = 0;
//increment the timer, print to the screen
      function timeIt(){
          if((timeInSecs - counter) - 1 >= 0){
            counter++;
            time = timeInSecs - counter;
              makeItPretty();
          };
        };
  console.log(time);
      
//timer magic 
      setInterval(timeIt, 1000); 
    

//Make numbers be in 2 digits
function DD(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
        output = '0' + output;
    };
    return output;
};
    
//make it ready to be displayed and display it
      
function makeItPretty(t){
//turn seconds back into hours, minutes, and seconds      
    
    var hr = Math.floor(time / 3600);
    let nhr = Math.floor((time % 3600) / 60);
    var min = Math.floor(nhr);
     var sec = Math.floor(time % 60);
    
    
//Output numbers as double digits
    ddhr = DD(hr, 2);
    ddmin = DD(min, 2);
    ddsec = DD(sec, 2);
    clock.innerHTML = ddhr + ':' + ddmin + ':' + ddsec;
     
};
makeItPretty(time);   
      
  };
    
    });




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