const { executeQuery } = require('../../../../services/queryExecutor');

async function increaseCredit(postData, userId) {
    try {
        const creditAmount = postData.creditAmount
        // ابتدا مقدار موجودی کنونی کاربر را از دیتابیس دریافت می‌کنیم
        const query = `SELECT credit FROM "user" WHERE userId = ${userId};`;
        const result = await executeQuery(query);

        if (result.rows.length === 0) {
            throw new Error('کاربری با این شناسه یافت نشد.');
        }

        // محاسبه موجودی جدید با افزایش مقدار
        const currentCredit = parseFloat(result.rows[0].credit) || 0; // اگر مقدار موجودی null یا undefined باشد، مقدار 0 را فرض می‌کنیم
        const newCredit = currentCredit + parseFloat(creditAmount);

        // اپدیت موجودی کاربر با مقدار جدید
        const updateQuery = `UPDATE "user" SET credit = '${newCredit}' WHERE userId = ${userId};`;
        await executeQuery(updateQuery);

        // return newCredit; // بازگرداندن مقدار موجودی جدید به عنوان نتیجه تابع
    } catch (error) {
        throw new Error(`خطا در افزایش موجودی: ${error.message}`);
    }
}

module.exports = { increaseCredit };
