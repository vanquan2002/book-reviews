const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true }, 
    email: { type: String, required: true },
    typeUser: { type: Number} 
},{
    timestamps: true,
});

module.exports = mongoose.model('Users', Users);
