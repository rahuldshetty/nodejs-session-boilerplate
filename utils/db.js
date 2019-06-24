const loki = require('lokijs');
let db = new loki('loki.json');
let User = db.addCollection('User',{'unique':'email'});

exports.findByMail = (email) =>{
	return User.find({'email':email})[0];
}

exports.register = function(obj){
	let name = obj.name,email=obj.regEmail,password=obj.regPass,mobile=obj.mobile;
	var user = User.find({'email':email});
	if(user.length!=0){
		// USer Exists with same email
		console.log('already exists email..');
		return false;
	}
	else{
		User.insert({
			'name':name,
			'mobile':mobile,
			'email':email,
			'password':password
		});
		console.log('Inserted Record',name,email);
		return true;
	}
}

exports.checkLogin = function(){

}