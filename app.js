const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const constants = require('./src/utils/constants');
const compression = require('compression');

const paths = require('./src/routes/paths/paths');
  require('dotenv').config();
const index = require('./src/routes/index');
const api_info = require('./src/routes/api/api_info');

const helmet = require('helmet');
const request_middleware = require('./middleware/request_middleware.js');

const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
loader = new TwingLoaderFilesystem('./templates');
twing = new TwingEnvironment(loader, {
  // 'cache': './templates/theme_cache',
  //debug: true
});

const app = express();
twing.addGlobal('paths', paths);

// auto security middleware/ config
app.use(helmet());
app.disable('x-powered-by');


// Start SWAGGER DOC GENERATION
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.1', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: constants.SWAGGER.TITLE, // Title (required)
      version: '1.0.0', // Version (required)
      contact: {
        email: constants.SWAGGER.CONTACT_EMAIL,
         name: constants.SWAGGER.CONTACT_NAME
      }
    },
    servers: [{
     // url: constants.PROTOCOL + constants.SERVER_NAME,
      url: 'https://imageserver.link/',
      description: constants.SWAGGER.DESCRIPTION,

    }],

    // difinitions ends here
  },


  // Path to the API docs: sett all routes here
  //apis: ['./src/routes/api_info.js'],
  apis: ['./src/routes/api/*'], // geteverything fron routes folder

};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
// push out the swagger doc so that swagger UI can collect it..
app.get('/' + constants.SWAGGER.UI_EXPRESS_ROUTE, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


const swaggerUi = require('swagger-ui-express');
let options_i = {
  swaggerOptions: {
    url: "https://imageserver.link/api-docs.json"
   // url: constants.PROTOCOL + constants.SERVER_NAME + constants.SWAGGER.UI_EXPRESS_ROUTE
  }
};
app.use('/swagger/does/index.html', swaggerUi.serve, swaggerUi.setup(null, options_i));


// to use Cookie Session
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['456uytrfd3456754'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
/// end cookie session


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('html'));// so that we can link into the css assets in this folder statically
 //app.use(app.router); // to enable express routing before angular routing or any other
app.use('/uploads', express.static('static_files')); // we are loading static files as in uploads but they come from static_files folder

// in development, give coders access to get a jwt token to use and test auth
app.use(compression()); //Compress all routes
// ROUTING STARTS HERE.
app.use(request_middleware('assets_middle_ware'));
app.use('/', index); // anyone can access

app.use('/api/info', api_info);


// npm run test
// DO NOT MODIFY CONTENTS BELLOW
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

// lets render html page for 404 and other server errors
  if(err.status=== 404){
    res.status(err.status);
    twing.render('error404.twig', {
      'params': req.query,
      'page_title': "Content not Found, seems you lost your slippers!",

      'error_message': 'Content not Found, seems you lost your slippers!',
    }).then((output) => {
      res.send(output);
    })


  }else{ res.status(err.status || 500);
    console.log(err);
    twing.render('error500.twig', {
      'params': req.query,
      'page_title': "Servers Errors!",
      'error_message': 'Our Engineers have been notified of this issue and they are working hard to fix it in no distant time.',
    }).then((output) => {
      res.send(output);
    })

  }

});

module.exports = app;
