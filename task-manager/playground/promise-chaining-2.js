require("../src/db/mongoose");
const Task = require("../src/models/task");
const User = require("../src/models/task");

// Task.findOneAndDelete("65e41bad95ca9fe7f4abd2fe")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: "false" });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteAndCount = async (id) => {
  const task = Task.findOneAndDelete(id);
  const count = Task.countDocuments({ completed: "false" });
  return count;
};

deleteAndCount("65ebe93188124a732f095694")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
