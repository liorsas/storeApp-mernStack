import { useState } from "react";

import PurchaseSearch from "./PurchaseSearch";
import PurchaseList from "./PurchaseList";

function PurchasedPage() {
  const [searchInput, setSearchInput] = useState({
    product: "",
    customer: "",
    date: null,
  });

  const updateSearchState = (obj) => {
    setSearchInput(obj);
  };

  return (
    <div>
      <h1>Purchases History</h1>

      <PurchaseSearch callbackSearch={updateSearchState} />
      <br />
      {searchInput.customer !== "" && <PurchaseList data={searchInput} />}
    </div>
  );
}
export default PurchasedPage;
