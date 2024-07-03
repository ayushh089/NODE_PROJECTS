const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("NUMBER < 0");
      }
      resolve(a + b);
    }, 2000);
  });
};
const doWork = async () => {
  //   return "Pooja"; //!now thid is returning promise not a string
  const sum1 = await add(1, 2);
  const sum2 = await add(sum1, 3);
  const sum3 = await add(sum1, sum2);
  return sum3;
};
doWork()
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
