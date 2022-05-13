const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
//const connection = require('./db');

//create connection to SQL database
//connection();
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'mysql',
	database : 'nodelogin'
});

// Inititalize the app and add middleware
app.set('view engine', 'pug'); // Setup the pug
app.use(bodyParser.urlencoded({extended: true})); // Setup the body parser to handle form submits
app.use(session({secret: 'super-secret'})); // Session setup

/** Handle login display and form submit */
app.get('/login', (req, res) => {
  if (req.session.isLoggedIn === true) {
    return res.redirect('/');
  }
  res.render('login', {error: false});
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = "test" AND password ="test"',
    [username, password], function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
        //redirect to homepage
        res.redirect(req.query.redirect_url ? req.query.redirect_url : '/')
    } else {
    res.render('login', {error: 'Username or password is incorrect'});
  }
})}
});

/** Handle logout function */
app.get('/logout', (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect('/');
});

/** Simulated bank functionality */
app.get('/', (req, res) => {
  res.render('index', {isLoggedIn: req.session.isLoggedIn});
});

app.get('/balance', (req, res) => {
  if (req.session.isLoggedIn === true) {
    res.send('Your account balance is $1234.52');
  } else {
    res.redirect('/login?redirect_url=/balance');
  }
});

app.get('/account', (req, res) => {
  if (req.session.isLoggedIn === true) {
    res.send('Your account number is ACL9D42294');
  } else {
    res.redirect('/login?redirect_url=/account');
  }
});

app.get('/contact', (req, res) => {
  res.send('Our address : 321 Main Street, Beverly Hills.');
});

/** App listening on port */
app.listen(port, () => {
  console.log(`MyBank app listening at http://localhost:${port}`);
});