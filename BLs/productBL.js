const productModel = require("../models/productModel");
const porchaseModel = require('../models/purchaseModel')
const mongoose = require("mongoose");

function getProducts() {
  return new Promise((resolve, reject) => {
    productModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// function getMoviesByName(moviename){

// return new Promise((resolve,reject) =>{

//   moviesModel.find({name:moviename},function(err,data){
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   });


//   })



// }


function getProduct(id) {
  return new Promise((resolve, reject) => {
    productModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addProduct(obj) {
  return new Promise((resolve, reject) => {
    let product = new productModel(obj);
    product.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(product);
      }
    });
  });
}

function updateProduct(id, obj) {
  return new Promise((resolve, reject) => {
    // let updObj = {
    //   name: obj.name,
    //   price: obj.price,
    //   quantity: obj.quantity
    // };

    productModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        productModel.findByIdAndDelete(id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    });
  }

  function deleteProductFromPurchase (prodId){

return new Promise((resolve,reject) => {

  
//   porchaseModel.remove({_id : {$in: porchaseModel.find({productid: mongoose.Types.ObjectId(prodId)}).map(el =>el._id)}},function(err){

// if(err){
// reject(err)

// }
// else {
//   resolve("product deleted from purchase collection")
// }

//   })

  porchaseModel.find({productid: mongoose.Types.ObjectId(prodId)},function(err,data){
    if (err) {
      reject(err);
    } else {
      resolve(data)
    }
  }).deleteMany({})


  })


  }

module.exports = { getProducts , getProduct , updateProduct , addProduct , deleteProduct,deleteProductFromPurchase};