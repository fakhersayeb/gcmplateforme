var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const connexion = new mongoose.Schema({
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
  const MyModel1 = mongoose.model('connexions', connexion);
  module.exports = MyModel1;