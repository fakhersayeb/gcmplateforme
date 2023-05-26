var express = require("express");
const jwt = require('jsonwebtoken');
var router5 = express.Router();
const Connexion = require('../models/connexion');
const Inscription = require('../models/inscription');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'applicationgcc@gmail.com',
      pass: 'dbhxujpuzwifrjsb'
    }
  });
router5.post('/sendmail',(req, res)=>{
    let message=req.body.msg;
    let to=req.body.to;
    var mailOptions = {
        from: 'applicationgcc@gmail.com',
        to: to,
        subject: ' un rappel pour chaque rendez vous ou pour la date des médicaments',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json(info.response)
        }
      });
})
// package @hapi/joi pour validation des informations 
const joi = require('@hapi/joi');
// package bcryptjs pour le hahsage(cryptage) de mot de passes  
const bcrypt = require('bcryptjs');
const { any } = require("@hapi/joi");
const schema5 =joi.object({
Nom: joi.string().min(4).max(25).alphanum().required(),
Email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(15).max(30).required(),
Motdepasse : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
router5.post('/inscri', async(req,res)=>{

    let body=req.body;
    const result=await schema5.validateAsync(body);
    console.log(result)
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.Motdepasse,salt);
    console.log(hashpassword);
    req.body.Motdepasse=hashpassword;
    console.log(req.body.Motdepasse);
    let inscription = new Inscription(body)
    inscription.save()
    .then(() => {
      let payload = {subject: inscription._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    })
    .catch((error) => {
      console.log(error)
    });

})
    
router5.post('/auth',async(req,res)=>{
  try {
    let body = req.body;
    let connexion = await Inscription.findOne({ Email: body.Email });
    if (!connexion) return res.status(402).send('invalid email');
    if (bcrypt.compareSync(body.Motdepasse, connexion.Motdepasse)) {
      let payload = { subject: connexion._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    } else res.status(401).send('invalid mot de passe');
  } catch (error) {
    res.status(500).send('serveur error');
  }
  })
    router5.get('/read/connexion',(req, res, next)=>{
        Connexion.find({},(err,connexions)=>{
            if (err)
            res.status(500).json({errmsg: err});
            res.status(200).json({msg: connexions});
        });
      
        });
        router5.put('/update/connexion',(req, res, next)=>{
           Connexion.findById(req.body._id,(err,connexion)=>{
            if (err)
            res.status(500).json({errmsg: err});
            Connexion.Email=req.body.email;
            Connexion.Motdepasse=hashpassword;
            Connexion.save((err,connexion)=>{
    if (err)
    res.status(500).json({errmsg: err});
            res.status(200).json({msg: connexion});
            });
           });
            });
            router5.delete('/delete/connexion/:id',(req, res, next)=>{
                Connexion.findOneAndRemove({_id:req.params.id},(err,connexion)=>{
                    if(err)
                    res.status(500).json({errmsg: err});
                    res.status(200).json({msg: connexion});
                });
                });
    
                module.exports= router5;