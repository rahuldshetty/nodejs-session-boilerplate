const PORT = 3000;

const express = require('express');
const authRoute = require('./routes/auth-route');
const homeRoute = require('./routes/home-route');
const bodyparser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const authUtil = require('./utils/authCheck.js');
const path = require('path');

let app = express();


app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({
	secret:'ABCDEFGH',
	cookie:{maxAge:24*60*60*1000},
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static',express.static(path.join(__dirname,'public')));

app.use('/auth',authRoute);
app.use('/home',homeRoute);



app.get('/',(req,res)=>{
	if(req.user)
		res.redirect('/auth/success');		
	else
		res.render("index");
});



app.listen(PORT,()=>{
	console.log(`Listening to ${PORT}....`);
});