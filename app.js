const bodyParser 		    = require("body-parser"),
	  express   			= require("express"),
	  session    			= require("express-session"),
	  flash				    = require("connect-flash"),
      Chart                 = require('chart.js'),
      app       			= express();

const routes = require("./routes");

app.use(require("express-session")({
	secret : "BMI Calculator",
	resave : false,
	saveUninitialized : false
}));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
      
app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use(routes);

app.use(function(req, res, next){
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
	next();
});

app.listen(process.env.PORT || 3000, function(){
	console.log("The Server is Listening!!!");
});