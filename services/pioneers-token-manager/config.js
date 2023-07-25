const statusCode = {
    UNAUTHORIZED: 401
}

const errors = {
    UNAUTHORIZED:{
        title: "UNAUTHORIZED",
        message: "token not valid"
    }
}
const contentTypes = {
    JSON: 'application/json'
};

module.exports = {
    statusCode,
    errors,
    contentTypes
}