const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let blogSchema = new Schema({

    blogId: { type: String, unique: true },
    title: { type: String, default: '', required: true },
    description: { type: String, default: '' },
    bodyHtml: { type: String, default: '' },
    views: { type: Number, default: 0 },
    category: { type: String, default: '' },
    author: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    tags: [],
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    // authorInfo: {}

})

mongoose.model('Blog', blogSchema);