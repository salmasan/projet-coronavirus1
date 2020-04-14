// Séléctionner les aiguilles de montre
const SCORPHR = document.querySelector("#hour");
const SCORPMIN = document.querySelector("#minute");
const SCORPSEC = document.querySelector("#second");



 
function demarrerLaMontre() {

    var  myDate = new Date ();
    let myHour = myDate.getHours() ;
    let myMinute = myDate.getMinutes();
    let mySecond= myDate.getSeconds();

    //  console.log( "Hour:  "+ myHour+ " Minute: "+  myMinute+ " Second:"+ mySecond);

    let hr = myHour*360/12 + ((myMinute * 360/60)/12) ;
    let min = (myMinute * 360/60) + (mySecond* 360/60)/60;
    let sec = mySecond * 360/60;


    SCORPHR.style.transform = "rotate(" + hr + "deg)";
    SCORPMIN.style.transform = "rotate(" + min + "deg)";
    SCORPSEC.style.transform = "rotate(" + sec + "deg)";




}

var interval = setInterval(demarrerLaMontre,1000);