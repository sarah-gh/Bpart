
const redis = require("redis");

const dataStorage = redis.createClient({ db: 5 });

module.exports = {
    redis,
    dataStorage,
};