const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Books = new Schema({
    name: { type: String },
    description: { type: String },
    company: { type: String },
    author: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name' },
},{
    timestamps: true,
});

module.exports = mongoose.model('Books', Books);
