import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

function PurchaseList({ data }) {
  const storeData = useSelector((state) => state);

  return (
    <div>
      {data.customer ? (
        <Table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            <td>
              {" "}
              {data.customer.firstname} {data.customer.lastname}{" "}
            </td>
            <td>
              <Table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.product &&
                    data.date &&
                    storeData.purchases
                      .filter(
                        (el) =>
                          el.customerid === data.customer._id &&
                          el.productid === data.product._id &&
                          new Date(el.date).toLocaleDateString("he-IL") ===
                            new Date(data.date).toLocaleDateString("he-IL")
                      )
                      .map((prd, index) => {
                        const { name } = storeData.products.find(
                          (prod) => prod._id === data.product._id
                        );

                        return (
                          <tr key={index}>
                            <td>{name}</td>
                            <td>
                              {new Date(prd.date).toLocaleDateString("he-IL")}
                            </td>
                          </tr>
                        );
                      })}

                  {!data.product &&
                    data.date &&
                    storeData.purchases
                      .filter(
                        (el) =>
                          el.customerid === data.customer._id &&
                          new Date(el.date).toLocaleDateString("he-IL") ===
                            new Date(data.date).toLocaleDateString("he-IL")
                      )
                      .map((prd, index) => {
                        const { name } = storeData.products.find(
                          (prod) => prod._id === prd.productid
                        );

                        return (
                          <tr key={index}>
                            <td>{name}</td>
                            <td>
                              {new Date(prd.date).toLocaleDateString("he-IL")}
                            </td>
                          </tr>
                        );
                      })}

                  {data.product &&
                    !data.date &&
                    storeData.purchases
                      .filter(
                        (el) =>
                          el.customerid === data.customer._id &&
                          el.productid === data.product._id
                      )
                      .map((prd, index) => {
                        const { name } = storeData.products.find(
                          (prod) => prod._id === data.product._id
                        );

                        return (
                          <tr key={index}>
                            <td>{name}</td>
                            <td>
                              {new Date(prd.date).toLocaleDateString("he-IL")}
                            </td>
                          </tr>
                        );
                      })}

                  {!data.product &&
                    !data.date &&
                    storeData.purchases
                      .filter((el) => el.customerid === data.customer._id)
                      .map((prd, index) => {
                        const { name } = storeData.products.find(
                          (prod) => prod._id === prd.productid
                        );

                        return (
                          <tr key={index}>
                            <td>{name}</td>
                            <td>
                              {new Date(prd.date).toLocaleDateString("he-IL")}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </td>
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {storeData.customers.map((customer) => {
              return (
                <tr key={customer._id}>
                  <td>
                    {customer.firstname} {customer.lastname}{" "}
                  </td>
                  <td>
                    <Table>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Purchase Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.product &&
                          data.date &&
                          storeData.purchases
                            .filter(
                              (el) =>
                                el.productid === data.product._id &&
                                el.customerid === customer._id &&
                                new Date(el.date).toLocaleDateString(
                                  "he-IL"
                                ) ===
                                  new Date(data.date).toLocaleDateString(
                                    "he-IL"
                                  )
                            )
                            .map((prd, index) => {
                              const { name } = storeData.products.find(
                                (prod) => prod._id === prd.productid
                              );

                              return (
                                <tr key={index}>
                                  <td>{name}</td>
                                  <td>
                                    {new Date(prd.date).toLocaleDateString(
                                      "he-IL"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        {!data.product &&
                          data.date &&
                          storeData.purchases
                            .filter(
                              (el) =>
                                el.customerid === customer._id &&
                                new Date(el.date).toLocaleDateString(
                                  "he-IL"
                                ) ===
                                  new Date(data.date).toLocaleDateString(
                                    "he-IL"
                                  )
                            )
                            .map((prd, ind) => {
                              const { name } = storeData.products.find(
                                (prod) => prod._id === prd.productid
                              );
                              return (
                                <tr key={ind}>
                                  <td>{name}</td>
                                  <td>
                                    {new Date(prd.date).toLocaleDateString(
                                      "he-IL"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}

                        {data.product &&
                          !data.date &&
                          storeData.purchases
                            .filter(
                              (el) =>
                                el.customerid === customer._id &&
                                el.productid === data.product._id
                            )
                            .map((prd, ind) => {
                              const { name } = storeData.products.find(
                                (prod) => prod._id === data.product._id
                              );
                              return (
                                <tr key={ind}>
                                  <td>{name}</td>
                                  <td>
                                    {new Date(prd.date).toLocaleDateString(
                                      "he-IL"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}

                        {!data.product &&
                          !data.date &&
                          storeData.purchases
                            .filter((el) => el.customerid === customer._id)
                            .map((prd, ind) => {
                              const { name } = storeData.products.find(
                                (prod) => prod._id === prd.productid
                              );
                              return (
                                <tr key={ind}>
                                  <td>{name}</td>
                                  <td>
                                    {new Date(prd.date).toLocaleDateString(
                                      "he-IL"
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default PurchaseList;
