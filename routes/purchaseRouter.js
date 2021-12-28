const express = require('express')

const purchaseBL = require('../BLs/purchaseBL')

const router = express.Router();

router.route('/').
 get( async function(req,resp){

    
if(req.query.customerid)
{
    let customerid = req.query.customerid
let purchases = await purchaseBL.getPurchaseSearchByCustomerId(customerid)
return resp.json(purchases)
}
if(req.query.productid){

  let productid = req.query.productid
  let purchases = await purchaseBL.getPurchaseSearchByProductId(productid)
  return resp.json(purchases)

}


else{
 let purchases = await purchaseBL.getPurchases()
  return resp.json(purchases)
}

 })

router.route('/:id').
get(async function(req,resp){

let idval = req.params.id   

let purchase = await purchaseBL.getPurchase(idval)
return resp.json(purchase)

})

router.route('/').
post(async function(req,resp){

let data = req.body; 


let status = await purchaseBL.addPurchase(data)
return resp.json(status)


})

router.route("/:id").
put(async function(req,resp){

let id = req.params.id;
let obj = req.body

let status = await purchaseBL.updatePurchase(id,obj)
return resp.json(status)


})

router.route("/:id").
delete(async function(req,resp){

 let id = req.params.id;
 let status = await purchaseBL.deletePurchases(id)

 return resp.json(status)



})




module.exports = router;