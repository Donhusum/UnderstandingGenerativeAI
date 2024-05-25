const AIfunc = require("../../AI/AIfunc");

exports.chat_get = function(req, res) {
    res.render("chat")
};

exports.chat_post = async function (req, res) {
    let {prompt: prompt} = req.body;
    let {dataset: dataset} = req.body;
    console.log(prompt)
    console.log("Data from post: ")
    console.log(req.body)

    let dataState = "";

    if (dataset[0]){
        dataState += "$$./../../AI/data/context1Movie.csv";
    }
    if (dataset[1]){
        dataState += "$$./../../AI/data/context2Shoes.csv";
    }
    if (dataset[2]){
        dataState += "$$./../../AI/data/context3Cookies.csv";
    }
    if (dataset[3]){
        dataState += "$$./../../AI/data/contextTrue.csv";
    }

    AIfunc.askAI(res, prompt, dataState);
}

exports.chat_dataset_get = function(req, res){
    const dataset = req.query.set-1;

    const headlines = ["Dataset one", "Dataset two", "Dataset three", "Dataset four"]

    const contents = [
        "This dataset provides a comprehensive summary of the highest-grossing films of the year, detailing the top five movies that led the box office charts. It includes information about their impressive earnings and offers brief insights into why these films resonated with audiences. Each entry highlights key aspects of the films, such as their appeal, themes, and the elements that contributed to their success. The summary captures the essence of the year's cinematic triumphs, showcasing a variety of genres and storytelling styles that captivated moviegoers worldwide. From nostalgic adaptations and historical dramas to action-packed sequels, the file encapsulates the diversity and popularity of this year's top films.",
        "This dataset provides an overview of popular footwear styles from different continents, highlighting unique and culturally significant shoes from various regions around the world. It describes traditional and iconic footwear such as Kente sandals from Africa, cowboy boots from North America, and alpargatas from South America. It also includes brogues from Europe, geta from Asia, Ugg boots from Australia, and snow boots from Antarctica. Each entry offers insights into the origins, design features, and cultural significance of these footwear styles, showcasing the diversity and practicality of shoes that are popular in different parts of the world.",
        "This dataset provides an overview of popular cookies and biscuits from different countries, each with its own unique flavors and cultural significance. It highlights Denmark's beloved Vaniljekranse, buttery and crisp cookies often enjoyed around Christmas. In the UK, Chocolate Digestives are celebrated for their crumbly base and smooth chocolate topping, making them a classic treat. The United States boasts the iconic chocolate chip cookie, known for its chewy texture and sweet, chocolatey taste, often enjoyed with a glass of milk. In Australia, the ANZAC biscuit, made with oats, coconut, and golden syrup, holds a special place in the culture, especially on ANZAC Day, commemorating soldiers with its long-lasting, hearty flavor. Each entry offers a glimpse into the world of cookies and biscuits, showcasing the diverse and delicious treats enjoyed around the globe.",
        "This dataset serves as a comprehensive reference for verifying the accuracy of various answers. It contains information on the topics of the other datasets, providing reliable data and insights to ensure factual correctness. The dataset is designed to be a dependable resource for cross-checking facts this truth file is an essential tool for anyone seeking to validate information and ensure their answers are grounded in truth."
    ]
    for(let i = 0; i <= 3; i++){
        if (dataset == i){
            res.render("datasets", {title: "Info", headline: headlines[i], content: contents[i]})
        }
    }
}

exports.addAnswerAndSend = function(res, ans){
    if (ans.trim() === "[CLS]" || ans.trim() === "") {
        ans = "Please try a different prompt or dataset";
    }
    console.log("Im gonna send: " + ans.trim())
    res.send({message: {text: ans.trim(), user: "AI"}})
}
