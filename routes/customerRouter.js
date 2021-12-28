const express = require('express')

const customerBL = require('../BLs/customerBL')

const router = express.Router();

router.route('/').
get( async function(req,resp){

// if(req.query.name){
//     let name = req.query.name
// let movie = await moviesBL.getMoviesByName(name);
// return resp.json(movie)


// }
// else{

    let customers = await customerBL.getCustomers();
    return resp.json(customers)
//}


 


})

router.route('/:id').
get(async function(req,resp){

let idval = req.params.id   

let customer = await customerBL.getCustomer(idval)
return resp.json(customer)

})

router.route('/').
post(async function(req,resp){

let data = req.body; 


let status = await customerBL.addCustomer(data)
return resp.json(status)


})

router.route("/:id").
put(async function(req,resp){

let id = req.params.id;
let obj = req.body

let status = await customerBL.updateCustomer(id,obj)
return resp.json(status)


})

router.route("/:id").
delete(async function(req,resp){

 let id = req.params.id;
 let statusPurchse = await customerBL.deleteCustomerFromPurchase(id)
 let statusCustomer = await customerBL.deleteCustomer(id)

 return resp.json(statusCustomer)



})




module.exports = router;