const {Schema} = require('mongoose')
const {model} = require('mongoose')

const user = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: true
    }
});

module.exports = model('User', user);