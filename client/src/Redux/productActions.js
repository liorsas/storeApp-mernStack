import storeUtils from "../utils/storeUtils";

export const fetchData = () => async (dispatch) => {
  const resp = await storeUtils.fetchAllData();
  console.log(resp);
  dispatch({
    type: "Load",
    payload: {
      products: resp.products,
      customers: resp.customers,
      purchases: resp.purchases,
    },
  });
};

export const addProdToCustomer =
  (prodId, customerId, newObj) => async (dispatch) => {
    const resp = await storeUtils.SaveProdForCustomer(prodId, customerId);

    let respUpdProd = await storeUtils.updateProduct(prodId, newObj);

    dispatch({
      type: "AddPurchaseAndUpdateProduct",
      payload: {
        pObj: resp,
        prodObj: respUpdProd,
        prodId: prodId,
      },
    });
  };

export const addnewProduct = (obj) => async (dispatch) => {
  let resp = await storeUtils.addNewProduct(obj);
  dispatch({ type: "AddProduct", payload: { oProduct: resp } });
};

export const updateProductObj = (prodId, obj) => async (dispatch) => {
  let resp = await storeUtils.updateProduct(prodId, obj);

  let newOBJ = {
    ...resp,
    _id: prodId,
  };
  dispatch({
    type: "UpdateProduct",
    payload: { oProd: newOBJ, prodId: prodId },
  });
};

export const deleteProductObj = (prodId) => async (dispatch) => {
  let resp = await storeUtils.deleteProduct(prodId);

  dispatch({
    type: "deleteProdFromPurchaseAnProducts",
    payload: { prodid: resp },
  });
};

export const updateCustomerObj = (custId, obj) => async (dispatch) => {
  let resp = await storeUtils.updateCustomer(custId, obj);

  let newOBJ = {
    ...resp,
    _id: custId,
  };

  dispatch({
    type: "UpdateCustomer",
    payload: { oCustomer: newOBJ, custId: custId },
  });
};

export const deleteCustomerObj = (custId) => async (dispatch) => {
  let resp = await storeUtils.deleteCustomer(custId);

  dispatch({
    type: "deleteCustomerFromPurchaseAnCustomers",
    payload: { customerid: resp },
  });
};

export const addProductToCustomer = (prodobj, custObj) => async (dispatch) => {
  let resp = await storeUtils.SaveProdForCustomer(prodobj._id, custObj);

  let newProdObj = {
    _id: prodobj._id,
    name: prodobj.name,
    price: prodobj.price,
    quantity: prodobj.quantity - 1,
  };
  let respUpdProd = await storeUtils.updateProduct(prodobj._id, newProdObj);

  dispatch({
    type: "AddPurchaseAndUpdateProduct",
    payload: {
      pObj: resp,
      prodObj: respUpdProd,
      prodId: prodobj._id,
    },
  });
};

export const addNewCustomerObj = (custObj) => async (dispatch) => {
  let resp = await storeUtils.addNewCustomer(custObj);

  dispatch({ type: "AddCustomer", payload: { oCustomer: resp } });
};
