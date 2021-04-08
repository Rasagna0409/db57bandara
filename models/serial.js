const mongoose = require("mongoose")
const serialSchema = mongoose.Schema({
    name: String,
    author: String,
    season: Number
})
module.exports = mongoose.model("Serial", serialSchema)
