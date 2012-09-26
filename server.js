var config = require('./config.json')
  , timerServer = require('./timerServer');

var express = require('express')
  , app = express();

/** Settings */
app.set('view engine', 'ejs');

/** Middleware */
app.use(express.static(__dirname + '/public'));

/** Routes */
app.get('/', function(req, res) {
  res.render('index', {
  	config : config,
  	page : {
  		title: 'Feidippes the Marathon timer',
  		header: 'Feidippes the Marathon timer'
  	}
  });
});


app.get('/control/reset/', function (req, res) {
	timerServer.resetTime(req, res);
});

app.get('/control/', function (req, res) {
	res.render('admin', {
		config : config,
		page : {
			title: 'Feidippes the Marathon timer | Admin',
			header: 'Feidippes - Timer controller'
		}
	});
});

app.get('/time/', function (req, res) {
	timerServer.getTimes(req, res);
});

/** Redirect unknown routes to home */
app.get('*', function (req, res) {
	res.redirect(config.baseUrl);
})

app.listen(config.port, config.host);
console.log('Server running on http://' + config.host + ((config.port !== 80) ? (':' + config.port) : '') + '/');