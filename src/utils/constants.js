module.exports = Object.freeze({ //Iteration over frozen object is no longer slow

    PROTOCOL: (process.env.NODE_ENV === "development")  ? 'http://' : 'http://',
    SERVER_NAME: 'localhost:11200/',
    //SERVER_NAME: 'localhost:11200/',

    APP_VERSION : '1.0.0',
    APP_LANGUAGE : 'english',// must be same as found in /src/language folder please read documentation
    APP_NAME : 'IMAGESERVER',
    APP_DESCRIPTION : 'IMAGE_SERVER',
    APP_AUTHOR : {
        name: 'Uncle BEn',
        contact: 'ekumaly@binaryhills.org'
    },
    APP_AUTHOR_B: {
        name: 'Sister Ben',
        contact: 'ada@binaryhills.com'
    },
    SWAGGER : {
        'TITLE':'IMAGE SERVER[blockchain_app]',
        'DESCRIPTION':'LIVE APP',
        'CONTACT_EMAIL':'identity@ugarsoft.com',
        'CONTACT_NAME':'Uncle Ben & Him',
        'UI_EXPRESS_ROUTE':'api-docs.json',
     },


});
