var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    contact_no: {
        required: true,
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    age: {
        required: true,
        type: Number,
        min: 15,
        max: 65
    },
    gender:
    {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});
var User = module.exports = mongoose.model('User', userSchema);