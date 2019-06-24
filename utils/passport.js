const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbconfig =require('./db');

passport.serializeUser((user,done)=>{
	console.log("Serializing...",user.email);
	done(null,user);
});

passport.deserializeUser((id,done)=>{
	console.log("Deserializei",id.email);
	var user=dbconfig.findByMail(id.email);
	done(null,user);
});

passport.use(new LocalStrategy({
		usernameField:"loginEmail",
		passwordField:"loginPassword",
	},
	(username,password,done)=>{
		var user = dbconfig.findByMail(username) || [];
		if(user.length==0){
			return done(null,false);
		}
		if(user.password!=password){
			return done(null,false);
		}
		return done(null,user);
	}
));



module.exports = passport;
