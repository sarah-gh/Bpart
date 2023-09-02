const { executeQuery } = require('../../../../services/queryExecutor');

async function getArticleById(articleId) {
    const query = `SELECT * FROM "article" WHERE "articleid" = ${articleId};`;
    const result = await executeQuery(query);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        throw new Error('مقاله‌ای با این شناسه یافت نشد.');
    }
}

// async function processPayment(articlePrice, userCredit, articleId, userId) {
//     const remainingCredit = userCredit - articlePrice;
//     if (remainingCredit < 0) {
//         return { success: false, message: 'اعتبار کافی برای پرداخت نیست.' };
//     }

//     try {
//         // اینجا باید فرایند پرداخت را انجام دهید و پس از تایید پرداخت، مقدار موجودی کاربر را کم کرده و
//         // همچنین اطلاعات دانلود مقاله را به جدول "download" اضافه کنید.
//         // این قسمت به نمونه برای مفهوم‌سازی اضافه شده است.

//         // فرض می‌کنیم پرداخت موفقیت‌آمیز بوده و لینک مقاله برابر با فیلد pdfFile جدول article می‌باشد.
//         const articleData = await getArticleById(articleId);
//         const articleLink = articleData.pdfFile;

//         // فرآیند پرداخت موفق
//         const updatedCredit = remainingCredit.toFixed(0);
//         const query = `INSERT INTO "download" (userid, articleid) VALUES (${userId}, ${articleId});`;
//         await executeQuery(query);

//         // به‌روزرسانی موجودی کاربر در جدول "user"
//         const updateUserCreditQuery = `UPDATE "user" SET "credit" = ${updatedCredit} WHERE "userid" = ${userId};`;
//         await executeQuery(updateUserCreditQuery);

//         return { success: true, message: 'پرداخت با موفقیت انجام شد.', remainingCredit: updatedCredit, articleLink };
//     } catch (error) {
//         console.log(error);
//         throw new Error('خطا در پرداخت و ارسال لینک مقاله.');
//     }
// }

async function processPayment(articlePrice, userCredit, articleId, userId) {
    const remainingCredit = userCredit - articlePrice;
    if (remainingCredit < 0) {
        return { success: false, message: 'اعتبار کافی برای پرداخت نیست.' };
    }

    try {
        // اینجا باید فرایند پرداخت را انجام دهید و پس از تایید پرداخت، مقدار موجودی کاربر را کم کرده و
        // همچنین اطلاعات دانلود مقاله را به جدول "download" اضافه کنید.
        // این قسمت به نمونه برای مفهوم‌سازی اضافه شده است.

        // فرض می‌کنیم پرداخت موفقیت‌آمیز بوده و لینک مقاله برابر با فیلد pdfFile جدول article می‌باشد.
        const articleData = await getArticleById(articleId);
        const articleLink = articleData.pdfFile;

        // اطلاعات کاربری که مقاله را ایجاد کرده
        const articleCreatorId = articleData.userid;

        // فرآیند پرداخت موفق
        const paymentAmount = articlePrice * 0.7; // مبلغ 70 درصد از مبلغ مقاله
        const articleCreatorCreditQuery = `SELECT "credit" FROM "user" WHERE "userid" = ${articleCreatorId};`;
        const articleCreatorResult = await executeQuery(articleCreatorCreditQuery);
        if (articleCreatorResult.rows.length === 0) {
            throw new Error('کاربری با این شناسه یافت نشد.');
        }
        const articleCreatorCredit = parseFloat(articleCreatorResult.rows[0].credit);
        const updatedArticleCreatorCredit = (articleCreatorCredit + paymentAmount).toFixed(0);

        // افزودن مبلغ به موجودی حساب کاربری که مقاله را ایجاد کرده
        const updateArticleCreatorCreditQuery = `UPDATE "user" SET "credit" = ${updatedArticleCreatorCredit} WHERE "userid" = ${articleCreatorId};`;
        await executeQuery(updateArticleCreatorCreditQuery);

        // ثبت فرآیند دانلود مقاله
        const query = `INSERT INTO "download" (userid, articleid) VALUES (${userId}, ${articleId});`;
        await executeQuery(query);

        // به‌روزرسانی موجودی کاربر در جدول "user"
        const updatedCredit = remainingCredit.toFixed(0);
        const updateUserCreditQuery = `UPDATE "user" SET "credit" = ${updatedCredit} WHERE "userid" = ${userId};`;
        await executeQuery(updateUserCreditQuery);

        return { success: true, message: 'پرداخت با موفقیت انجام شد.', remainingCredit: updatedCredit, articleLink };
    } catch (error) {
        console.log(error);
        throw new Error('خطا در پرداخت و ارسال لینک مقاله.');
    }
}


async function processPaymentAndSendArticleLink(postData, userId) {
    // درخواست مشتمل بر ای دی مقاله و ای دی کاربر را دریافت می‌کنیم.
    const { articleId } = postData;

    // بر اساس اطلاعات ای دی مقاله و ای دی کاربر، مبلغ مقاله و اعتبار کاربر را از جدول‌ها به دست می‌آوریم.
    const articlePriceQuery = `SELECT "price" FROM "article" WHERE "articleid" = ${articleId};`;
    const userCreditQuery = `SELECT "credit" FROM "user" WHERE "userid" = ${userId};`;

    try {
        const articleResult = await executeQuery(articlePriceQuery);
        if (articleResult.rows.length === 0) {
            throw new Error('مقاله‌ای با این شناسه یافت نشد.');
        }
        const articlePrice = parseFloat(articleResult.rows[0].price);

        const userResult = await executeQuery(userCreditQuery);
        if (userResult.rows.length === 0) {
            throw new Error('کاربری با این شناسه یافت نشد.');
        }
        const userCredit = parseFloat(userResult.rows[0].credit);

        // فرآیند پرداخت و ارسال لینک مقاله
        console.log('مقاله: ', articlePrice, userCredit, articleId, userId);
        const paymentResult = await processPayment(articlePrice, userCredit, articleId, userId);

        if (paymentResult.success) {
            // اگر پرداخت موفقیت‌آمیز بود، لینک مقاله را به کاربر ارسال می‌کنیم.
            const articleLink = paymentResult.articleLink;
            return true
            // res.send({ success: true, message: paymentResult.message, remainingCredit: paymentResult.remainingCredit, articleLink });
        } else {
            return paymentResult.message
            // اگر پرداخت ناموفق بود، پیام خطا را به کاربر ارسال می‌کنیم.
            // res.send({ success: false, message: paymentResult.message });
        }
    } catch (error) {
        console.log(error);
        return error
        // res.send({ success: false, message: 'خطا در پرداخت و ارسال لینک مقاله.' });
    }
}

module.exports = { processPaymentAndSendArticleLink };
