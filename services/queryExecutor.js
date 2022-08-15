const { Pool } = require('pg')
const c = require('../config')

const client = new Pool(c.databaseConfig);

async function executeQuery(query) {
    if (query.includes('-')) {
        return Promise.reject('-')
    } else {
        return await client.query(query)
    }
}

module.exports = { executeQuery }