var exported = {};


var sendJSON = function(res) {
    return function(data) {
        res.json(data);
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

exported.indexFunction = function(model, queryObject) {
	return function(req, res){
		model.findAll(queryObject)
		.then(sendJSON(res))
		.catch(sendServerError(res));
	};
};
exported.sendJSONFunction = sendJSON;
exported.sendServerErrorFunction = sendServerError;
exported.sendNotFoundErrorFunction = sendNotFoundError;
module.exports = exported;