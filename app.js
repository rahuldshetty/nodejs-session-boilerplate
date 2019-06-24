const PORT = 3000;

const express = require('express');
const authRoute = require('./routes/auth-route');
const bodyparser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

let app = express();


app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({
	secret:'ABCDEFGH',
	cookie:{maxAge:60000},
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoute);



app.get('/',(req,res)=>{
	if(req.user){
		res.redirect('/auth/success');
	}
	else
		res.render("index");
});



app.listen(PORT,()=>{
	console.log(`Listening to ${PORT}....`);
});