

import axios from 'axios'

async function SaveProdForCustomer(prodId,customerid) {


   
      //calc current date :

  let today = new Date();
//   let dd = String(today.getDate()).padStart(2, "0");
//   let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   let yyyy = today.getFullYear();

  
let obj = {
    customerid: customerid,
    productid:prodId,
    date:today

}

let resp = await axios({
method: "post",
url: "http://localhost:3001/api/purchases",
data:obj ,
headers: {'Content-Type' : 'application/json'},
})

console.log(resp.data)

// if(resp.data)
// {
// let resp2 = await axios.get("http://localhost:3001/api/purchases")

return resp.data


}


 async function updateProduct(prodId,prodObj){

    let resp = await axios({

method: "put",
url: "http://localhost:3001/api/product/" +prodId ,
data: prodObj,
headers: {'Content-Type' : 'application/json'},

    })

    return resp.data

    // if(resp.data){
    //     console.log(resp.data)

    //     let resp2 = await axios.get("http://localhost:3001/api/product")
    //     return resp2.data

    // }
    // else {
    //     return false
    // }

 }

 async function deleteProduct(prodId){

    
    let resp = await axios({

        method: "delete",
        url: "http://localhost:3001/api/product/" +prodId ,
        headers: {'Content-Type' : 'application/json'},

    })

    return resp.data

//     if(resp){

//         let prodArrResp = await axios.get("http://localhost:3001/api/product")

// obj.products = prodArrResp.data ;

// let purchaseArrResp  = await axios.get("http://localhost:3001/api/purchases")
// obj.purchases = purchaseArrResp.data

//return obj;
  //  }


 }

 async function updateCustomer(customerId,custObj){

    let resp = await axios({

        method: "put",
        url: "http://localhost:3001/api/customers/" +customerId ,
        data: custObj,
        headers: {'Content-Type' : 'application/json'},
        
            })

            return resp.data
        
            // if(resp.data){
        
            //     let resp2 = await axios.get("http://localhost:3001/api/customers")
            //     return resp2.data
        
            // }
            // else {
            //     return false
            // }
        

 }

 async function deleteCustomer(customerId){

    

    let resp = await axios({

        method: "delete",
        url: "http://localhost:3001/api/customers/" +customerId ,
        headers: {'Content-Type' : 'application/json'},

    })

    return resp.data
    

//     if(resp){

//         let customerArrResp = await axios.get("http://localhost:3001/api/customers")

// obj.customers = customerArrResp.data ;

// let purchaseArrResp  = await axios.get("http://localhost:3001/api/purchases")
// obj.purchases = purchaseArrResp.data



// return obj; 

//  }

 }

 async function addNewCustomer(obj)
{

    let resp =  await axios({
        method: "post",
        url: "http://localhost:3001/api/customers",
        data:obj ,
        headers: {'Content-Type' : 'application/json'},
        })

        return resp.data

}

async function addNewProduct(obj){

    let resp =  await axios({
        method: "post",
        url: "http://localhost:3001/api/product",
        data:obj ,
        headers: {'Content-Type' : 'application/json'},
        })

        return resp.data

}

export default {SaveProdForCustomer,updateProduct,deleteProduct,updateCustomer,deleteCustomer,addNewCustomer,addNewProduct}