const { Client } = require('pg')
const c = require('../config')
const q = require('./initData')

let client = new Client(c.databaseConfig)
try {
    client.connect()
} catch (error) {
    console.log('error connect...', error);
}


function createTables() {
    return new Promise((resolve, reject) => {
        client.query(q.querySetup)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addInitData(query) {
    return new Promise((resolve, reject) => {
        client.query(query)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

async function setupDatabase() {
    try {
        await createTables()
        await addInitData(q.queryUser)
        await addInitData(q.queryArticle)
        await addInitData(q.queryComment)
        await addInitData(q.queryFollow)
        await addInitData(q.queryLike_article)
        await addInitData(q.queryLike_comment)
        await addInitData(q.querySave)
        // await addInitData(q.queryTag)
        client.end()
    } catch(err) {
        console.log('error setup ... ', err)
        return
    }
}

setupDatabase()