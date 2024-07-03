const fs = require("fs");

// const book = {
//   title: "COmputer networks",
//   author: "Ayush",
// };

// const bookJson = JSON.stringify(book); //jsong string

// fs.writeFileSync("1-json.json", bookJson);
// const dataa = fs.readFileSync("1-json.json"); //return  buffer
// console.log(dataa.toString());
// console.log(bookJson);

// !const parseData=JSON.parse(bookJson)//wapis object bn gya

// console.log(parseData.author);

//!Assignment
const d = fs.readFileSync("1-json.json");
const parseData = JSON.parse(d.toString());
console.log(parseData.name);
parseData.name = "Ayush";
const JSONparseData = JSON.stringify(parseData);
fs.writeFileSync("2-json.json", JSONparseData);
