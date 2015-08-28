var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express) {
  // define routers
  var userRouter = express.Router();
  var giftRouter = express.Router();
  // giftList is a collection of gift items
  var giftListRouter = express.Router();

  // express middleware
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // define API paths 
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/giftlists', giftListRouter);

  // auth middleware will be here if we allow users to login w/o facebook 

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../giftlists/giftListRoutes.js')(giftListRouter);

};
