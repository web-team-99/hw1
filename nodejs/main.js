const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const fs = require("fs");
const crypto = require("crypto");
const port = 3000;
const FILE_PATH = "/home/hw1/nodejs/textFile.txt";

app.use(cors());

app.get("/write", (req, res) => {
  let num = req.query.num;
  if (isNaN(num)) {
    res.status(406).send({message: "error! please enter a number."});
  } else {
    num = +num;
    if (num < 1 || num > 100) {
      res.status(406).send({message: "error! please enter a valid number."});
    } else {
      fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) throw err;
        res.send(data.split("\n")[num - 1]);
      });
    }
  }
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.post("/sha", (req, res) => {
  let a = parseFloat(req.body.fnum);
  let b = parseFloat(req.body.snum);
  if (isNaN(a) || isNaN(b)) {
    // res.json({
    //   result: "error! please inter a number."
    // });
    res.status(406).send({message: "error! please enter a number."});
  } else {
    res.json({
      result: crypto
        .createHash("sha256")
        .update((a + b).toString())
        .digest("base64")
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// for (var i = 1; i <= 100; i++) {
//   fs.appendFileSync("textFile.txt", `line: ${i}\n`);
// }
