var validate = require('jsonschema').validate;
/**
 * 
 * @param {Object} schema - schema 
 * @param {Object} data - data 
 * @returns 
 */

function inputValidate(schema, data) {
    return validate(schema, data).valid;
}

module.exports = { inputValidate }