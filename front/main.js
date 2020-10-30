function onNodeWriteClicked() {
  let lineNum = document.getElementById("lineNum").value;
  if(lineNum > 100 || lineNum < 1){
    performShake("write-input-section");
    return;
  }
  let write = document.getElementById("node-write");
  fetch('http://192.168.1.101/node/write?' + new URLSearchParams({ num: lineNum, }))
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
  fetch('http://192.168.1.101/go/go/write?' + new URLSearchParams({ lineNumber: lineNum, }))
  // fetch('http://127.0.0.1:8080/write?' + new URLSearchParams({ lineNumber: lineNum, }))  
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

//SHA Code
const POST = "POST";
const GET = "GET";
const F_NUM_ID = "num1";
const S_NUM_ID = "num2";

function goBtnClicked() {
  let fnum = document.getElementById(F_NUM_ID).value;
  let snum = document.getElementById(S_NUM_ID).value;
  if (!validateShaInput(fnum, snum)) {
    performShake("sha-input-section");
    return;
  }
  let url = "http://127.0.0.1:8080/sha";
  XMLHttpRequestSender(url, POST, [fnum, snum], "go-response");
}

function nodeBtnClicked() {
  let fnum = document.getElementById(F_NUM_ID).value;
  let snum = document.getElementById(S_NUM_ID).value;
  if (!validateShaInput(fnum, snum)) {
    performShake("sha-input-section");
    return;
  }
  let url = "http://127.0.0.1:3000/sha";
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
      if(this.readyState == 4 & this.status == 200){
        OnResponse(showRespondElementID, this.responseText);
        return;
      }
      //todo handle other errors
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
  return true;
}

function performShake(id){
  let el = document.getElementById(id);
  el.classList.add("input-error-shake");
  setTimeout(function() {
    el.classList.remove("input-error-shake");
  }, 300);
}

function OnResponse(id, responseText){
  var resJson = JSON.parse(responseText);
  document.getElementById(id).innerHTML = resJson.result;
}
