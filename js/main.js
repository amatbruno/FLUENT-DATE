
//#region CONSTANTS DEFINITION
const actualDate = document.getElementById("actual-date");
const actualTime = document.getElementById("actual-time");
const normalDate = document.getElementById("normal-date");
const otherDate = document.getElementById("other-date");
const simplifiedDate = document.getElementById("extended-date");
const selections = document.querySelectorAll(".selections");
const twelveSelect = document.getElementById("twelve-format");
const twentySelect = document.getElementById("twenty-format");

//DATE CONSTRUCTORS
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const yearSimplified = date.getFullYear();
var hours = date.getHours();
var minutes = date.getMinutes();
minutes = minutes < 10 ? '0' + minutes : minutes;
const seconds = date.getSeconds();
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthLiteral = monthName[date.getMonth()]; //Get month literal

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayWeek = weekday[date.getDay()]; //Get week day literal
//#endregion


//INITIALLY DISPLAY THE DATE & TIME
actualDate.innerHTML = day + '-' + month + '-' + year;
actualTime.innerHTML = hours + ':' + minutes + ':' + seconds;


//MULTIPLE SELECTION FOR DIVS
function selectDateFormat(selectedOpt) {
    selections.forEach(sel => sel.classList.remove('selected'));
    selectedOpt.classList.add('selected');
}
function selectHourFormat(selectedOpt) {
    selections.forEach(sel => sel.classList.remove('selected2'));
    selectedOpt.classList.add('selected2');
}


//#region LISTENERS FOR USER SELECTION
normalDate.addEventListener("click", function () {
    actualDate.innerHTML = day + '/' + month + '/' + year;
});
otherDate.addEventListener("click", function () {
    actualDate.innerHTML = day + '-' + monthLiteral + '-' + year;
});
simplifiedDate.addEventListener("click", function () {
    actualDate.innerHTML = dayWeek + ', ' + day + ' of ' + monthLiteral + ' of ' + year;
});
twelveSelect.addEventListener("click", function () {
    var AMPM = hours >= 12 ? 'PM' : 'AM';

    if (hours === 12) {
        hours = 12;
    } else {
        hours = hours%12;
    }

    actualTime.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + AMPM;
});
//#endregion