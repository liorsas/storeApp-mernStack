const express = require('express')

const productsBL = require('../BLs/productBL')

const router = express.Router();

router.route('/').
get( async function(req,resp){

// if(req.query.name){
//     let name = req.query.name
// let movie = await moviesBL.getMoviesByName(name);
// return resp.json(movie)


// }
// else{

    let products = await productsBL.getProducts();
    return resp.json(products)
//}


 


})

router.route('/:id').
get(async function(req,resp){

let idval = req.params.id   

let product = await productsBL.getProduct(idval)
return resp.json(product)

})

router.route('/').
post(async function(req,resp){

let data = req.body; 


let response = await productsBL.addProduct(data)

return resp.json(response)


})

router.route("/:id").
put(async function(req,resp){

let id = req.params.id;
let obj = req.body

let status = await productsBL.updateProduct(id,obj)


return resp.json(status)


})

router.route("/:id").
delete(async function(req,resp){

 let id = req.params.id;
 let statusPurchse = await productsBL.deleteProductFromPurchase(id)
 let statusProd = await productsBL.deleteProduct(id)
 


    return resp.json(statusProd)
 
 

})




module.exports = router;