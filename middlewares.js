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
			{
				where: {id: req.params.id}
			}
		)
			.then(function(){res.sendStatus(204)})
			.catch(sendServerError(res))
	};
};
exported.sendErrorFunction = sendError;
exported.sendJSONFunction = sendJSON;
exported.sendServerErrorFunction = sendServerError;
exported.sendNotFoundErrorFunction = sendNotFoundError;
module.exports = exported;