var resetTime = Date.now()
  , resetCount = 0;

exports.getTimes = function (req, res) {
	res.json({'resetTime': resetTime, 'resetCount': resetCount});
};

exports.resetTime = function (req, res) {
	resetTime = Date.now();
	resetCount++;
	res.json({'status': 'ok'});
};