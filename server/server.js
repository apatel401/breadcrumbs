//using express to serve endpoints
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

let root = require("./fileData")
//intializing express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// path handler
app.get("/path/:myPath", (req, res) => {
  const { myPath } = req.params;

  let tree;

  // recursive function to iterate over all the keys in the structure
  const iterate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (key === myPath) {
        tree = obj[key];
      }
      if (typeof obj[key] === "object") {
        iterate(obj[key]);
      }
    });
  };

  if (myPath === "root") {
    tree = root;
  } else {
    iterate(root);
  }

  //get childrens of requested folder and their type.
  var result = Object.keys(tree.children).map(function (key) {
    return { file: key, type: tree.children[key].type };
  });

  res.json(result);
});

app.listen(port, () => `server started on port: ${port}`);