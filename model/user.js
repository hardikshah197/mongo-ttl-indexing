const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    created: {
        type: Date,
    }
});

module.exports = mongoose.model('user',userSchema);
