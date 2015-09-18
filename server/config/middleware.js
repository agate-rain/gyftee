var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function(app, express) {
  // define routers
  var userRouter = express.Router();
  var giftRouter = express.Router();
  var friendRouter = express.Router();

  // express middleware
  app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors());

  // We point to our static assets
  app.use(express.static(__dirname + '/../../src'));

  // define API paths
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/friends', friendRouter);

  //TODO persist redux state on client on browser refresh
  //TODO catch all get requests to redirect the client (is this right?)
  app.get('/*', function(req, res) {
    res.sendFile('index.html', {
      root: '../../src'
    });
  });

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../friends/friendRoutes.js')(friendRouter);

};
