const { inputValidate } = require('../../../utils/jsonschema');
const { schemaObj } = require('./schema');
const { sendFail } = require('../../../utils/response-handler');
const c = require('../config');

function inputDataValidator(req, res, next) {
    const schema = schemaObj[req.routePattern][req.method];
    if (!inputValidate(schemaObj, req.data))
        return sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
    next();
}

module.exports = { inputDataValidator }