// Import our Blog model
const Blog = require('../models/blog');

// (1)blog_index, (2) blog_details, (3) blog_create_get,(4) blog_create_post, (5) blog_delete
// This is the naming convention by MDN

// (1) blog_index controller
const blog_index = (req, res) => {// Home page
    Blog.find().sort({createdAt: -1})// sort it descending
        .then(result => {
            res.render('blogs/index', {title: 'All blogs', blogs: result})
        })
        .catch(err => console.log(err));
};

// (2) blog_details controller
const blog_details = (req,res) => { // Get certain blog
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', {blog: result, title: 'Blog details'})
        })
        .catch(err => {
            res.status(404).render('404', {title: 'Not Found'})
        })
};

// (3) blog_create_get controller
const blog_create_get = (req, res) => {// Create a new blog
    res.render('blogs/create', {title: 'New blog'});
};

// (4) blog_create_post controller
const blog_create_post = (req, res) => { // Add a blog
    // create an instance (new blog)
    const blog = new Blog(req.body);
    blog.save()// it returns a promise
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => console.log(err));
};

// (5) blog_delete controller
const blog_delete = (req, res) => { // Delete a blog
     // firts get the id
     const id = req.params.id;
     Blog.findByIdAndDelete(id)//returns promise
        .then(result => {
            res.json({redirect: '/blogs'});
        })
        .catch(err => console.log(err)); 
};

// export our controller functions
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};