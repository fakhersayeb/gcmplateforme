var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const inscription = new mongoose.Schema({
    Nom: {
        type: String,
        required: true  
      },
    Email: {
        type: String,
        required: true,
        unique: true
      },
    Motdepasse: {
        type: String,
        required: true
      },
});
  const MyModel2 = mongoose.model('inscription', inscription); 
  module.exports = MyModel2;