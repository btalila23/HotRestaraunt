var express = require("express");
var path = require("path");

var app = express();
var PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var table = [
    {
      Name: "Christina",
      nickname: "Chrissy",
      tableof: 3,
      age: 26,
    },
    {
      Name: "Dick Van Dyck",
      nickname: "Donnie Dickyl",
      tableof: 4,
      age: 34,
    },
    {
      Name: "Ben Kenobi",
      nickname: "Obi Wan Kenobi",
      tableof: 2,
      age: 55,
    }
  ];

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
  
  // Displays all characters
  app.get("/api/table", function(req, res) {
    return res.json(table);
  });

  app.get("/api/table/:table", function(req, res) {
    var chosen = req.params.table;
  
    console.log(chosen);
  
    for (var i = 0; i < table.length; i++) {
      if (chosen === table[i].Name) {
        return res.json(table[i]);
      }
    }
  
    return res.json(false);
  });


app.post("/api/table", function(req, res) {
    
    
    var newTable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.Name = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    table.push(newTable);
  
    res.json(newTable);
  });
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });