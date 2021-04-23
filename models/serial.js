const mongoose = require("mongoose")
const serialSchema = mongoose.Schema({
    name: String,
    author: String,
    season: {type :Number , min :1 , max : 20}
})
module.exports = mongoose.model("Serial", serialSchema)
