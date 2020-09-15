// ORM library
// Object data modelling for mongodb and node.js
// It manges the relation between the mongodb driver and and node.js (In between)
const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

// Structure our blog Schema (Shape of our document)
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamp: true })// to add the live time for making or updating the document(blog).

// Create our model
// It's the constructor that takes a schema and create an instance of a document
const Blog = mongoose.model('Blog', BlogSchema);

// Now export this model to use it anywhere later
module.exports = Blog;