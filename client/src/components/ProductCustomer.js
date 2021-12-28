import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import storeUtils from "../utils/storeUtils";

import { Select, MenuItem } from "@mui/material";

function ProductCustomer({ customer }) {
  const dispatch = useDispatch();

  const [visibleDiv, setVisibleDiv] = useState(false);
  //const[productArr,setProductArr] = useState([])
  const [selectProduct, setSelectProduct] = useState(null);

  // const productName = useSelector((state) => {
  //   let productArr = state.products;

  //   let productObjArr = productArr.map((prod) => ({
  //     id: prod._id,
  //     name: prod.name,
  //   }));

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
    let resp = await storeUtils.SaveProdForCustomer(
      selectProduct._id,
      customer.customerid
    );

    dispatch({ type: "AddPurchase", payload: { obj: resp } });
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
