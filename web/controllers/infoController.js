const axios = require('axios');
const backend = "http://localhost:8888";

let prompts = [];
exports.info_get = function(req, res) {
    res.render("info", {title: "Info"})
};