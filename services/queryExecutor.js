const { Pool } = require('pg')
const c = require('../config')

const client = new Pool(c.databaseConfig);

async function executeQuery(query) {
    try {
        // if (query.includes('-')) {
        //     return Promise.reject('-')
        // } else {
            return await client.query(query)
        // }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { executeQuery }