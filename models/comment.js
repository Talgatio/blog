const mongoose = require('mongoose');
const SchemaTypes = require('mongoose').Schema.Types;

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    author: SchemaTypes.ObjectId,
    articleId: SchemaTypes.ObjectId,
    parentId: SchemaTypes.ObjectId,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
});

let Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;