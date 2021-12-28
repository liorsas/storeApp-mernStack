import { useSelector } from "react-redux";
import { useState } from "react";

function PurchaseSearch({ callbackSearch }) {
  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [inpDate, setInpDate] = useState(null);

  const storeData = useSelector((state) => state);

  //functions
  const selectedProduct = (e) => {
    let productId = e.target.value;

    let prodObj = storeData.products.find((el) => el._id === productId);
    setProduct(prodObj);
  };

  const selectedCustomer = (e) => {
    let customerId = e.target.value;

    let customerObj = storeData.customers.find((el) => el._id === customerId);
    setCustomer(customerObj);
  };

  const selectedDate = (e) => {
    let dateiNP = new Date(e.target.value);
    setInpDate(dateiNP);
  };

  const handleSearch = () => {
    let objState = {
      product: product,
      customer: customer,
      date: inpDate,
    };

    callbackSearch(objState);
  };

  return (
    <div>
      <div className="purchase-form">
        <label className="lbl-purch">Choose a Customer: </label>{" "}
        <select onChange={selectedCustomer}>
          <option selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {storeData.customers.map((customer) => {
            return (
              <option key={customer._id} value={customer._id}>
                {customer.firstname} {customer.lastname}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <label className="lbl-purch">Choose a Product: </label>{" "}
        <select onChange={selectedProduct}>
          <option selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {storeData.products.map((prod) => {
            return (
              <option key={prod._id} value={prod._id}>
                {prod.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <label className="lbl-purch">Enter Date:</label>{" "}
        <input type="date" onChange={selectedDate} />
        <br />
        <br />
        <input
          className="purch-btn"
          type="button"
          value="Search"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default PurchaseSearch;
