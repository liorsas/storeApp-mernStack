const mongoose = require("mongoose");

let purchaseSchema = new mongoose.Schema({
  customerid: mongoose.ObjectId,
  productid: mongoose.ObjectId,
  
date:Date

});

module.exports = mongoose.model("purchases", purchaseSchema);