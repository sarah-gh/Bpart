/**
 * 
 * @param {Object} obj - query-string 
 * @param {Array} validValues - valid-values 
 * @returns
 */
function queryStringValidate(obj, validValues) {
    for (let key in obj) {
        if (!validValues.includes(key.toLocaleLowerCase())) {
            return false;
        }
    }
    return true
}

module.exports = { queryStringValidate }