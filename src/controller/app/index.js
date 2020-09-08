module.exports =  {

    landing(req, res){

            twing.render('landing.twig', {
                'page_title': "IMAGE SERVER",
                'params': req.query,
            }).then((output) => {
                res.send(output);
            })

    },

};


