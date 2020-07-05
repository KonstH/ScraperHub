const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'landing'}));
app.set('view engine', 'handlebars');

// Set static folder for styles and assets
app.use(express.static(path.join(__dirname, 'public')));

// Get the routes path
app.use('/', require('./routes/main'));

const PORT = process.env.PORT || 5000;

// Where the site will be hosted
app.listen(PORT, console.log(`Server running on ${PORT}`));