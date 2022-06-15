import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addProdToCustomer } from "../Redux/productActions";

import { Select, MenuItem } from "@mui/material";

function ProductCustomer({ customer }) {
  const dispatch = useDispatch();

  const [visibleDiv, setVisibleDiv] = useState(false);

  const [selectProduct, setSelectProduct] = useState(null);

  const storeData = useSelector((state) => state);

  useEffect(() => {
    if (!selectProduct) setSelectProduct(storeData?.products[0]);
  }, [storeData.products]);

  //functions

  const changeProduct = (e) => {
    let productid = e.target.value;

    let obj = storeData.products.find((prod) => prod._id === productid);
    setSelectProduct(obj);
  };

  const saveProductToCustomer = async () => {
    if (selectProduct.quantity > 0) {
      let newProdObj = {
        _id: selectProduct._id,
        name: selectProduct.name,
        price: selectProduct.price,
        quantity: selectProduct.quantity - 1,
      };
      dispatch(
        addProdToCustomer(selectProduct._id, customer.customerid, newProdObj)
      );
    } else {
      alert(`product- ${selectProduct.name} it is out of stock.`);
    }
  };

  return (
    <div>
      <Link to={"/customer/" + customer.customerid}>
        {customer.cutomerName} {"  "}{" "}
        {new Date(customer.date).toLocaleDateString("he-IL")}{" "}
      </Link>
      <br />
      <br />
      <Button
        className="prod-cust-btn"
        variant="primary"
        size="md"
        onClick={() => {
          setVisibleDiv(!visibleDiv);
        }}
      >
        {visibleDiv ? "Close" : "Add"}{" "}
      </Button>
      <div
        className={` 'hide-select' ${
          visibleDiv ? "visiblestyle" : "notvisiblestyle"
        }   }`}
      >
        <Select className="sel-div" onChange={changeProduct}>
          {storeData.products.map((prod, index) => {
            return (
              <MenuItem key={index} value={prod._id}>
                {prod.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          className="btn btn-secondary"
          variant="outline-secondary"
          size="md"
          onClick={saveProductToCustomer}
        >
          {" "}
          Save{" "}
        </Button>
      </div>
    </div>
  );
}

export default ProductCustomer;
