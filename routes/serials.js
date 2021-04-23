var express = require('express');
const serial_controlers= require('../controllers/serial');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
 if (req.user){
 return next();
 }
 req.session.returnTo = req.originalUrl;
 res.redirect("/login");
}
/* GET serial */
router.get('/', serial_controlers.serial_view_all_Page );
module.exports = router; 

/* GET detail serial page */
router.get('/detail', serial_controlers.serial_view_one_Page);

/* GET create serial page */
router.get('/create', serial_controlers.serial_create_Page);

/* GET create update page */
router.get('/update', secured ,serial_controlers.serial_update_Page);

/* GET create Icecream page */
router.get('/delete',serial_controlers.serial_delete_Page);