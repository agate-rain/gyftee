var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  // define routers
  var userRouter = express.Router();
  var duelRouter = express.Router();
  var battleRouter = express.Router();

  // express middlewars
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // api paths for various routes
  app.use('/api/users', userRouter);
  app.use('/api/duels', duelRouter);
  app.use('/api/battles', battleRouter);
  
  // authentication middleware used to decode token and made available on the request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  
  // require necessary route files
  require('../users/userRoutes.js')(userRouter);
  require('../duels/duelRoutes.js')(duelRouter);
  require('../battles/battleRoutes.js')(battleRouter);
};
