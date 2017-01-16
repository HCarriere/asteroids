// server.js

//imports
const express   = require('express')
const path      = require('path')
const exphbs    = require('express-handlebars')
const passport  = require('passport')
const session   = require('express-session')
const bodyParser= require('body-parser')
const multer    = require('multer')
const http		= require('http')

//General cong
const mongo     = require('./app/mongo')
const config    = require('./config') //config file
const app       = express();
const port      = process.env.PORT || config.server.port;
const server 	= http.createServer(app);

//Express configuration
app
.use(express.static(__dirname + '/views/assets'))   //styles
.use(express.static(__dirname + '/uploads'))        //uploads
.use(session({
    secret : config.session.secret,
    resave: false,
    saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())
.use(bodyParser.json() )        // to support JSON-encoded bodies
.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}))



var handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname,'views/layouts'),
    helpers: {
        ifContains: function(context, options, out) { //{{#ifContains privileges 'create_articles'}} interieur {{/ifContains}}
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


/////////// inits ///////////
//chat.init(server);

////////////////////////
//    R O U T E S     //
////////////////////////
app
////////// FRONT //////////

.get('/', (request, response) => {	
	response.render('main', {
		//global:getParameters(request)
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
  //TODO log error
  console.log("express error handler return"+err);
  response.status(500).render('error', {
      errorCode:500,
      errorTitle:"Erreur de serveur interne",
      errorContent:err
  });
});


//application launch
server.listen(port, (err) => {
    if(err) {
        return console.log("launching error on "+port, err)
    }
    console.log("server runing on "+port)
    
});





