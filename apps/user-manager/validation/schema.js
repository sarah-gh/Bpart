const schemaObj = {
    '/api/register': {
        POST: {
            type: "object",
            properties: {
                fname: {
                    type: "string",
                    minLength: 2
                },
                lname: {
                    type: "string",
                    minLength: 2
                },
                username: {
                    type: "string",
                    minLength: 3
                },
                password: {
                    type: "string",
                    minLength: 6
                },
                email: {
                    type: "string",
                    format: "email"
                },
                phoneNumber: {
                    type: "string",
                    minLength: 11,
                    maxLength: 11
                },
            },
            required: [
                "fname",
                "lname",
                "username",
                "password",
                "phoneNumber"
            ]
        }
    },
    '/api/users/operation': {
        POST: {
            type: "object",
            properties: {
                operation: { type: "string" },
                status: {
                    type: "int",
                    maxLength: 1
                },
                articleId: { type: "int" },
                commentId: { type: "int" },
                headerPhoto: { type: "string" },
                title: { type: "string", minLength: 20 },
                articleText: { type: "string", minLength: 10 },
                date: { type: "string" },
                tag: { type: "array" },
                readTime: { type: "int" },
                required: [
                    "operation",
                    "status"
                ]
            }

        },
    },
}

module.exports = { schemaObj }