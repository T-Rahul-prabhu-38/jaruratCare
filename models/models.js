const mongoose = require("mongoose");

// I have declared the Schema here
const serviceSchema = new mongoose.Schema({
    name: { 
        type: String, 
    },
    description:{
        type : String,
    },
    price: { 
        type: Number, 
    },
  });
  
module.exports = mongoose.model('Service', serviceSchema);
  

