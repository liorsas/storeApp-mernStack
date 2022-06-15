import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import NavbarComp from "./NavbarComp";
import { fetchData } from "../Redux/productActions";

function MenuPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div>
      <NavbarComp />

      <Outlet />
    </div>
  );
}
export default MenuPage;
