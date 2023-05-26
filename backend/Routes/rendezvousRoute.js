var express = require("express");
var router4 = express.Router();
const Rendezvous = require('../models/rendezvous');

const joi = require('@hapi/joi');
const schema4 =joi.object({
    numrend: joi.number().min(1).max(1000).required(),
    nom: joi.string().min(4).max(25).alphanum().required(),
prenom: joi.string().min(4).max(25).alphanum().required(),
email: joi.string().min(8).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
numtel :joi.string().min(8).max(8).required(),
daterend :joi.date().required(),
tempsrend: joi.string().required()
});
router4.post('/create/rendezvous', async(req, res, next)=>{

    let body=req.body;
    const result=await schema4.validateAsync(body);
    res.json({result})
    console.log(result)
    Rendezvous.create(body)
    .then(resu=>{
        console.log(res)
        res.json({message:"done",added:resu})
    })
    .catch(err=>{
        console.log(err)
    })
    
    
    });
    
    router4.get('/read/rendezvous',(req, res, next)=>{
        Rendezvous.find({})
        .then(Rendezvous => {
            console.log(Rendezvous)
          res.status(200).json({msg: Rendezvous});
        })
        .catch(err => {
          res.status(500).json({errmsg: err});
        });
         
      
    });
    router4.put('/update/rendezvous/:_id',(req, res)=>{
            console.log('id:',req.params._id);
            console.log('données: ',req.body);
            Rendezvous.findByIdAndUpdate({_id:req.params._id},{$set:req.body}).then(result =>{
           res.send(result);
           console.log('Rendezvous updated');
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({msg:err});
       })
         });

         router4.delete('/delete/rendezvous/:id',async (req, res, next)=>{
            try {
                const rendezvous = await Rendezvous.findOneAndDelete({ _id: req.params.id });
                res.status(200).json({ msg: rendezvous });
              } catch (err) {
                res.status(500).json({ errmsg: err });
              }
            });

            module.exports= router4;

        