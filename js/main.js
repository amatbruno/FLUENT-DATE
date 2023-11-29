//#region CONSTANTS DEFINITION
const actualDate = document.getElementById("actual-date");
const actualTime = document.getElementById("actual-time");
const normalDate = document.getElementById("normal-date");
const otherDate = document.getElementById("other-date");
const simplifiedDate = document.getElementById("extended-date");
const selections = document.querySelectorAll(".selections");
const twelveSelect = document.getElementById("twelve-format");
const twentySelect = document.getElementById("twenty-format");
const getSpain = document.getElementById("Spain");
const getUkraine = document.getElementById("Ukraine");
const getSouthAfrica = document.getElementById("South Africa");
const getColombia = document.getElementById("Colombia");
const getVietnam = document.getElementById("vietnam");
const getCanada = document.getElementById("Canada");

//DATE CONSTRUCTORS
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const yearSimplified = date.getFullYear();
var hours = date.getHours();
hours = hours < 10 ? '0'+hours : hours;
var minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
var seconds = date.getSeconds();
seconds = seconds < 10 ? "0" + seconds : seconds;
const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const monthLiteral = monthName[date.getMonth()]; //Get month literal

const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const dayWeek = weekday[date.getDay()]; //Get week day literal
//#endregion

//#region VARS DEFINITON
var canvas, ctx;
//#endregion

//#region HIDE INITIALS
actualDate.innerHTML = day + "-" + month + "-" + year;
actualTime.innerHTML = hours + ":" + minutes + ":" + seconds;
//#endregion

//#region FUNCTIONS
//MULTIPLE SELECTION FOR DIVS
function selectDateFormat(selectedOpt) {
    selections.forEach((sel) => sel.classList.remove("selected"));
    selectedOpt.classList.add("selected");
}
function selectHourFormat(selectedOpt) {
    selections.forEach((sel) => sel.classList.remove("selected2"));
    selectedOpt.classList.add("selected2");
}
//FUNCTION FOR DRAW CLOCK
function draw() {
    let time = (function () {
        let midnight = date;
        midnight.setHours(0);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);
        return Date.now() - midnight.getTime();
    })(),
        hours = time / (60 * 60 * 1000),
        minutes = (hours * 60) % 60,
        seconds = (minutes * 60) % 60,
        c = { x: canvas.width / 2, y: canvas.height / 2 };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";

    secondHand();
    minuteHand();
    hourHand();
    face();

    function face() {
        //Border clock
        ctx.lineWidth = 7;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(c.x, c.y, 140, 0, Math.PI * 2);
        ctx.stroke();

        //Dashes Clock
        ctx.lineWidth = 4;
        for (let i = 0; i < 60; i++) {
            let r = 133,
                l = 6;
            ctx.strokeStyle = "white";
            if (i % 5 === 0)
                (r -= l), (l += 2), (ctx.strokeStyle = "white");
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();
        }

        //Numbers
        ctx.font = "20px Rubik";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 1; i <= 12; i++) {
            let v = new Vector(111, Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx.fillText(i, v.getX() + c.x, v.getY() + c.y);
            ctx.strokeStyle = "white";
        }
    }

    function secondHand() {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
        let v = new Vector(95, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function minuteHand() {
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
        let v = new Vector(95, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function hourHand() {
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        let a = Math.PI * 2 * (hours / 12) - Math.PI / 2;
        let v = new Vector(60, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }
}
function init() {
    canvas = document.getElementById("clock");
    canvas.width = canvas.height = 300;
    ctx = canvas.getContext("2d");

    setInterval(draw, 10);
}
init();
function getPaths() {
    document.querySelectorAll(".allPaths").forEach((e) => {
        e.setAttribute("class", `allPaths ${e.id}`);
        e.addEventListener("mouseover", function () {
            window.onmousemove = function (j) {
                x = j.clientX;
                y = j.clientY;
                document.getElementById("name").style.top = y - 10 + "px";
                document.getElementById("name").style.left = x + 1 + "px";
            };
            const classes = e.className.baseVal.replace(/ /g, ".");
            document.querySelectorAll(`.${classes}`).forEach((country) => {
                country.style.fill = "#0000ff5d";
            });
            document.getElementById("name").style.opacity = 1;

            document.getElementById("namep").innerText = e.id;
        });
        e.addEventListener("mouseleave", function () {
            const classes = e.className.baseVal.replace(/ /g, ".");
            document.querySelectorAll(`.${classes}`).forEach((country) => {
                country.style.fill = "#dd9000";
            });
            document.getElementById("name").style.opacity = 0;
        });
    });
}
getPaths();
//#endregion

//#region LISTENERS
normalDate.addEventListener("click", function () {
    actualDate.innerHTML = day + "/" + month + "/" + year;
});
otherDate.addEventListener("click", function () {
    let simpDate = new Date().toLocaleDateString('en-us', {day:"numeric", year:"numeric", month:"short"})


    actualDate.innerHTML = simpDate;
});
simplifiedDate.addEventListener("click", function () {
    actualDate.innerHTML =
        dayWeek + ", " + day + " of " + monthLiteral + " of " + year;
});
twelveSelect.addEventListener("click", function () {
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0'+hours : hours;

    actualTime.innerHTML = hours + ":" + minutes + ":" + seconds + " " + ampm;
});
twentySelect.addEventListener("click", function () {


    actualTime.innerHTML = hours + ":" + minutes + ":" + seconds;
});
getSpain.addEventListener("click", function () {
    updateClock();
});
getUkraine.addEventListener("click", function () {
    hours = (hours + 3) % 24;
    updateClock();
});
//#endregion