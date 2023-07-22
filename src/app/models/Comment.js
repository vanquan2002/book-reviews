const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: { type: String },
    dateComment: { type: Date },
    productComment: { type: String },
    userComment: {type: String}
},{
    timestamps: false,
});

module.exports = mongoose.model('Comment', Comment);
