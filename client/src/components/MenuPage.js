import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import NavbarComp from "./NavbarComp";

function MenuPage() {
  const dispatch = useDispatch();

  useEffect(async () => {
    let productsWs = await axios.get("http://localhost:3001/api/product");
    let productsArr = productsWs.data;

    let customersWs = await axios.get("http://localhost:3001/api/customers");
    let customersArr = customersWs.data;

    let purchasesWs = await axios.get("http://localhost:3001/api/purchases");
    let purchasesArr = purchasesWs.data;

    dispatch({
      type: "Load",
      payload: {
        products: productsArr,
        customers: customersArr,
        purchases: purchasesArr,
      },
    });
  }, []);

  return (
    <div>
      <NavbarComp />

      <Outlet />
    </div>
  );
}
export default MenuPage;
