import axios from "axios";

async function fetchAllData() {
  let productsWs = await axios.get(
    "https://store-app-mern-stack.herokuapp.com/api/product"
  );
  let productsArr = productsWs.data;

  let customersWs = await axios.get(
    "https://store-app-mern-stack.herokuapp.com/api/customers"
  );
  let customersArr = customersWs.data;

  let purchasesWs = await axios.get(
    "https://store-app-mern-stack.herokuapp.com/api/purchases"
  );
  let purchasesArr = purchasesWs.data;

  let obj = {
    products: productsArr,
    customers: customersArr,
    purchases: purchasesArr,
  };

  return obj;
}

async function SaveProdForCustomer(prodId, customerid) {
  //calc current date :

  let today = new Date();

  let obj = {
    customerid: customerid,
    productid: prodId,
    date: today,
  };

  let resp = await axios({
    method: "post",
    url: "https://store-app-mern-stack.herokuapp.com/api/purchases",
    data: obj,
    headers: { "Content-Type": "application/json" },
  });

  console.log(resp.data);

  return resp.data;
}

async function updateProduct(prodId, prodObj) {
  let resp = await axios({
    method: "put",
    url: "https://store-app-mern-stack.herokuapp.com/api/product/" + prodId,
    data: prodObj,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

async function deleteProduct(prodId) {
  let resp = await axios({
    method: "delete",
    url: "https://store-app-mern-stack.herokuapp.com/api/product/" + prodId,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

async function updateCustomer(customerId, custObj) {
  let resp = await axios({
    method: "put",
    url:
      "https://store-app-mern-stack.herokuapp.com/api/customers/" + customerId,
    data: custObj,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

async function deleteCustomer(customerId) {
  let resp = await axios({
    method: "delete",
    url:
      "https://store-app-mern-stack.herokuapp.com/api/customers/" + customerId,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

async function addNewCustomer(obj) {
  let resp = await axios({
    method: "post",
    url: "https://store-app-mern-stack.herokuapp.com/api/customers",
    data: obj,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

async function addNewProduct(obj) {
  let resp = await axios({
    method: "post",
    url: "https://store-app-mern-stack.herokuapp.com/api/product",
    data: obj,
    headers: { "Content-Type": "application/json" },
  });

  return resp.data;
}

const exportFiles = {
  SaveProdForCustomer,
  updateProduct,
  deleteProduct,
  updateCustomer,
  deleteCustomer,
  addNewCustomer,
  addNewProduct,
  fetchAllData,
};

export default exportFiles;
