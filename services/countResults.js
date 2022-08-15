const {executeQuery} = require('./queryExecutor')
async function resultCounter(query){
    const res = await executeQuery(query);
    return res.rows?.length
}

module.exports = {resultCounter}

