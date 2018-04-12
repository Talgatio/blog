const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.mongoose.uri);

module.exports = mongoose;