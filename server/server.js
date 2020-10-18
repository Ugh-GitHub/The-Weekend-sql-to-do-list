const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

let toDoRouter = require('./routes/to_do_router');
app.use('/list', toDoRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});