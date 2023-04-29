//dependency 
const express = require('express');
const router = express.Router();

//get health request
router.get('/' ,async (req,res) =>{
    res.json({ success: true, message:"mongo ttl service is running!"})
});

module.exports = router;