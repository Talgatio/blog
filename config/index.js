let host = process.env.DBHOST || 'localhost';
var Config = {
    env: process.env.NODE_ENV,
    mongoose: {
        uri: "mongodb://" + host + "/blog_api"
    },
    STATUS_CODE: {
        SUCCESS: 200,
        ERROR: 500,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401
    },
    PORT: process.env.NODE_ENV || 3005,
    SECRET: 't45g3w45r34tw5ye454uhdgdf'
}

module.exports = Config