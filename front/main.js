const ip = "http://192.168.1.105"

function onNodeWriteClicked() {
  let lineNum = document.getElementById("lineNum").value;
  if(lineNum > 100 || lineNum < 1){
    performShake("write-input-section");
    return;
  }
  let write = document.getElementById("node-write");
  fetch(`${ip}/node/write?` + new URLSearchParams({ num: lineNum, }))
    // fetch('http://localhost:3000/write?'+ new URLSearchParams({num: lineNum,}))
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.text().then((data) => {
          console.log(data);
          write.innerText = data;
        })
      }
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
}


function onGoWriteClicked() {
  let lineNum = document.getElementById("lineNum").value;
  if(lineNum > 100 || lineNum < 1){
    performShake("write-input-section");
    return;
  }
  let write = document.getElementById("go-write");
  fetch(`${ip}/go/write?` + new URLSearchParams({ lineNumber: lineNum, }))
  // fetch('http://127.0.0.1:8080/write?' + new URLSearchParams({ lineNumber: lineNum, }))  
  .then(
      function (response) {
        if (response.status !== 200) {
          showAlert(WRITE_ALERT_FAILED, response.statusText);
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.text().then((data) => {
          console.log(data);
          write.innerText = data;
        })
      }
    )
    .catch((err) => {
      showAlert(WRITE_ALERT_FAILED, err);
      console.log('Fetch Error :-S', err);
    });
}

//SHA Code
const POST = "POST";
const GET = "GET";
const F_NUM_ID = "num1";
const S_NUM_ID = "num2";
const SHA_ALERT_FAILED = "sha-alert-failed";
const WRITE_ALERT_FAILED = "write-alert-failed";


function goBtnClicked() {
  let fnum = document.getElementById(F_NUM_ID).value;
  let snum = document.getElementById(S_NUM_ID).value;
  if (!validateShaInput(fnum, snum)) {
    performShake("sha-input-section");
    return;
  }
  let url = `${ip}/go/sha`;
  XMLHttpRequestSender(url, POST, [fnum, snum], "go-response");
}

function nodeBtnClicked() {
  let fnum = document.getElementById(F_NUM_ID).value;
  let snum = document.getElementById(S_NUM_ID).value;
  if (!validateShaInput(fnum, snum)) {
    performShake("sha-input-section");
    return;
  }
  let url = `${ip}/node/sha`;
  XMLHttpRequestSender(url, POST, [fnum, snum], "node-response");
}

function XMLHttpRequestSender(url, method, params, showRespondElementID) {
  var xhttp = new XMLHttpRequest();
  if(method == GET){

    return;
  }
  if(method == POST){
    let body = "fnum=" + params[0] + "&snum=" + params[1];
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        OnResponse(showRespondElementID, this.responseText);
        document.getElementById(SHA_ALERT_FAILED).style.display = "none";
        return;
      }
      if(this.readyState == 4 && this.status != 200 && this.status != 0){
        showAlert(SHA_ALERT_FAILED, this.status + ": " + this.responseText);
        return;
      }
      if(this.readyState == 4 && this.status == 0){
        showAlert(SHA_ALERT_FAILED, "Connection Refused!!! Check your connection and try again.");
        return;
      }
    }
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(body);
    return;
  }
}

function validateShaInput(firstNumber, secondNumber){
  if(isNaN(firstNumber) || isNaN(secondNumber)){
    return false;
  }
  if(firstNumber == "" || secondNumber == ""){
    return false;
  }
  return true;
}

function performShake(id){
  let el = document.getElementById(id);
  el.classList.add("input-error-shake");
  setTimeout(function() {
    el.classList.remove("input-error-shake");
  }, 300);
}

function showAlert(id, text){
  let el = document.getElementById(id);
  el.innerHTML = text;
  el.style.display = "block";
}

function OnResponse(id, responseText){
  var resJson = JSON.parse(responseText);
  document.getElementById(id).innerHTML = resJson.result;
}
