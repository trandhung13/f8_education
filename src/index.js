const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { reset } = require('nodemon');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const SortMiddleware = require('./app/midddlewares/SortMiddleware');
const helpersUtil = require('../src/util/helpers');

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();


// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: helpersUtil.sum,
    sortable: helpersUtil.sortable,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// Routes init
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
