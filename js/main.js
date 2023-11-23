const actualDate = document.getElementById("actual-date");

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();


//alert("day: " + day + " month: " +  month + " year: " + year);

actualDate.innerText = day + month + year;