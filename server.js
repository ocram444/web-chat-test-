//create a simple express server
const express = require('express');
const path = require('path');
const app = express();
//ai code
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: 'my-api-key',
});
const openai = new OpenAIApi(configuration);



//async function to get the data from the API
async function getApiData(messageIn) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: messageIn,
        max_tokens: 6,
        temperature: 0,
      });

    console.log(response.data.choices[0].text);
    return response.data.choices[0].text;
};


async function testFunction(messageIn) {
    messageOut = messageIn + 'test-123';
    return messageOut;
}



//test to see that the api is working...
/*app.get('/api', async (req, res) => {
    const messageIn = 'Human: Please respond with THIS IS A TEST! AI:';
    const messageOut = await getApiData(messageIn);
    res.send(messageOut);
});*/





// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/'));

//Server side:

let messageOut = "";

//serve the front end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});


//server side:
//get data from the front end, alter it, and send it back
app.post('/test', (req, res) => {
    const messageIn = req.body;
    console.log(req);
    console.log('test POST server side - messageIn: ' + messageIn);
    //messageOut = testFunction(messageIn);
    let messageOut = messageIn + '-test-123'; /*for testing*/
    //stringify the messageOut
    messageOut = JSON.stringify(messageOut);
    console.log('test POST server side - messageOut: ' + messageOut);
    res.send(messageOut);
});


//server port
app.listen(5000, () => {
    console.log('Server started on port 5000');
});



