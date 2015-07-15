var exported = {};


var sendJSON = function(res) {
    return function(data) {
        res.json(data);
    };
};
var sendError = function(res){
	return function(error){
		res.send(error);
	};
};
var sendServerError = function(res){
	return function(error){
		res.send(500, error);
	};
};
var sendNotFoundError = function(res){
	return function(error){
		res.send(404, error);
	};
};

exported.findAllFunction = function(model, queryObject) {
	return function(req, res){
		model.findAll(queryObject)
		.then(sendJSON(res))
		.catch(sendServerError(res));
	};
};
exported.findOneFunction = function(model, queryObject, param) {
	return function(req, res){
		model.findOne(req.params[param], queryObject)
			 .then(sendJSON(res))
			 .catch(sendError(res));	
	};
};
exported.createFunction = function(model){
	return function(req, res){
        model.create(req.body)
            .then(sendJSON(res))
            .catch(sendServerError(res))
    };
};
exported.destroyByIdFunction = function(model) {
	return function(req, res) {
		model.destroy(
			{ where: {id: req.params.id}}
		)
			.then(function(){res.sendStatus(204)})
			.catch(sendServerError(res))
	};
};
exported.generateToken = function(req, res){
	var User = require('./models').User;
	var jwt = require('jsonwebtoken');
	var privateKey = 'something';
	User.findOne({	where: {username: req.body.username},
					attributes: ["username", "password"]
				})
				.then(function(user){
					if (!user) return res.json({success: false, message: "User not found"});
					var isPasswordMatch = user.comparePassword(req.body.password);
					if (!isPasswordMatch) return res.json({success: false, message: "Invalid password"});
					var token = jwt.sign({name: user.username}, privateKey, { expiresInMinutes: 60});
					res.json({success: true, message: 'Token created', token: token});
				})
				.catch(sendServerError(res));
};
exported.validateToken = function(req, res, next){
	// console.log('Validating token');
	var jwt = require('jsonwebtoken');
	var secret = 'something';
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log('token is ' + token)
	if (token){
		jwt.verify(token, secret, function(err, decoded){
			if (err) {
				console.log('Failed to authenticate token');
				return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				res.json("Token validated");
				console.log('Succeeded to validate token');
				next();
			}
		});
	} else {
		console.log('no token provided');
		return res.status(403).send({ success: false, message: 'No token provided' });
	}
};
exported.sendMail = function(req, res){
  var nodemailer = require('nodemailer');
  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'angularpharm@gmail.com',
          pass: 'ngpharm12345'
      }
  });
  // NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
	var sender = 'From ' + req.body.name + ' with phone number ' + req.body.phoneNumber;
	var contactBack = 'Contact sender at: ' + req.body.emailAddress
  	var mailOptions = {
      from: '', // sender address
      to: 'angularpharm@gmail.com', // list of receivers
      subject: sender, // Subject line
      text: '', // plaintext body
      html: '<p> Message: ' + req.body.message + '. ' + contactBack + '</p>' // html body
  	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
		res.end("sent");
	});
}
exported.sendErrorFunction = sendError;
exported.sendJSONFunction = sendJSON;
exported.sendServerErrorFunction = sendServerError;
exported.sendNotFoundErrorFunction = sendNotFoundError;
module.exports = exported;