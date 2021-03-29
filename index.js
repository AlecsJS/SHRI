var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

var opts = {
  maxAge: '1d',
  redirect: false,
  port: 8080
};

app.get('/', (req, res) => {
		res.render('index', { theme: req.query.theme == 'light' ? req.query.theme : 'dark', data: req.query.slide > 0 && req.query.slide < 12 ? req.query.slide - 1 : 0})
	}
);

app.use(
	express.static(path.join(__dirname, 'build'), 
	opts
));

app.listen(opts.port);