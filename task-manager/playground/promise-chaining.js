require("../src/db/mongoose");
const User = require("../src/models/user");

// 65e41426528a15c5e04d3db3

// User.findByIdAndUpdate("65df82aee25e6d66cce32e14", { age: 20 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};
updateAndCount("65df82aee25e6d66cce32e14", 0)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
