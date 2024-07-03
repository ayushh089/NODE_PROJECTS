const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};
// add(2, 3)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 5)
//       .then((sum) => {
//         console.log(sum);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//? PROMISE CHAINING
add(4, 3)
  .then((sum) => {
    console.log(sum);
    return add(sum, 6);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });
