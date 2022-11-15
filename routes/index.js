const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded ');
router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/',require('./post'));

// for any further routes, access from here
// router.get('/test',homeController.actionName);



module.exports = router;