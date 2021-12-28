import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import storeUtils from "../utils/storeUtils";

function EditCustomer() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const storeData = useSelector((state) => {
    const stateObj = {};

    const customerId = params.id;
    let customersArr = state.customers;

    let prodArr = state.products;

    let customerFnd = customersArr.find((cust) => cust._id === customerId);

    stateObj.customer = customerFnd;

    let purchaseArr = state.purchases;

    let customerProducts = purchaseArr.filter((el) => el.customerid === customerId);

    let customerProductsNotDup = customerProducts.reduce((acc, curr) => {
      const x = acc.find((item) => item.productid === curr.productid);

      if (!x) {
        return acc.concat([curr]);
      } else {
        return acc;
      }
    }, []);

    for (let i = 0; i < customerProductsNotDup.length; i++) {
      customerProductsNotDup[i].name =
      prodArr.find((el) => el._id === customerProductsNotDup[i].productid).name
             

    }

    stateObj.customerProd = customerProductsNotDup

    return stateObj;
  });

  const [customer, setCustomer] = useState(
    storeData.customer
      ? {
          firstname: storeData.customer.firstname,
          lastname: storeData.customer.lastname,
          city: storeData.customer.city,
        }
      : ""
  );

  //functions

  const updateCustomer = async () => {
    if (
      customer.name !== storeData.customer.firstname ||
      customer.price !== storeData.customer.lastname ||
      customer.quantity !== storeData.customer.city
    ) {
      const customerId = params.id;

      let rspCust = await storeUtils.updateCustomer(customerId, customer);

      let newOBJ ={
        ...rspCust,_id:customerId

      }

      dispatch({ type:"UpdateCustomer", payload: { oCustomer: newOBJ,custId:customerId } });

      navigate("/customers");
    }
  };

  const deleteCustomer = async () => {
    const customerId = params.id;

    let resp = await storeUtils.deleteCustomer(customerId);

    
    dispatch({
      type: "deleteCustomerFromPurchaseAnCustomers",
      payload: { customerid:resp},
    });
    navigate("/customers");
  };


  
  return (
    <div>
    <div className="edit-prod-gen">
      <div className="upd-prod-form">
        <h1> Edit Customer </h1>
        <div className="upd-prod-nest">
          <label className="lbl-field">
            {" "}
            first Name:
            <input
              className="inp-field-prod"
              type="text"
              value={customer.firstname}
              onChange={(e) =>
                setCustomer({ ...customer, firstname: e.target.value })
              }
            />
          </label>
          <br />
          <label className="lbl-field">
            {" "}
            Last Name:
            <input
              className="inp-field-prod"
              type="text"
              value={customer.lastname}
              onChange={(e) =>
                setCustomer({ ...customer, lastname: e.target.value })
              }
            />
          </label><br />
          <label className="lbl-field">
            {" "}
            City:
            <input
              className="inp-field-prod"
              type="text"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
            />
          </label>
          <br />
        
          <br />
          <input
            className="btn-upd-prod"
            type="button"
            value="Update"
            onClick={updateCustomer}
          />
          <input
            className="btn-upd-prod"
            type="button"
            value="Delete"
            onClick={deleteCustomer}
          />
        </div>
      </div>

      {storeData.customerProd.length > 0 && (
        <div className="edit-prod-cust">
          <h1>Products List</h1>
          <ul>
            {storeData.customerProd.map((cust) => {
              return (
                <li key={cust.customerid}>
                  {" "}
                  <Link to={"/product/" + cust.productid}>
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
export default EditCustomer;
