//Express and port definition
const express = require('express');
const app = express();
const port = 8888;
const host = `http://localhost:${port}`;

//bodyParser middleware
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 

//error controller(MISSING)


//app routes 
const promptRoutes = require("./routes/prompts")
app.use('/prompt', promptRoutes);

//port listen decleration
app.listen(port, () => {
    console.log(`Server is running on ${host}`);
});



