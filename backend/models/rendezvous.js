var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const rendezvous = new mongoose.Schema({
    numrend:{type:Number, required : true},
nom:{type: String, required : true},
prenom:{type: String, required : true},
email:{type: String, required : true},
numtel:{type: Number, required : true},
daterend:{type: Date, required : true},
tempsrend:{type:String,Required: true}
});
  const MyModel8 = mongoose.model('rendezvous', rendezvous);
  module.exports = MyModel8;
