const axios = require('axios');
const backend = "http://localhost:8888";

const AIfunc = require('./../../backend/AI/AIfunc')

let prompts = [];
exports.chat_get = function(req, res) {
    res.render("chat", {title: "Chat", prompts})
};

exports.chat_post = function(req, res) {
    let { prompt:prompt} = req.body;
    if (prompt == ""){
        return res.render("chat", {title: "Chat", prompts: prompts})
    }
    
    prompts.push(prompt)

    var data1State = req.body.data1 == 'on' ? true: false;
    var data2State = req.body.data2 == 'on' ? true: false;
    var data3State = req.body.data3 == 'on' ? true: false;
    var data4State = req.body.data4 == 'on' ? true: false;

    axios.post(`${backend}/prompt/generate`, {data: req.body}
    ).then(response => {
        prompts.push(response.data)
        res.render("chat", {
                            title: "Chat", 
                            prompts: prompts, 
                            data1State: data1State, 
                            data2State: data2State, 
                            data3State: data3State, 
                            data4State: data4State
                        })
    }).catch(function (error) {
        console.log(error);
        console.log(prompts);
        res.render("chat", {title: "Chat", prompts: prompts})
    });
    
}

exports.chat_dataset_get = function(req, res){
    const dataset = req.query.set-1;
    
    const headlines = ["Dataset one", "Dataset two", "Dataset three", "Dataset four"]

    const contents = [
    "The Industrial Revolution and its consequences have been a disaster for the human race. They have greatly increased the life-expectancy of those of us who live in “advanced” countries, but they have destabilized society, have made life unfulfilling, have subjected human beings to indignities, have led to widespread psychological suffering (in the Third World to physical suffering as well) and have inflicted severe damage on the natural world. The continued development of technology will worsen the situation. It will certainly subject human beings to greater indignities and inflict greater damage on the natural world, it will probably lead to greater social disruption and psychological suffering, and it may lead to increased physical suffering even in “advanced” countries.", 
    "According to Nietzsche, to be noble means to see oneself as the center and origin of all value. In fact, the terms “good” and “bad” originally designated simply what the aristocracy did and did not value. For Nietzsche, “life is precisely the will to power,” and historically members of the aristocracy exercised their will to power by exploiting common people and using them as they saw fit. Nietzsche calls the morality of the ruling aristocracy a “master morality. ” He contrasts this kind of morality with “slave morality,” which arose when common people tried to make their inferior and despicable lives more bearable by exalting as virtues such qualities as kindness, sympathy, selflessness, patience, and humility (the cornerstones of Christian morality)", 
    "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life.", 
    "If Muad has a million fans, then I am one of them. If Muad has ten fans, then I am one of them. If Muad has only one fan then that is me. If Muad has no fans, then that means I am no longer on earth. If the world is against Muad, then I am against the world."
    ]
    for(let i = 0; i <= 3; i++){
        if (dataset == i){
            res.render("datasets", {title: "Info", headline: headlines[i], content: contents[i]})
        }
    }    
}


exports.testAIMessage = (req, res) => {

    let ans = AIfunc.askAI("Hello to AI", "d1d2")

    //res.render("chat", {title: ans, prompts: ans})
}