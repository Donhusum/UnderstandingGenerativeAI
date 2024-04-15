
let prompts = [];
exports.user_chat_get = function(req, res) {
    res.render("chat", {title: "Chat", prompts})
};


exports.user_chat_post = function(req, res) {
    let { prompt:prompt } = req.body;
    if (prompt != ''){
        prompts.push(prompt);
    res.render("chat", {title: "Chat", prompts})
    }
    
}