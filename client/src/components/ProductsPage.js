import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Product from "./Product";

import { addnewProduct } from "../Redux/productActions";

function ProductPage() {
  const dispatch = useDispatch();

  const [prodDiv, setProdDiv] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const purchaseAmount = useSelector((state) => {
    console.log(state);
    return state;
  });

  //function

  const addNewProduct = async () => {
    dispatch(addnewProduct(newProduct));
    setNewProduct({ name: "", price: 0, quantity: 0 });
    setProdDiv(false);
  };

  const returnToProductPage = () => {
    setProdDiv(false);
  };

  const renderProducts = () => {
    purchaseAmount.products.map((prod) => {
      return <Product key={prod._id} product={prod} />;
    });
  };

  return (
    <div>
      <h1>Products Page</h1>

      <Button
        className="buy-prod-btn"
        variant="secondary"
        size="lg"
        onClick={() => setProdDiv(!prodDiv)}
        style={{ float: "right" }}
      >
        {" "}
        Add New Product{" "}
      </Button>

      <Button className="amount-prod-btn" variant="secondary" size="lg" active>
        Purchase Amount: {purchaseAmount.purchaseAmount}
      </Button>
      <br />

      {prodDiv && (
        <div className="abs-prod-div">
          <div className="abs-prod-div-form">
            <h1 style={{ color: "gray" }}>New Product</h1>
            <div className=" new-cust-inp-box">
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter name"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <br />
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter price"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <br />
              <input
                className="new-cust-inp-field"
                type="text"
                placeholder="enter quantity"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <br />
              <Button
                className="new-cust-btn"
                variant="outline-secondary"
                onClick={addNewProduct}
              >
                Create
              </Button>{" "}
              {""}
              <Button
                className="new-cust-btn"
                variant="outline-secondary"
                onClick={returnToProductPage}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <br />

      <div className="prods-grid">
        {purchaseAmount.products.map((prod) => {
          return <Product key={prod._id} product={prod} />;
        })}
      </div>
    </div>
  );
}
export default ProductPage;
