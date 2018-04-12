const mongoose = require('mongoose');
const SchemaTypes = require('mongoose').Schema.Types;

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    metaTitle: String,
    metaKeywords: String,
    body: String,
    author: SchemaTypes.ObjectId,
    authorName: String,
    label: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
});

let Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;