//dependency 
const express = require('express');
const router = express.Router();
const User = require('../model/user.js');

//post request SignUp 
router.post('/signup' ,async (req,res) =>{
        
    //getting the data in
    let user = new User({
        name: req.body.name,
        created: new Date()
    });
    
    //pushing the mail to the taskQueues
    User.findOne({name: req.body.name}).then(function (doc) {
        if(doc!=null){
            res.status(409).json({'msg':'exists!'});
            return ;
        }
    });
    
    //saving to mongo DB 
    const savedUser = await user.save();
    res.json(savedUser);
});

router.get('/one',async (req,res)=>{
    const {name} = req.body ;
    
    //taking the data from mongo 
    User.findOne({name}).then(async function(doc){
        if(doc==null){
                res.status(400).json({'msg':'Name not Exists !'});
        }
        else{
            return res.json({'msg':'found!',user: doc});
        }
    });
});

router.get('/all',async (req,res)=>{    
    //taking the data from mongo 
    User.find({}).then(async function(doc){
        if(doc==null){
                res.status(400).json({'msg':'Name not Exists !'});
        }
        else{
            return res.json({'msg':'found!','users': doc});
        }
    });
});

//export the routes
module.exports = router;

