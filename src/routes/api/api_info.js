const express = require('express');
const router = express.Router();
const constants = require('../../utils/constants');
const response = require('../../action/response');

router.get('/',  function(req, res, next) {

    response.errorResponse(res);


});

//
/**
 * @swagger
 * /api/info/developers:
 *   get:
 *     summary: Get the details of the Service Developers
 *     description: list coders
 *     tags: [APP_INFO]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     security:
 *        - UserAuthentication: []
 *        - Authorization: []
 *     responses:
 *       200:
 *         description: getting dev team
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'retrieved'
 */


router.get('/developers', function(req, res, next) {

   let app_developers = {

        '0': constants.APP_AUTHOR,

    };

    response.successResponse(res,app_developers);

});



/**
 * @swagger
 * /api/info/app/version:
 *   get:
 *     summary: Get the service version
 *     description: micro service version
 *     tags: [APP_INFO]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: getting version code
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'retrieved'
 */

router.get('/app/version', function(req, res, next) {


   let app_version = {

        'v': constants.APP_VERSION,
       'n': constants.APP_NAME,


   };



    response.successResponse(res,app_version);

});


/**
 * @swagger
 * /api/info/app/sample/error/response/not_found:
 *   get:
 *     summary: Get sample error response 404
 *     description: error response format
 *     tags: [APP_INFO]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: getting sample response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'retrieved'
 */

router.get('/app/sample/error/response/not_found', function(req, res, next) {



    response.errorResponse(res,404);

});



/**
 * @swagger
 * /api/info/app/sample/error/response:
 *   get:
 *     summary: Get sample error response
 *     description: error response format
 *     tags: [APP_INFO]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: getting sample response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'retrieved'
 */

router.get('/app/sample/error/response', function(req, res, next) {
    response.errorResponse(res);

});



/**
 * @swagger
 * /api/info/app/sample/success/response:
 *   get:
 *     summary: Get sample success response
 *     description: success response format
 *     tags: [APP_INFO]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: getting sample response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'retrieved'
 */

router.get('/app/sample/success/response', function(req, res, next) {
    response.successResponse(res);



});


module.exports = router;
