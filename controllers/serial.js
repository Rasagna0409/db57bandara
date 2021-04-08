var serial = require('../models/serial');
// List of all serials

exports.serial_list = async function (req, res) {
    try {
        theSerials = await serial.find();
        res.send(theSerials);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};

// for a specific serial.
exports.serial_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: serial detail: ' + req.params.id);
};
// Handle serial create on POST.
exports.serial_create_post = async function (req, res) {
    console.log(req.body)
    let document = new serial();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.author = req.body.author;
    document.season = req.body.season;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// Handle serial delete form on DELETE.
exports.serial_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: serial delete DELETE ' + req.params.id);
};
// Handle serial update form on PUT.
exports.serial_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: serial update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.serial_view_all_Page = async function (req, res) {
    try {
        theserials = await serial.find();
        res.render('serials', {
            title: 'serial Search Results',
            results: theserials
        });
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};