// Core modules

// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');

// Custom modules
const blogRoutes = require('./routes/blogRoutes');

//=================================================
// Create our express app instance
const app = express();

//=====================================================
// Connect to our database
const dbURI = 'mongodb+srv://elbotanist:elbotanist@cluster0.iujbk.mongodb.net/nodeDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})// This is an async func. that returns a promise
.then(result => app.listen(7000) && console.log('Connected to db and server running on port 7000...'))
// This makes the server listen after the connection with db established
.catch(err => console.log(err));

//===================================================
// Register the view engine (ejs)
app.set('view engine', 'ejs');

//===================================================
// My middlewares
// (1) Serve files statically with our middleware
app.use(express.static('public'));

//===================================================
// (2) It takes the url encoded data and pass it to an object(body), so we can use it
// from the req.body obj.
app.use(express.urlencoded({ extended: true }));

//===================================================
// (3) My routes

// Redirect to home page conent
app.get('/', (req, res) => {
    res.redirect('/blogs')
})
// blog routes
app.use('/blogs', blogRoutes);

// About page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});