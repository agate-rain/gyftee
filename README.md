# Gyftee

Get personalized, surprising and irreverent gift ideas for your family and friends.

## User Flow

#### Login through Facebook and Auth0

![login](http://i.imgur.com/xOXnDC8.png?1)

---

#### Main Screen, sorted by upcoming birthdays
![MainScreen](http://i.imgur.com/SzmxDrf.png)

---

#### Gift Recommendations based on liked books, music and photos
![gifts1](http://i.imgur.com/m8xDoEs.png) ![gifts2](http://i.imgur.com/P5ZiUjo.png)

---

#### Get Etsy gifts based on tags from photos
![etsy](http://i.imgur.com/VsaEwiH.png?1)

---

#### Save gifts to wishlist, or click through to buy!
![add](http://i.imgur.com/m48FHpR.png)

---

## Dev Team
- Product Owner: Eric Le
- Scrum Master: Jennie Kim Eldon
- Development Team: Ben Biran, Chris Saden

## Installing Dependencies

Type these commands to get started:

1. `npm install` node dependencies
2. `bower install` bower dependencies
3. `brew install mongodb` if you need to install mongoDB client
4. create `/data/db` folder at root directory if it doesn't exist already
5. run `mongod --dbpath ./data/db` process from the root directory in terminal
6. `npm start` to run the application in development mode

## Tech Stack

### Front End

- React
- Redux

### Back End

- Node/Express
- MongoDB/Mongoose

### API

**'/api/users/'**

  post '/save'  
  post '/friends'  

**'/api/friends'**

  post '/' get friend  
  post '/savegift' save a gift  
  post '/removegift' remove a gift  

  get '/wishlist/:friendId/:userId' get wishlist for a user's friend  

  post '/image' get image url from Facebook  
  post '/invitableFriends' get invitable friends from Facebook  
  post '/:friendId', get friend by Facebook ID  

**'/api/gifts'**

  post '/gettagsfromclarifai'  
  post '/gettagsfrommetamind'  
  post '/searchEtsy'  
  post '/searchbykeyword'  
  post '/itemlookup'  
  post '/searchsimilargifts'  
  post '/getevents'  
  post '/getartistimage'  

### EXTERNAL APIS

Gyftee makes use of external APIs to retrieve data, which include...
  - [Facebook Graph](https://developers.facebook.com/docs/graph-api)
  - [Amazon Product Advertising](https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html)
  - [BandsInTown](https://www.bandsintown.com/api/overview)
  - [Clarifai](https://developer.clarifai.com/docs/)

**Testing**

- Mocha/Chai
- Should

**Build System**

- Webpack

**Deployment**

- CircleCI
- Heroku or Docker/AWS (TODO)

## Roadmap
- [Product scope (Asana)](https://app.asana.com/0/46865547141591/list)
- [Sprint schedule (Asana)](https://app.asana.com/0/46865547141637/list)

### Build First Principles

- Save time and reduce human error through task automation
- Enforce modular, scalable application design
- Make testing and maintenance easier
- Ensure that releases conform to performance best practices
- Test all deployed code prior to release

### Build First Components

1. Build Process
  - Create tests and tasks to compile the application (automated)
  - Aimed at facilitating continuous development (later can re-tune to focus on max performance)
2. Design
  - Code and augment application architecture
  - Refactor code
  - Update tests and iterate
3. Deployment and Environment
  - Automate the release process
  - Configure different host environments, and define the services and databases they interact with
  - Deliver changes to hosted environment

## Contributing

See [_CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

## File Structure

.  
├── Dockerfile (docker deployment)  
├── Procfile (heroku deployment)  
├── README.md  
├── _CONTRIBUTING.md  
├── bower.json  
├── build  
│   ├── bundle.js  
│   ├── bundle.js.map  
│   ├── css  
│   │   ├── bootstrap.min.css  
│   │   ├── slick.css  
│   │   └── styles.css  
│   ├── img  
│   │   ├── amazon-prime.png  
│   │   ├── bg-tile.jpg  
│   │   ├── g-icon.png  
│   │   ├── gyftee-icon.png  
│   │   ├── icons  
│   │   ├── profile.png  
│   │   └── spinner.gif  
│   ├── index.html  
│   └── scripts  
│       ├── iws6ohy.js  
│       ├── jquery-2.1.1.min.js  
│       ├── lock-7.min.js  
│       ├── modernizr.js 
│       └── sdk.js  
├── circle.yml  
├── data  
│   ├── amazonData.txt  
│   ├── amazonHardCodeData  
│   │   └── data.txt  
│   ├── db  
│   │   ├── gifty.0  
│   │   ├── gifty.ns  
│   │   ├── journal  
│   │   ├── local.0  
│   │   ├── local.ns  
│   │   ├── mongod.lock  
│   │   └── storage.bson  
│   ├── facebookHardCodedData  
│   │   └── fbUserInfo.js  
│   ├── hardCoded.js  
│   └── metamind  
│       └── test.py  
├── docs  
│   ├── amazonHardCodeData  
│   │   ├── amazonDataWithImageandPrice.txt  
│   │   └── data.txt  
│   ├── api.md  
│   └── databaseSchema.md  
├── karma.conf.js  
├── node_modules  
├── package.json  
├── server  
│   ├── amazon.js  
│   ├── config  
│   │   ├── clarifai_node.js  
│   │   ├── dbConfig.js  
│   │   ├── facebook-api.js  
│   │   └── middleware.js  
│   ├── friends  
│   │   ├── friendController.js  
│   │   └── friendRoutes.js  
│   ├── gifts  
│   │   ├── giftController.js  
│   │   ├── giftModel.js  
│   │   └── giftRoutes.js  
│   ├── server.js  
│   └── users  
│       ├── userController.js  
│       ├── userModel.js  
│       └── userRoutes.js  
├── src  
│   ├── app  
│   │   ├── Actions  
│   │   ├── Components  
│   │   ├── Constants  
│   │   ├── Containers  
│   │   ├── Reducers  
│   │   ├── Store  
│   │   └── Utils  
│   ├── client  
│   │   ├── css  
│   │   ├── html-templates  
│   │   ├── img  
│   │   └── scripts  
│   ├── config  
│   │   ├── auth0.js  
│   │   ├── channel.html  
│   │   ├── port.js  
│   │   └── sdk.js  
│   ├── index.html  
│   ├── index.jsx  
│   ├── lib  
│   │   ├── bootstrap  
│   │   ├── jquery  
│   │   ├── marked  
│   │   ├── slick-carousel  
│   │   └── underscore  
│   └── util  
│       ├── sliderSettings.js  
│       └── utility.js  
├── test  
│   └── spec  
│       ├── friendModelSpec.js  
│       ├── giftModelSpec.js  
│       ├── serverSpec.js  
│       ├── serverUtils.js  
│       └── userModelSpec.js  
├── webpack.config.js  
└── webpack.production.config.js  
