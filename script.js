const currTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("./files/ringtone.mp3");

for(let i=12; i>0; i--){
    i = (i<10) ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59; i>=0; i--){
    i = (i<10) ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2; i>0; i--){
    let AMPM  = (i==1) ? "AM" : "PM";
    
    let option = `<option value="${AMPM}">${AMPM}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() => {
    //getting hour, mins, secs
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    AMPM = "AM";

    if(h>=12){
        h = h - 12;
        AMPM = "PM";
    }

    // if hour value is 0, set this value to 12 

    if(h==0){
        h = 12;
    }

    // adding 0 before hr, min, sec if this value is less than 10
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;
    // console.log(`${h}:${m}:${s} ${AMPM}`);
    currTime.innerText = `${h}:${m}:${s} ${AMPM}`;

    if(alarmTime == `${h}:${m} ${AMPM}`){
        ringtone.play();
        ringtone.loop = true;
        // console.log("Alarm ringing...");
    }
}, 1000);


function setAlarm(){

    if(isAlarmSet){
        alarmTime = ""; // if isAlarmSet is true
        ringtone.pause(); // clear the value of alarmTime
        content.classList.remove("disable"); // pause the ringtone
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false; //return isAlarmSet value to false
    }
    //checking valid input 
    if(selectMenu[0].value == "Hour" || selectMenu[1].value =="Minute" || selectMenu[2].value == "AM/PM"){
        
        return alert("Please, select a valid time to set Alarm!");
    }
    // getting hour, minute, ampm select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    
    isAlarmSet = true;
    alarmTime = time;
    //disabled the content after clicking setAlarm
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    // console.log(time);
}
setAlarmBtn.addEventListener("click", setAlarm);