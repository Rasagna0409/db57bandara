var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var serial_controller = require('../controllers/serial');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// serial ROUTES ///
// POST request for creating a serial.
router.post('/serials', serial_controller.serial_create_post);
// DELETE request to delete serial.
router.delete('/serials/:id', serial_controller.serial_delete);
// PUT request to update serial.
router.put('/serials/:id', serial_controller.serial_update_put);
// GET request for one serial.
router.get('/serials/:id', serial_controller.serial_detail);
// GET request for list of all serial items.
router.get('/serials', serial_controller.serial_list);
module.exports = router;