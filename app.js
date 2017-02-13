// app.js

//imports
const express   = require('express')
const path      = require('path')
const exphbs    = require('express-handlebars')
const bodyParser= require('body-parser')
const http		= require('http')

//General cong
const mongo     = require('./app/mongo')
const config    = require('./config') //config file
const app       = express();
const port      = process.env.PORT || config.server.port;
const expressServer 	= http.createServer(app);

//Express configuration
app
.use(express.static(__dirname + '/views/assets'))   //styles
.use(express.static(__dirname + '/asteroidsGame'))  
.use(bodyParser.json() )        // to support JSON-encoded bodies
.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}))



var handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname,'views/layouts'),
    helpers: {
        ifContains: function(context, options, out) { 
            //{{#ifContains privileges 'create_articles'}} quelque chose {{/ifContains}}
            if(!context){
                return "";
            }
            for(i=0; i<context.length; i++){
                if(context[i].privilege === options){
                    //contains
                    return out.fn(this);
                }
            }
        }
    }
});

//handlebars configuration
app
.engine('.hbs', handlebars.engine)
.set('view engine', '.hbs')
.set('views', path.join(__dirname, 'app'))


/////////// indexes ///////////
var server = require("./app/server")

/////////// inits ///////////
getEnvVariable();
server.init(expressServer);

////////////////////////
//    R O U T E S     
//
//"/" : the game
//"/info": info
//"/help": help
//
////////////////////////
app
////////// FRONT //////////

.get('/', (request, response) => {	
	response.render('front/game', {
		scripts:
		[
			{file:["/socket.io/socket.io.js",
                  "/js/socketEvents.js"]},
			{file:getAsteroidGameSources()}
		]
	})
})

.get('/info', (request, response) => {	
	response.render('info', {
		
	})
})

.get('/help', (request, response) => {	
	response.render('help', {
		
	})
})


//////////////////////////
.get('/403', function(req,res){
    res.render('error',{
        errorCode:403
    });
})

//////////  OTHER ROUTES ///////
.get('*', function(req, res){
  res.render('error',{
      errorCode:404
  });
});



//////////// Error handler //////////
app.use((err, request, response, next) => {  
  console.log(err);
  response.status(500).render('error', {
      errorCode:500
  });
});


//application launch
expressServer.listen(port, (err) => {
    if(err) {
        return console.log("launching error on "+port, err)
    }
    console.log("expressServer running on "+port);
    
	if(config.envVariables["PRODUCTION"].value == 'TRUE'){
		console.log("running PRODUCTION version");
	}else{
		console.log("running DEVELOPMENT version");
	}
});


function getAsteroidGameSources(){
	if(config.envVariables["PRODUCTION"].value == 'TRUE'){
		return [config.gameBuildInfo.destination+config.gameBuildInfo.version+".js"];
	}else{
		var map = config.gameBuildInfo.devSourceMap;
		return map;
	}
}

function getEnvVariable(){
    //fetching args
    if(process.argv.length > 2) {
        console.log("---args : ");
        for(var i = 2; i < process.argv.length; i++){
            config.envVariables[i-2].value = process.argv[i];
            console.log(config.envVariables[i-2].name+":"+config.envVariables[i-2].value);
        }
        console.log("---------")
    }
    //preparing args
    for(var c =0; c<config.envVariables.length; c++){
        config.envVariables[config.envVariables[c].name] = config.envVariables[c];
    }
}




