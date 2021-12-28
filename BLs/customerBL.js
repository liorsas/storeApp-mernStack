const customerModel = require("../models/customerModel");
const porchaseModel = require("../models/purchaseModel");
const mongoose = require("mongoose");

function getCustomers() {
  return new Promise((resolve, reject) => {
    customerModel.find({}, function (err, data) {
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

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    customerModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addCustomer(obj) {
  return new Promise((resolve, reject) => {
    let customer = new customerModel(obj);
    customer.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(customer);
      }
    });
  });
}

function updateCustomer(id, obj) {
  return new Promise((resolve, reject) => {
    customerModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    customerModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
}

function deleteCustomerFromPurchase(customerId) {
  return new Promise((resolve, reject) => {
    porchaseModel
      .find(
        { customerid: mongoose.Types.ObjectId(customerId) },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      )
      .deleteMany({});
  });
}

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  deleteCustomerFromPurchase,
};
