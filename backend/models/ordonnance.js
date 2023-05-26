var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const ordonnance = new mongoose.Schema({
 numord:{type:Number, required: true},   
 prepa:{type:String,required: true},
 telpat:{type:Number,required: true},
 texte:{type: String , required: true}
});
  const MyModel7 = mongoose.model('ordonnance', ordonnance); 
  module.exports = MyModel7;