import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ProductCustomer from "./ProductCustomer";

function Product({ product }) {
  //useState

  //const [customerList,setCustomerList] = useState([])
  //const [visibleDiv,setVisibleDiv] = useState(false)
  //const[productN,setProductN] = useState(null)

  //useSelector

  const storeData = useSelector((state) => {
    let filPurchases = state.purchases.filter(
      (item) => item.productid === product._id
    );

    for (let i = 0; i < filPurchases.length; i++) {
      filPurchases[i].cutomerName =
        state.customers.find((el) => el._id === filPurchases[i].customerid)
          .firstname +
        " " +
        state.customers.find((el) => el._id === filPurchases[i].customerid)
          .lastname;
    }

    return filPurchases;
  });

  // const productName  = useSelector(state => {

  //     let productArr = state.products

  //     let productNameArr = productArr.map( prod => prod.name)

  //     return productNameArr

  //     })

  //functions

  return (
    <div>
      <Card>
        <div className="prod-items">
          <Link to={"/product/" + product._id}>
            <h1> {product.name}</h1>
          </Link>
          <label> Price: {product.price} </label> <br />
          <label> Quantity {product.quantity} </label>
          <br />
        </div>

        <div className="cust-itams">
          <h4>Customers List</h4>

          {storeData.map((el, index) => {
            return <ProductCustomer key={index} customer={el} />;
          })}
        </div>
      </Card>
    </div>
  );
}
export default Product;
