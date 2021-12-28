import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import storeUtils from "../utils/storeUtils";

function EditProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value.customerid) === index;
  // }

  const storeData = useSelector((state) => {
    const stateObj = {};

    const prodId = params.id;
    let customersArr = state.customers;

    let prodArr = state.products;

    let prodFnd = prodArr.find((prod) => prod._id === prodId);

    stateObj.product = prodFnd;

    let purchaseArr = state.purchases;

    let prodCustArr = purchaseArr.filter((el) => el.productid === prodId);

    let customers = prodCustArr.reduce((acc, curr) => {
      const x = acc.find((item) => item.customerid === curr.customerid);

      if (!x) {
        return acc.concat([curr]);
      } else {
        return acc;
      }
    }, []);

    for (let i = 0; i < customers.length; i++) {
      customers[i].name =
        customersArr.find((el) => el._id === customers[i].customerid)
          .firstname +
        " " +
        customersArr.find((el) => el._id === customers[i].customerid).lastname;
    }

    stateObj.customers = customers;

    return stateObj;
  });

  const [product, setProduct] = useState(
    storeData.product
      ? {
          name: storeData.product.name,
          price: storeData.product.price,
          quantity: storeData.product.quantity,
        }
      : ""
  );

  //functions

  const updateProduct = async () => {
    if (
      product.name !== storeData.product.name ||
      product.price !== storeData.product.price ||
      product.quantity !== storeData.product.quantity
    ) {
      const prodId = params.id;

      let rspProd = await storeUtils.updateProduct(prodId, product);

      let newOBJ ={
        ...rspProd,_id:prodId

      }


      dispatch({ type: "UpdateProduct", payload: { oProd: newOBJ,prodId:prodId } });

      navigate("/products");
    }
  };

  const deleteProduct = async () => {
    const prodId = params.id;

    let resp = await storeUtils.deleteProduct(prodId);

    console.log(resp);

    dispatch({
      type: "deleteProdFromPurchaseAnProducts",
      payload: { prodid:resp },
    });
    navigate("/products");
  };

  return (
    <div>
      <div className="edit-prod-gen">
        <div className="upd-prod-form">
          <h1> Edit Product </h1>
          <div className="upd-prod-nest">
            <label className="lbl-field">
              {" "}
              Product Name:
              <input
                className="inp-field-prod"
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </label>
            <br />
            <label className="lbl-field">
              {" "}
              Product Price:
              <input
                className="inp-field-prod"
                type="text"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseInt(e.target.value) })
                }
              />
            </label>
            <br />
            <label className="lbl-field">
              {" "}
              Product Quantity:
              <input
                className="inp-field-prod"
                type="text"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: parseInt(e.target.value) })
                }
              />
            </label>

            <br />
            <input
              className="btn-upd-prod"
              type="button"
              value="Update"
              onClick={updateProduct}
            />
            <input
              className="btn-upd-prod"
              type="button"
              value="Delete"
              onClick={deleteProduct}
            />
          </div>
        </div>

        {storeData.customers.length > 0 && (
          <div className="edit-prod-cust">
            <h1>Customer List</h1>
            <ul>
              {storeData.customers.map((cust) => {
                return (
                  <li key={cust.customerid}>
                    {" "}
                    <Link to={"/customer/" + cust.customerid}>
                      {cust.name}{" "}
                    </Link>{" "}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default EditProduct;
