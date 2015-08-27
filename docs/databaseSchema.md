Users
    _id             ObjectId
    birthdate       Date
    fbToken         String
    fbId            String
    friendsList     Array ObjectIds REFERENCES Users
    facebookFriends Array FbId

Gifts
    _id             ObjectId
    type            String
    price           Number
    ADDITIONAL FILTERS? (should be added as fields)

Giftlists
    _id         ObjectId
    userId      ObjectId REFERENCES Users
    friendId    ObjectId REFERENCES Users
    gifts       Array ObjectId REFERENCES Gifts