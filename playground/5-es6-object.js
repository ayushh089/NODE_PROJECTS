const product = {
  label: "Audi",
  price: 300,
  stock: 20,
};
const { label, stock } = product;
// console.log(label);
// console.log(stock);

const transaction = (type, { label, price, stock }) => {
  console.log(label, price, stock);
};
transaction("order", product);
