const express = require("express");
require("./db/mongoose.js");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");
const app = express();
const auth = require("./middleware/auth.js");

const port = process.env.PORT || 3000;


//!middleware new request-> do something -> run route handler
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("DISABLEd");
//   } else {
//     next();
//   }
// });
app.use(express.json()); //parse incoming obj to an json
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

// const main = async () => {
//   //!find user ny task!
//   // const task = await Task.findById("660d5f2efdacc63859c3fee2");
//   // await task.populate('owner')
//   // console.log(task.owner);//search user by that id but it will be a manual process

//   //!task by user
//   const user = await User.findById("660b0a066e4381399cca3ba4");
//   await user.populate("tasks");
//   console.log(user.tasks);
// };
// main();
// const bcrypt = require("bcrypt");
// const myFunction = async () => {
//   const password = "Ayush121";
//   const hashPass = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashPass);

//   const isMatch=await bcrypt.compare(password,hashPass)
//   console.log(isMatch);
// };
// myFunction();

// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "iamstudyingnodejsa",{expiresIn:'10 seconds'});
//   console.log(token);
//   const data = jwt.verify(token, "iamstudyingnodejsa");
//   console.log(data);
// };
// myFunction();

//multer
