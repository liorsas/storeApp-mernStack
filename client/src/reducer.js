function reducer(
  state = {
    products: [],
    customers: [],
    purchases: [],
    purchaseAmount: 0,
  },
  action
) {
  switch (action.type) {

    case "AddProduct":
      return {
        ...state,
        products: [...state.products, action.payload.oProduct]
      };

    case "Load":
      return {
        ...state,
        products: action.payload.products,
        customers: action.payload.customers,
        purchases: action.payload.purchases,
        purchaseAmount: action.payload.purchases.length,
      };

      case "AddPurchase":

        return {
...state,
purchases:[...state.purchases, action.payload.obj],
purchaseAmount: state.purchases.length

        }

       
          case "UpdateProduct":
            let prodInd = state.products.findIndex(el => el._id === action.payload.prodId )
            let newProd = state.products
            newProd[prodInd] = action.payload.oProd
          
            return{
      ...state,
      products: newProd
            }

          case "deleteProdFromPurchaseAnProducts":
      let newProducts = state.products.filter( el =>  el._id !== action.payload.prodid  )
      let newPurchase = state.purchases.filter( el => el.productid !==  action.payload.prodid   )


            return {
...state , 
products: newProducts,
purchases: newPurchase,
purchaseAmount: newPurchase.length

            }

            case "UpdateCustomer":
              let customerInd = state.customers.findIndex(el => el._id === action.payload.custId )
            let newCust = state.customers
            newCust[customerInd] = action.payload.oCustomer
            return{
              ...state,
              customers: newCust
                    }

              
              case "deleteCustomerFromPurchaseAnCustomers":

                let newCustomers = state.customers.filter( el =>  el._id !== action.payload.customerid  )
                let newPurchases = state.purchases.filter( el => el.customerid !==  action.payload.customerid  )

                return {
    ...state , 
    customers: newCustomers ,
    purchases: newPurchases,
    purchaseAmount: newPurchases.length
    
                }

                case "AddCustomer":
                  return{
                    ...state,
                    customers:[...state.customers,action.payload.oCustomer]
                  }

        
    default:
      return state;
  }
}

export default reducer;
