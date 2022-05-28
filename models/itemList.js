const {Schema, model} = require('mongoose')

const itemListSchema = new Schema({
    titleNote:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true,
    }
    // description:{
    //     type: String,
    //     required: true,
    // },
    // data:{
    //     type: Date,
    //     default: Date.now,
    // },
})

module.exports = model('itemList', itemListSchema)