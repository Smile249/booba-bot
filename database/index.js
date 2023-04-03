const fs = require("fs");

function setSsId(disId, ssId) {
  addUser(disId, ssId)  
  let db = JSON.parse(fs.readFileSync("database.json"));
  db[disId]["ssId"] = ssId;
  fs.writeFileSync("database.json", JSON.stringify(db));
}

function IsExist(disId) {
  let db = JSON.parse(fs.readFileSync("database.json"));
  if (db[disId]) return true;
  return false;
}

function addUser(disId, ssId) {
  let db = JSON.parse(fs.readFileSync("database.json"));
  if (IsExist(disId)) return;
  db[disId] = { ssId: ssId, scores: [] };
  fs.writeFileSync("database.json", JSON.stringify(db));
}

function addScore(disId, ssId, score) {
    addUser(disId, ssId)
    let db = JSON.parse(fs.readFileSync("database.json"));
    if(db[disId].scores.indexOf(score) == -1) db[disId].scores.push(score)
    fs.writeFileSync("database.json", JSON.stringify(db));
}

addScore("smile", "12345", "8438483838")