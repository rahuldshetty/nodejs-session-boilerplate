const db = require('../utils/db.js');
const passport = require('../utils/passport');

exports.authCheck = (req,res,callback) =>{
	if(!req.user){
		res.redirect('/');
	}
	else{
		var user = db.findByMail(req.user.email);
		if(user.length==0){
			req.session['errordata']={
				title:'Unknown Account!',
				icon:'warning',
				color:'red darken-4',
				textcolor:'	blue-grey-text text-lighten-5',
				linkcolor:'amber-text text-lighten-2',
				message:'Unable to find to your account.'
			};
			res.redirect('/auth/error');
		}
		else if(user.password!=req.user.password){
			req.session['errordata']={
				title:'Access Denied!',
				icon:'warning',
				color:'red darken-4',
				textcolor:'blue-grey-text text-lighten-5',
				linkcolor:'amber-text text-lighten-2',
				message:'Unable to connect to your account.'
			};
			res.redirect('/auth/error');
		}
		else{
			callback();
		}
	}
}