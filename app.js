const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();
const port = process.env.PORT || 3000;
// connect to mongodb & listen for requests
const dbURI = "mongodb://RitikaSingh:RitikaSingh@ac-a3laoaa-shard-00-00.ftyz5s9.mongodb.net:27017,ac-a3laoaa-shard-00-01.ftyz5s9.mongodb.net:27017,ac-a3laoaa-shard-00-02.ftyz5s9.mongodb.net:27017/?ssl=true&replicaSet=atlas-116vwt-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});