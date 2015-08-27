## USERS ROUTE

GET `api/users/signin`
  ?

POST `api/users/signup`
  ?

POST `api/users/:userId/birthdate`
  data: {
    _id: User ObjectId
    birthdate: Date
  }

POST `api/users/:userid/friends`
  data {
    _id: User ObjectId
  }

DELETE `api/users/:userid/friends/:friendid`

## GIFTS ROUTE

GET `api/gifts/:giftListId`

POST `api/gifts/:giftListId/add`
  data: {
    gift data...
  }

DELETE `api/gifts/:giftListId/:giftId`



? IS THIS THROUGH FACEBOOK
POST `api/users/invite`
  data: {
    email: email
  }