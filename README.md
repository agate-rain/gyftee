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

**Testing**

- Mocha/Chai
- Should

**Build System**

- Webpack

**Deployment**

- CircleCI

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
