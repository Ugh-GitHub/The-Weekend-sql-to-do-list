const express = require('express');

const app = express();

app.use( express.urlencoded({extended: true}));

app.use(express.static('server/public'));

let toDoRouter = require('./routes/to_do_router');
app.use('/list', toDoRouter);

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});