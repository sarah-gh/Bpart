const c = require('../config');
const { addComment } = require('../model/operations/newComment')
const { follow } = require('../model/operations/follow')
const { likeArticle, likeComment } = require('../model/operations/like')
const { savePost } = require('../model/operations/save')
const { addArticle } = require('../model/operations/newArticle')
const { increaseCredit } = require('../model/operations/increaseCredit')
const { processPaymentAndSendArticleLink } = require('../model/operations/downloadArticle')

function operationHandler(req) {
    const postData = req.body;
    console.log('operationHandler: ', postData);
    switch (postData.operation) {
        case "like_article":
            return likeArticle;
        case "like_comment":
            return likeComment;
        case "follow":
            return follow;
        case "save":
            return savePost;
        case "newComment":
            return addComment;
        case "newArticle":
            return addArticle;
        case "increaseCredit":
            return increaseCredit;
        case "downloadArticle":
            return processPaymentAndSendArticleLink;
    }
}

module.exports = { operationHandler }