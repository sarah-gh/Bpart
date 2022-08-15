const { executeQuery } = require('../../../services/queryExecutor');
const { hashPassword } = require('../../../utils/hashPassword')

async function insertNewUser(data) {
    const query = `
        INSERT INTO "user"
            (
            fname,
            lname,
            username,
            password,
            privacy, 
            email,
            phoneNumber,
            fontFalmily,
            fontSize,
            fontColor
            )
        VALUES 
            (
                '${data.fname}',
                '${data.lname}',
                '${data.username}',
                '${hashPassword(data.password)}',
                true,
                '${data.email}',
                '${data.phoneNumber}',
                'bahij Helvitica',
                1,
                'black'
            ) 
            RETURNING *;`;
    const response = await executeQuery(query);
    return response.rows[0];
}
module.exports = { insertNewUser }