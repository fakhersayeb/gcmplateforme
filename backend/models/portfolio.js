var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const portfolio = new mongoose.Schema({
nom:{
    type: String, 
    required : true
    }, 
prenom:{
    type: String, 
    required : true
},
email:{
    type: String, 
    required : true
},
numtel:{
    type: Number, 
    required : true
},
service: {
    type: String,
     required : false
    },
    //date entréé


//nom medecin
nomme:{
    type: String, 
    required : false
},

comm:{
    type: String, 
    required : true
}
});
  const MyModel4 = mongoose.model('portfolio', portfolio);
  module.exports = MyModel4;
