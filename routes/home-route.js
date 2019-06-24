const router = require('express').Router();
const db = require('../utils/db.js');
const passport = require('../utils/passport');
const authUtil = require('../utils/authCheck.js');

router.get('/',(req,res)=>{
	authUtil.authCheck(req,res,()=>{
		var user = db.findByMail(req.user.email)
		res.render('home',{
			user:user
		});
	});
});	

module.exports = router;