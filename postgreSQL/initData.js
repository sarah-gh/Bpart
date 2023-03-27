// environ variables
const {env} = require('../config')

querySetup = `
    create table "user" (
        userId SERIAL PRIMARY KEY,
        fname varchar(100),
        lname varchar(100),
        username varchar(100),
        shortDescription text,
        description text,
        privacy BOOLEAN, 
        userPhoto varchar(100),
        email varchar(100),
        whatsapp varchar(200),
        instagram varchar(200),
        phoneNumber varchar(50),
        fontFamily varchar(200),
        fontSize int,
        fontColor varchar(100),
        password varchar(300),
        credit varchar(100)
    );
    create table "article" (
        articleId SERIAL PRIMARY KEY,
        userId int,
        headerPhoto varchar(100),
        title text,
        articleText text,
        footerPhoto varchar(100),
        pdfFile varchar(100),
        date varchar(100),
        readTime int,
        price varchar(100),
        FOREIGN KEY(userId) REFERENCES "user"(userId)
    );
    create table "comment" (
        commentId SERIAL PRIMARY KEY,
        userId int,
        articleId int,
        fname varchar(100),
        lname varchar(100),
        email varchar(100),
        commentText text,
        replyTo int,
        commentDate varchar(100),
        FOREIGN KEY(userId) REFERENCES "user"(userId),
        FOREIGN KEY(articleId) REFERENCES "article"(articleId),
        FOREIGN KEY(replyTo) REFERENCES "comment"(commentId)
    );
    create table "follow" (
        followId SERIAL PRIMARY KEY,
        followerId int,
        followingId int,
        FOREIGN KEY(followerId) REFERENCES "user"(userId),
        FOREIGN KEY(followingId) REFERENCES "user"(userId)
    );
    create table "like_article" (
        likeId SERIAL PRIMARY KEY,
        articleId int,
        userId int,
        FOREIGN KEY(userId) REFERENCES "user"(userId),
        FOREIGN KEY(articleId) REFERENCES "article"(articleId)
    );
    create table "like_comment" (
        likeId SERIAL PRIMARY KEY,
        commentId int,
        userId int,
        FOREIGN KEY(userId) REFERENCES "user"(userId),
        FOREIGN KEY(commentId) REFERENCES "comment"(commentId)
    );
    create table "save" (
        saveId SERIAL PRIMARY KEY,
        articleId int,
        userId int,
        FOREIGN KEY(userId) REFERENCES "user"(userId),
        FOREIGN KEY(articleId) REFERENCES "article"(articleId)
    );
    create table "tag" (
        tagId SERIAL PRIMARY KEY,
        articleId int,
		tagName varchar(100),
        FOREIGN KEY(articleId) REFERENCES "article"(articleId)
	);
    `
    

queryUser = `
    INSERT INTO "user" (
        userId,
        fname,
        lname,
        username,
        shortDescription,
        description,
        privacy,                        
        userPhoto,
        email,
        whatsapp,
        instagram,
        phoneNumber,
        fontFamily,
        fontSize,
        fontColor,
        password,
        credit
    ) VALUES
        (
            1,
            'محمد',
            'وطنی',
            'mohammadvatani',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد ',
            true,
            'http://${env.HOST}:${env.PORT}/api/images/authors/mohammadvatani.jpg',
            'mohammadvatani@gmail.com',
            'mohammadvatani',
            'mohammadvatani',
            '09157157630',
            'bahij Helvitica',
            1,
            'black',
            'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
            0
        ),
        (
            2,
            'سارا',
            'قطب زاده',
            'saraghotbzadeh',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد ',
            true,
            'http://${env.HOST}:${env.PORT}/api/images/authors/saraGhotbzadeh.jpg',
            'saraghotbzadeh@gmail.com',
            'saraghotbzadeh',
            'saraghotbzadeh',
            '09157153230',
            'bahij Helvitica',
            1,
            'black',
            'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
            0
        ),
        (
            3,
            'علی',
            'احمدی',
            'aliahmadi',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد ',
            true,
            'http://${env.HOST}:${env.PORT}/api/images/authors/aliAhmadi.jpg',
            'aliahmadi@gmail.com',
            'aliahmadi',
            'aliahmadi',
            '09157154330',
            'bahij Helvitica',
            1,
            'black',
            'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413',
            0
        );
`
queryArticle = `
    INSERT INTO "article" (
        userId,
        headerPhoto,
        title,
        articleText,
        footerPhoto,
        Date,
        readTime,
        pdfFile,
        price
    ) VALUES
    (
        1,
        'http://${env.HOST}:${env.PORT}/api/images/posts/1-header.jpg',
        'کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف برای ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت. ',
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        'http://${env.HOST}:${env.PORT}/api/images/posts/1-footer.jpg',
        '۱۴۰۰ تیر ۲۸',
        5,
        'http://${env.HOST}:${env.PORT}/api/images/posts/1-pdf.jpg',
        '10000'
    ),
    (
        2,
        'http://${env.HOST}:${env.PORT}/api/images/posts/2-header.jpg',
        'کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف برای ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت. ',
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        'http://${env.HOST}:${env.PORT}/api/images/posts/2-footer.jpg',
        '۱۴۰۰ تیر ۲۸',
        5,
        'http://${env.HOST}:${env.PORT}/api/images/posts/2-pdf.jpg',
        '10000'
    ),
    (
        3,
        'http://${env.HOST}:${env.PORT}/api/images/posts/3-header.jpg',
        'کنترل کننده زیردریایی طراحی شده توسط دانشجویان دانشگاه صنعتی شریف برای ارتش جمهوری اسلامی ایران در بین ۱۰ زیردریایی برتر جهان قرار گرفت. ',
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
        'http://${env.HOST}:${env.PORT}/api/images/posts/3-footer.jpg',
        '۱۴۰۰ تیر ۲۸',
        5,
        'http://${env.HOST}:${env.PORT}/api/images/posts/3-pdf.jpg',
        '10000'
    );
`
queryComment = `
    INSERT INTO "comment" (
        commentId,
        userId,
        articleId,
        commentText,
        replyTo,
        commentDate
    ) VALUES
    (
        1,
        1,
        1,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        2,
        1,
        1,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        3,
        1,
        1,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        1,
        '1400-4-28'
    ),
    (
        4,
        2,
        2,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        5,
        2,
        2,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        6,
        2,
        2,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        5,
        '1400-4-28'
    ),
    (
        7,
        3,
        3,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        8,
        3,
        3,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        NULL,
        '1400-4-28'
    ),
    (
        9,
        3,
        3,
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
        7,
        '1400-4-28'
    );
`
queryFollow = `
    INSERT INTO "follow" (
        followerId,
        followingId
    ) VALUES
    (
        1,
        2
    ),
    (
        1,
        3
    ),
    (
        3,
        2
    ),
    (
        3,
        1
    ),
    (
        2,
        1
    );
`
queryLike_article = `
    INSERT INTO "like_article" (
        articleId,
        userId
    ) VALUES
    (
        1,
        1
    ),
    (
        1,
        3
    ),
    (
        2,
        1
    ),
    (
        2,
        3
    ),
    (
        3,
        1
    ),
    (
        3,
        3
    );
`
queryLike_comment = `
    INSERT INTO "like_comment" (
        commentId,
        userId
    ) VALUES
    (
        1,
        2
    ),
    (
        2,
        1
    ),
    (
        3,
        1
    ),
    (
        3,
        2
    ),
    (
        5,
        1
    ),
    (
        6,
        2
    ),
    (
        9,
        3
    );
`
querySave = `
    INSERT INTO "save" (
        articleId,
        userId
    ) VALUES
    (
        1,
        1
    ),
    (
        1,
        3
    ),
    (
        2,
        3
    ),
    (
        3,
        1
    );
`
queryTag = `
INSERT INTO "tag" VALUES 
	(1, 1, 'تکنولوژی'),
	(2, 2, 'فلسفی'),
	(3, 3, 'سرگرمی'),	
	(4, 3, 'تکنولوژی')
;
`
module.exports  = {
    querySetup, 
    queryUser, 
    queryArticle, 
    queryComment, 
    queryFollow, 
    queryLike_article, 
    queryLike_comment, 
    querySave,
    queryTag
}