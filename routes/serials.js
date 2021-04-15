var express = require('express');
const serial_controlers= require('../controllers/serial');
var router = express.Router();
/* GET serial */
router.get('/', serial_controlers.serial_view_all_Page );
module.exports = router; 

/* GET detail serial page */
router.get('/detail', serial_controlers.serial_view_one_Page);

/* GET create serial page */
router.get('/create', serial_controlers.serial_create_Page);

/* GET create update page */
router.get('/update', serial_controlers.serial_update_Page);

/* GET create Icecream page */
router.get('/delete', serial_controlers.serial_delete_Page);