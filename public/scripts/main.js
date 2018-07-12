console.log('Warning: Dates in calendar are closer than they appear.');

function startTime() {
    var today = new Date();
    var d = today.getDate();
    var M = today.getMonth() + 1;
    var y = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeClock').innerHTML =
        M + "/" + d + "/" + y + " " + h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

window.onload = startTime();