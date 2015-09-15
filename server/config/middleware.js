var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');


module.exports = function(app, express) {
  // define routers
  var userRouter = express.Router();
  var giftRouter = express.Router();
  var giftListRouter = express.Router(); // giftList is a collection of gift items
  var friendRouter = express.Router();

  // Request body parsing middleware should be above methodOverride
  // express middleware
  app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cookieParser());
  app.use(cookieSession({secret: process.env.SESSION_SECRET}));
  app.use(cors());

  // We point to our static assets
  app.use(express.static(__dirname + '/../../src'));

  // define API paths
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/giftlists', giftListRouter);
  app.use('/api/friends', friendRouter);

  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/../../index.html');
  });

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../giftlists/giftListRoutes.js')(giftListRouter);
  require('../friends/friendRoutes.js')(friendRouter);

};
