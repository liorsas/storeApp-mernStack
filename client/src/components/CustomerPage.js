import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  addNewCustomerObj,
  addProductToCustomer,
} from "../Redux/productActions";

function CustomerPage() {
  const dispatch = useDispatch();

  const [extDivCustomer, setExtDivCustomer] = useState(false);
  const [extDivProd, setExtDivProd] = useState(false);
  const [customerChosen, setCustomerChosen] = useState("");
  const [newCustumer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    city: "",
  });

  const storeData = useSelector((state) => state);

  const [selectedProduct, setSelectProduct] = useState(null);

  useEffect(() => {
    if (!selectedProduct) setSelectProduct(storeData?.products[0]);
  }, [storeData.products]);

  const parseCustomers = () => {
    const { products, customers } = storeData;

    //function

    const setCustomerState = (customer) => setCustomerChosen(customer);
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Products</th>
          </tr>
        </thead>
        {customers.map((oCustomer) => {
          const filteredProducts = storeData.purchases.filter(
            (el) => el.customerid === oCustomer._id
          );

          return (
            <tbody key={oCustomer._id}>
              <tr className="tbl-td-cust-name" key={oCustomer._id}>
                <td onClick={() => setCustomerState(oCustomer)}>
                  {" "}
                  <Link
                    className={`${
                      customerChosen._id === oCustomer._id ? "linkColor" : ""
                    }`}
                    to={"/customer/" + oCustomer._id}
                  >
                    {" "}
                    {oCustomer.firstname} {oCustomer.lastname}{" "}
                  </Link>
                </td>
                {filteredProducts.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Purchase Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => {
                        const { name } = products.find(
                          (prod) => prod._id === product.productid
                        );
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={"/product/" + product.productid}>
                                {name}{" "}
                              </Link>{" "}
                            </td>
                            <td>
                              {" "}
                              {new Date(product.date).toLocaleDateString(
                                "he-IL"
                              )}{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h3>There are no Products For {oCustomer.firstname}</h3>
                )}
              </tr>
            </tbody>
          );
        })}
      </Table>
    );
  };

  //function

  const handleChangeProduct = (e) => {
    let productid = e.target.value;

    let obj = storeData.products.find((prod) => prod._id === productid);
    setSelectProduct(obj);
  };

  const buyProductForCustomer = async () => {
    if (selectedProduct.quantity > 0) {
      dispatch(addProductToCustomer(selectedProduct, customerChosen));

      setExtDivProd(false);
    }
  };

  const changeDivProd = () => {
    if (!extDivProd && customerChosen && extDivCustomer) {
      setExtDivProd(true);
      setExtDivCustomer(false);
    } else if (!extDivProd && customerChosen && !extDivCustomer) {
      setExtDivProd(true);
    } else if (!extDivCustomer && !customerChosen && extDivProd) {
      setExtDivCustomer(false);
      setExtDivProd(false);
      alert("before choose but product has to choose a customer!");
    } else if (!extDivCustomer && !customerChosen && !extDivProd) {
      //setExtDivCustomer(true);

      alert("before choose a product you have to choose a customer!");
    } else {
      setExtDivProd(false);
    }
  };

  const changeDivCustomer = () => {
    if (!extDivCustomer && extDivProd) {
      setExtDivCustomer(true);
      setExtDivProd(false);
    } else if (!extDivProd && !extDivCustomer) {
      setExtDivCustomer(true);
    } else {
      setExtDivCustomer(false);
    }
  };

  const addNewCustomer = async () => {
    dispatch(addNewCustomerObj(newCustumer));

    setExtDivCustomer(false);
  };

  const returnToCustomerPage = () => setExtDivCustomer(false);

  return (
    <div>
      <h1>customers</h1>

      <Button
        className="buy-prod-btn"
        variant="secondary"
        size="lg"
        onClick={changeDivProd}
      >
        {" "}
        Buy Product{" "}
      </Button>
      <Button
        className="buy-prod-btn"
        variant="secondary"
        size="lg"
        onClick={changeDivCustomer}
      >
        {" "}
        Add New Customer{" "}
      </Button>
      {extDivProd && customerChosen !== "" && (
        <div className="abs-div">
          <div className="abs-div-form">
            <h1 style={{ color: "gray" }}>Select Product</h1>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Product
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="products"
                onChange={handleChangeProduct}
              >
                {storeData.products.map((prod, index) => {
                  return (
                    <MenuItem key={index} value={prod._id}>
                      {prod.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            <Button
              className="cust-buy-prod-btn"
              variant="outline-secondary"
              size="lg"
              onClick={buyProductForCustomer}
            >
              {" "}
              Buy{" "}
            </Button>
            <br />
            <br />
            <h2>
              Customer : {customerChosen.firstname} {customerChosen.lastname}
            </h2>
          </div>
        </div>
      )}

      {extDivCustomer && (
        <div className="abs-div">
          <div className="abs-div-form">
            <h1 style={{ color: "gray" }}>New Customer</h1>
            <div className=" new-cust-inp-box">
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter first name"
                onChange={(e) =>
                  setNewCustomer({ ...newCustumer, firstname: e.target.value })
                }
              />
              <br />
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter last name"
                onChange={(e) =>
                  setNewCustomer({ ...newCustumer, lastname: e.target.value })
                }
              />
              <br />
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter city"
                onChange={(e) =>
                  setNewCustomer({ ...newCustumer, city: e.target.value })
                }
              />
              <br />
              <Button
                className="new-cust-btn"
                variant="outline-secondary"
                onClick={addNewCustomer}
              >
                Create
              </Button>{" "}
              {""}
              <Button
                className="new-cust-btn"
                variant="outline-secondary"
                onClick={returnToCustomerPage}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {parseCustomers()}
    </div>
  );
}
export default CustomerPage;
