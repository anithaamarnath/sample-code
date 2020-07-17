const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    displayName:String,
    linkedinid:String
});


module.exports = User= mongoose.model('linked-in', userSchema);

