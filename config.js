const fs = require('fs')
const dotenv = require('dotenv')
process.chdir(__dirname);
const env = dotenv.parse(fs.readFileSync('.env'))

const serverConfig = {
    hostname: env.HOST,
    port: env.PORT,
    eventEmitter: null,
    event: "new-request"
};
const routerConfig = {
    eventEmitter: null,
    event: "new-request"
};
const databaseConfig = {
    user: env.USERNAME, // sara
    host: env.DATABASEHOST, // localhost
    password: env.PASSWORD, // 2660
    database: env.DATABASE, // sara
    port: env.DATABASEPORT, // 5432
    // ssl: {
    //     rejectUnauthorized: false
    // },
    client_encoding: 'utf8'
};
const tokenConfig = {
    tokenKey: env.TOKEN_KEY,
    expireTime: '24h'
}
const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    UNAUTHORIZED: 401
};

const contentTypes = {
    JSON: 'application/json'
};

const appDirectory = './apps';
// const appsDirectory = ['athentication','comment-manager','post-manager','search','upload-image','user-manager'];
const appsDirectory = ['post-manager', 'athentication', 'user-manager', 'upload-image'];

module.exports = {
    serverConfig,
    routerConfig,
    appDirectory,
    databaseConfig,
    appsDirectory,
    contentTypes,
    tokenConfig,
    statusCodes,
    env,
};