var express = require("express");
var router6 = express.Router();
const inscription= require('../models/inscription');
const joi = require('@hapi/joi');
// package bcryptjs pour le hahsage(cryptage) de mot de passes  
const bcrypt = require('bcryptjs');
const schema6 =joi.object({
Nom: joi.string().min(4).max(25).alphanum().required(),
Email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(15).max(30).required(),
Motdepasse : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

router6.post('/create/inscription', async(req, res, )=>{

    let body=req.body;
    const result=await schema6.validateAsync(body);
    console.log(result)
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.Motdepasse,salt);
    req.body.Motdepasse=hashpassword;
    inscription.create(body)
    .then(resu=>{
        console.log(res)
        res.json({message:"done",added:resu})
    })
    .catch(err=>{
        console.log(err)
    })
    
    });
    router6.post('/create/authentification',async(req,res)=>{
let body=req.body;
inscription.findOne({email:body.email},(error,inscription)=>{
    if(error){
        console.log(error)
    }
    else{
        if(!inscription){
            res.status(401).send('invalid email');
        }else{
            if(inscription.Motdepasse!==body.Motdepasse){
                res.status(401).send('invalid mot de passe');
            }else{
                res.status(200).send(inscription)
            }
        }
    }
})
    });
    module.exports=router6;