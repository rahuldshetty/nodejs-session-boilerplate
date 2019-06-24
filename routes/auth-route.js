const router = require('express').Router();
const db = require('../utils/db.js');
const passport = require('../utils/passport');

router.get('/success',(req,res)=>{
	if(req.user)
		res.send("Welcome User....");
	else
		res.redirect('/');
});

router.get('/error',(req,res)=>{
	var data = req.session['errordata'];
	res.render('message',{
		data:data
	});
});


router.post('/login',
  	passport.authenticate('local', { successRedirect: '/auth/success',
                                   failureRedirect: '/auth/error' })
);

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
});


router.post('/register',(req,res)=>{
	var status = db.register(req.body);
	console.log(status);
	if(status==true){
		res.redirect('/auth/registered');
	}
	else{
		req.session['errordata']={
			title:'Registration Failed!',
			icon:'warning',
			color:'red darken-4',
			textcolor:'blue-grey-text text-lighten-5',
			linkcolor:'amber-text text-lighten-2',
			message:'You already have account registered with this mail. Go back and try resetting your password.'
		};
		res.redirect('/auth/error');
	}
});

router.get('/registered',(req,res)=>{
	var data = {
		title:'Registration Successful!',
		icon:'done',
		color:'green accent-4',
		textcolor:'blue-grey-text text-lighten-5',
		linkcolor:'amber-text text-lighten-2',
		message:'You have successfully registered. Go back to home and login to your account.'
	};
	res.render('message',{
		data:data
	});
});

module.exports = router;