const router = require('express').Router();
const db = require('../utils/db.js');
const passport = require('../utils/passport');
const authUtil = require('../utils/authCheck.js');

router.get('/',(req,res)=>{
	authUtil.authCheck(req,res,()=>{
		res.render('home',{
			
		});
	});
});	

module.exports = router;