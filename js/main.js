var error1 = document.querySelector(".error1")
var error2 = document.querySelector(".error2")
var input1 = document.querySelector(".inp1")
var input2 = document.querySelector(".inp2")
var submit = document.querySelector(".submit")
var del   =document.querySelectorAll(".rowline .del");

var alldata = [];
if (localStorage.getItem("alldata") != null) {
    alldata = JSON.parse(localStorage.getItem("alldata"));
    getDisplay();
}
submit.addEventListener("click", function () {
    if (validationName() || validationName2() || validationUrl() || validationUrl2()) {
        if (validationName()) {
            error1.classList.replace("d-none", "d-block")
            error1.innerHTML = "Name is required";
        }
        if (validationName2()) {
            error1.classList.replace("d-none", "d-block")
            error1.innerHTML = "this name already exist";
        }
        if (validationUrl()) {
            error2.classList.replace("d-none", "d-block")
            error2.innerHTML = "Url Field is required";
        }
        if (validationUrl2()) {
            error2.classList.replace("d-none", "d-block")
            error2.innerHTML = "this url already exist";
        }



        if ((validationName() == false && validationName2() == false)) {
            error1.classList.replace("d-block", "d-none")
        }


        if (validationUrl() == false && validationUrl2() == false) {
            error2.classList.replace("d-block", "d-none")
        }
    } else {
        error1.classList.replace("d-block", "d-none")
        error2.classList.replace("d-block", "d-none")
        addData();
    }





})

function addData() {
    var data = {
        name: input1.value.trim(),
        url: input2.value.trim()
    }
    alldata.push(data);
    localStorage.setItem("alldata", JSON.stringify(alldata))
    getClear();
    getDisplay();
}
function getClear() {
    input1.value = "";
    input2.value = "";
}
function getDisplay() {
    var cartoona = "";
    for (var i = 0; i < alldata.length; ++i) {
        cartoona += `<div class="rowline ">
        <h2>${alldata[i].name}</h2>
        <a href="${alldata[i].url}" target="_blank" class="btn-primary btn">Visit</a>
        <button data_index="${i}" onclick="deleted(${i})" class="btn  del btn-danger mx-2">Delete </button>
    </div>`
    }
    document.querySelector(".cart").innerHTML = cartoona;
}
//  
function validationName() {
    if (input1.value.trim() == "") {
        return true;
    }
    return false;
}
function validationName2() {
    for (var i = 0; i < alldata.length; ++i) {
        if (alldata[i].name == input1.value.trim()) {
            return true;
        }
    }
    return false;

}
function validationUrl() {
    if (input2.value.trim() == "") {
        return true;
    }
    return false;

}
function validationUrl2() {
    for (var i = 0; i < alldata.length; ++i) {
        if (alldata[i].url == input2.value.trim()) {
            return true;
        }
    }
    return false;

}

function deleted (index){
    alldata.splice(index,1);
    localStorage.setItem("alldata",JSON.stringify(alldata))
    getDisplay();
}
