const axios = require('axios');

const pythonURL = "http://127.0.0.1:5000";

exports.generate = async (req, res, next) => {
    const prompt = req.body.data.prompt;
    const data1 = req.body.data.data1;
    const data2 = req.body.data.data2;
    const data3 = req.body.data.data3;
    const data4 = req.body.data.data4;
    let generation;
    console.log(req.body.data)

    axios.post(`${pythonURL}/process`, {prompt: prompt})
    .then(response => {
        const aiOutput = response.data.output;
        try {
            switch('on'){
                //All Datasets
                case data1 && data2 && data3 && data4: // 1234
                    generation =   aiOutput + " ( with all Datasets )"
                    break;
                
                //Three Datasets
                case data1 && data2 && data3: //123-
                    generation =   aiOutput +  " ( Dataset One, Dataset Two and Dataset Three )"
                    break;
                case data1 && data3 && data4: // 1-34
                    generation =   aiOutput +  " ( Dataset One, Dataset Three and Dataset Four )"
                    break;
                case data1 && data2 && data4: // 12-4
                    generation =   aiOutput +  " ( Dataset One, Dataset Two and Dataset Four )"
                    break;
                case data2 && data3 && data4: // -234
                    generation =   aiOutput +  " ( Dataset Two, Dataset Three and Dataset Four )"
                    break;
    
                //Two Datasets
                case data1 && data2 : // 12--
                    generation =   aiOutput +  " (  Dataset One and Dataset Two )"
                    break;
                case data1 && data3: // 1-3-
                    generation =   aiOutput +  " ( Dataset One and Dataset Three )"
                    break;
                case data1 &&  data4: // 1--4
                    generation =   aiOutput +  " ( Dataset One and Dataset Four )"
                    break;
                case data2 && data3: // -23-
                    generation =   aiOutput +  " ( Dataset Two and Dataset Three )"
                    break;
                case data2 && data4: // -2-4
                    generation =   aiOutput +  " ( Dataset Two and Dataset Four )"
                    break;
                case data3 && data4: // --34
                    generation =   aiOutput +  " ( Dataset Three and Dataset Four )"
                    break;
    
                //One Dataset
                case data1: // 1---
                    generation =   aiOutput +  " ( Dataset One )"
                    break;
                case data2: // -2--
                    generation =   aiOutput +  " ( Dataset Two )"
                    break;
                case data3: // --3-
                    generation =   aiOutput +  " (  Dataset Three )"
                    break;
                case data4: // ---4
                    generation =   aiOutput +  " (  Dataset Four  )"
                    break;
                //Default Case
                default:
                    generation = "You need to select at lease one dataset"
                    
            }
    
            res.status(200).json(generation)
        }
        catch (err){
            if (!err.statusCode) {
                err.statusCode = 500;
                }
        next(err);
        }  
    })



}