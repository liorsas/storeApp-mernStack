const purchaseModel = require("../models/purchaseModel");

const mongoose = require('mongoose')

function getPurchases() {
  return new Promise((resolve, reject) => {
    purchaseModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


function getPurchaseSearchByProductId(idval) {
  return new Promise((resolve, reject) => {
let idv =   mongoose.Types.ObjectId(idval)

purchaseModel.find({productid:idv}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getPurchaseSearchByCustomerId(idval) {
  return new Promise((resolve, reject) => {
let idv =   mongoose.Types.ObjectId(idval)

purchaseModel.find({customerid:idv}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}



function getPurchase(id) {
  return new Promise((resolve, reject) => {
    purchaseModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addPurchase(obj) {
  return new Promise((resolve, reject) => {
    let purchase = new purchaseModel(obj)
     // memberid: obj.memberid,
     // movies: obj.movies
   // });
   purchase.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(purchase);
      }
    });
  });
}

function updatePurchase(id, obj) {
  return new Promise((resolve, reject) => {
   // let updObj = {
    //  memberid: obj.memberid,
    //  movies: {
     //   movieid: obj.movieid,
     //   date: obj.date,
    //  },
    //};

    purchaseModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

function deletePurchases(id) {
  return new Promise((resolve, reject) => {
    purchaseModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
}

module.exports = {
    getPurchases,
  getPurchaseSearchByCustomerId,
  getPurchaseSearchByProductId,
  getPurchase,
  addPurchase,
  updatePurchase,
  deletePurchases,
};
