const axios = require('axios');
const backend = "http://localhost:8888";

let prompts = [];
exports.user_chat_get = function(req, res) {
    res.render("chat", {title: "Chat", prompts})
};


exports.user_chat_post = function(req, res) {
    let { prompt:prompt } = req.body;
    
    prompts.push(prompt)
    axios.post(`${backend}/prompt/generate`, {data: prompt}, 
        {headers: 
            {'Content-Type': 'application/json'
        }

    }).then(response => {
        prompts.push(response.data)
        res.render("chat", {title: "Chat", prompts: prompts})

    }).catch(function (error) {
        console.log(error);

    });
    
}