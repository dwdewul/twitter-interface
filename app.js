const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./routes');


const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
// set views folder
app.set('views', './views');
// Set up template engine with pug
app.set('view engine', 'pug');
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);



const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Serving is running on port ${PORT}`);
})
