function onNodeWriteClicked() {
  let lineNum = document.getElementById("lineNum").value;
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
  let write = document.getElementById("go-write");
  fetch('http://192.168.1.101/go/go/write?' + new URLSearchParams({ lineNumber: lineNum, }))
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

function goBtnClicked() {
  let fnum = document.getElementById("num1").value;
  let snum = document.getElementById("num2").value;
  // if (!validateShaInput(fnum, snum)) {
  //   // todo 
  //   return;
  // }
  let url = "http://127.0.0.1:8080/sha";
  xHttpRequestSender(url, POST, [fnum, snum], "go-response");
}

function nodeBtnClicked() {
  let fnum = document.getElementById("num1").value;
  let snum = document.getElementById("num2").value;
  // if (!validateShaInput(fnum, snum)) {
  //   //todo
  //   return;
  // }
  let url = "http://127.0.0.1:3000/sha";
  xHttpRequestSender(url, POST, [fnum, snum], "node-response");
}

function OnResponse(id, responseText){
  document.getElementById(id).innerHTML = responseText;
}

function xHttpRequestSender(url, method, params, showRespondElementID) {
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

    }
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(body);
    return;
  }

}

