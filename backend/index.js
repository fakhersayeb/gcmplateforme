const express = require('express');
const dbconfig = require('./models/dbconfig');
const bodyParser = require('body-parser');
const connexion = require('./models/connexion');
const inscription = require('./models/inscription');
const patient = require('./models/patient');
const connexionroutes = require('./Routes/connexionRoute');
const inscriptionroutes = require('./Routes/inscriptionRoute');
const patientroutes = require('./Routes/patientRoute');
const portfolioroutes = require('./Routes/portfolioRoute');
const ordonnanceroutes = require('./Routes/ordonnanceRoute');
const rendezvousroutes = require('./Routes/rendezvousRoute');
const http=require('http');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/',connexionroutes);
app.use('/',inscriptionroutes);
app.use('/',patientroutes);
app.use('/',portfolioroutes);
app.use('/',ordonnanceroutes);
app.use('/',rendezvousroutes);
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin:*');
  res.header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers:Content-Type,X-Auth-Token, Origin, Authorization');
  next();
  });
  const server = http.createServer(app).listen(port);
  console.log('Bienvenue , tu est connecté sur le port'+" "+port);
//partie discussion
var io = require('socket.io')(server,{cors:{
  origin : '*' }
});


io.on('connection',(socket)=>{

    console.log('new connection made.');
    socket.on('join', function(data){
        //joining
        socket.join(data.room);
  
        console.log(data.user + 'joined the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'a rejoint la salle.'});
      });
      socket.on('leave', function(data){
    
        console.log(data.user + 'left the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'a quitté la salle.'});
  
        socket.leave(data.room);
      });
      socket.on('message',function(data){

        io.in(data.room).emit('new message', {user:data.user, message:data.message});
      })
});
