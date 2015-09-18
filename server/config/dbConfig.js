var config = {};

config.url = process.env.MONGO_LAB_URI || 'mongodb://localhost:27017/gifty';

config.options = {};

module.exports = config;
