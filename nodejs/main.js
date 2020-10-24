const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const crypto = require("crypto");
const port = 3000;

// Simple Usage (Enable All CORS Requests)
app.use(cors());

app.get("/write", (req, res) => {
  let num = req.query.num;
  if (isNaN(num)) {
    res.send("error! please inter a number.");
  } else {
    num = +num;
    if (num < 1 || num > 100) {
      res.send("error! please inter a valid number.");
    } else {
      fs.readFile("textFile.txt", "utf8", (err, data) => {
        if (err) throw err;
        res.send(data.split("\n")[num - 1]);
      });
    }
  }
});

app.use(express.json());

app.post("/sha", (req, res) => {
  let a = req.body.a;
  let b = req.body.b;
  if (typeof a != "number" || typeof b != "number") {
    res.json({
      result: "error! please inter a number."
    });
  } else {
    res.json({
      result: crypto
        .createHash("sha256")
        .update((req.body.a + req.body.b).toString())
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
