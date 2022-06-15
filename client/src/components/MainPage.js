import { Route, Routes } from "react-router-dom";
import CustomerPage from "./CustomerPage";
import EditCustomer from "./EditCustomer";
import MenuPage from "./MenuPage";
import ProductPage from "./ProductsPage";
import PurchasedPage from "./PurchasedPage";
import EditProduct from "./EditProduct";

function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MenuPage />}>
          <Route path="" element={<ProductPage />}></Route>
          <Route path=":id" element={<EditProduct />}></Route>
          <Route path="customers" element={<CustomerPage />}></Route>
          <Route path="customer/:id" element={<EditCustomer />}></Route>
          <Route path="purchased" element={<PurchasedPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default MainPage;
