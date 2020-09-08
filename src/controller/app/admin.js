const response = require('../../action/response');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const UserProfile = require('../../models/userModel');
const Sponsorships = require('../../models/sponsorships');
const Packages = require('../../models/packages');
const Cashouts = require('../../models/cashouts');


module.exports =  {

    Home(req, res){


      twing.render('admin.twig', {
            'page_title': "FarmGrid Farm Sponsorship",
            'params': req.query,

        }).then((output) => {
            res.send(output);
        })


    },


    Users(req, res){

    UserProfile.findAll( { order: [
            ['id', 'DESC']]}).then(users => {

        twing.render('admin_users.twig', {
            'page_title': "USERS | FarmGrid Farm Sponsorship",
            'params': req.query,
            'users': response.Parse(users),
        }).then((output) => {
            res.send(output);
        })


    })
    },


    Packages(req, res){

        Packages.findAll( { order: [
                ['id', 'DESC']]}).then(users => {

            twing.render('admin_packages.twig', {
                'page_title': "PACKAGES | FarmGrid Farm Sponsorship",
                'params': req.query,
                'packages': response.Parse(users),
            }).then((output) => {
                res.send(output);
            })


        })
    },




    ManageUser(req, res){

        UserProfile.findOne( { where : {id: req.query.user_id } }).then(user => {
            Sponsorships.findAll( { where : {user_id: req.query.user_id }, order: [
                    ['id', 'DESC']] }).then(invests => {
                Packages.findAll( {  }).then(packages => {

                twing.render('admin_manage_user.twig', {
                'page_title': "USER | FarmGrid Farm Sponsorship",
                'params': req.query,
                    'invests': response.Parse(invests),
                    'packages': response.Parse(packages),
                'user': response.Parse(user),
            }).then((output) => {
                res.send(output);
            })
            })
            })


        })
    },


    AdminViewAllSponsorships(req, res){

        let query = { order: [
            ['id', 'DESC']]};
        if(req.query.status){
            query = { where : {status: req.query.status }, order: [
                    ['id', 'DESC']]};
        }

        Sponsorships.findAll(query).then(invests => {

            twing.render('admin_view_sponsorships.twig', {
                'page_title': "SPONSORSHIPS | FarmGrid Farm Sponsorship",
                'params': req.query,
                'invests': response.Parse(invests),
            }).then((output) => {
                res.send(output);
            })

    })
},

    AdminViewAllCashOuts(req, res){

        let query = { order: [
                ['id', 'DESC']]};
        if(req.query.status){
            query = { where : {status: req.query.status }, order: [
                    ['id', 'DESC']]};
        }
        Cashouts.findAll(query).then(invests => {

            twing.render('admin_view_cashouts.twig', {
                'page_title': "CASHOUTS | FarmGrid Farm Sponsorship",
                'params': req.query,
                'cashouts': response.Parse(invests),
            }).then((output) => {
                res.send(output);
            })

        })
    },



    ManageSubscription(req, res){

        Sponsorships.findOne( { where : {id: req.query.id } }).then(spon => {
            let my_spon =  response.Parse(spon);
            UserProfile.findOne( { where : {id: my_spon.user_id } }).then(user => {
                twing.render('admin_manage_subscription.twig', {
                    'page_title': "Manage Subscription | FarmGrid Farm Sponsorship",
                    'params': req.query,
                    'spon': response.Parse(spon),
                    'user': response.Parse(user),
                }).then((output) => {
                    res.send(output);
                })
            })


        })
    },







};


