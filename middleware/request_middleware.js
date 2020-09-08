
module.exports = function (myMiddleware) {

    return function (req, res, next) {

        switch(myMiddleware) {
            case 'assets_middle_ware' :
                const d = new Date();
                twing.addGlobal('year', d.getFullYear());
                twing.addGlobal('session', req.session);
                twing.addGlobal('site_url', process.env.website_url);
                twing.addGlobal('route_assets', process.env.ASSETS_LOCATION);
                    next();
                break;

        default:


    }



    }

};
