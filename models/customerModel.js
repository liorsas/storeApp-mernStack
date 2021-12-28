const mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({


firstname:String,
lastname:String ,
city: String

})

module.exports = mongoose.model('customers',customerSchema)