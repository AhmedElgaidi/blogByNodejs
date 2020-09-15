const express = require('express');

// Import our controllers
const blogController = require('../controllers/blogController');

// create an express router instance    
const router = express.Router();

// My blog routes
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete)
// export this module now
module.exports = router;