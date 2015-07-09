var exported = {};
exported.sendJSONFunction = function(res) {
    return function(data) {
        res.json(data);
    };
};
exported.sendServerErrorFunction = function(res){
	return function(error){
		res.send(500, error);
	}
};
module.exports = exported;