function onNodeWriteClicked(){
    // console.log("clicked");
    let lineNum = document.getElementById("lineNum").value;
    let write = document.getElementById("node-write");
    fetch('http://192.168.1.101/node/write?'+ new URLSearchParams({num: lineNum,}))
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.text().then( (data) => {
            console.log(data);
            write.innerText = data;
        })
      }
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }


function onGoWriteClicked(){
    // console.log("clicked");
    let lineNum = document.getElementById("lineNum").value;
    let write = document.getElementById("go-write");
    fetch('http://192.168.1.101/go/go/write?'+ new URLSearchParams({lineNumber: lineNum,}))
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.text().then( (data) => {
            console.log(data);
            write.innerText = data;
        })
      }
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }