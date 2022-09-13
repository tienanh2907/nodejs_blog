const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const sortMiddleware = require('./app/middelwares/sortMiddleware');


//Connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//override with POST having action="/path?_method=..."
app.use(methodOverride('_method'));

//Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: require('./helpers/handlebars'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//get data when post method is executed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Custom middleware
app.use(sortMiddleware);

//routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on  http://localhost:${port}`);
});
