const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GestionCabinet', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connexion à MongoDB réussie.');
});
module.exports = mongoose; //exportation de fichier