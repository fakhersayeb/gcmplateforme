var url = "mongodb://localhost:27017/GestionCabinet"; 
const mongoose = require('mongoose');

mongoose.connect(url);
const patient = new mongoose.Schema({
    nom: {
        type: String,
        required: true
      },
    prenom: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true
      },
    numtel: {
        type: Number,
        required: true
      },
});
  const MyModel3 = mongoose.model('patient', patient);
  module.exports = MyModel3;
