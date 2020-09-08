const express = require('express');
const router = express.Router();
const paths = require('../paths/paths');
const homePageController = require('../../controller/app/index');




/**
 * @swagger
 * /upload/image/file:
 *   post:
 *     summary: upload image file
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                 image_file:
 *                     type: string
 *                     format: binary
 *     description: ------ submit only image file
 *     tags: [IMAGE SERVER]
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *
 *       - in: query
 *         name: name
 *         description: ------ name not used for anything
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             example:
 *              data: { "image_url": "https://....." }
 *              status: success
 *              status_code : 200
 *              code: agree_code
 *              message: thanks you for using
 *              response_details: null
 *
 *       404:
 *         description: not found
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: success
 *              status_code : 404
 *              code: agree_code
 *              message: string
 *              response_details: null
 *
 *
 *       417:
 *         description: action failed
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 417
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: { "color":[ "RED", "GREEN", "WHITE" ], "size":[ "20", "40", "40" ]}
 *              status: failure
 *              status_code : 500
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 400
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 */




/**
 * @swagger
 * /upload/image/url:
 *   post:
 *     summary: upload image from url
 *     description: -- provide image url for upload action x-www-form-urlencoded form type
 *     tags: [IMAGE SERVER]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: image_url
 *         description: -- accepts only image url on the web
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: -- -- success response
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              data : { "image_url": "https://....." }
 *              status_code : 200
 *              code: agree_code
 *              message: please thanks for being kind
 *              response_details: null
 *
 *       404:
 *         description: -- 404
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: success
 *              status_code : 404
 *              code: agree_code
 *              message: string
 *              response_details: null
 *
 *
 *       417:
 *         description: -- 417
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 417
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       500:
 *         description: -- -- internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 500
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       400:
 *         description: --  -- bad request
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 400
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 */




/**
 * @swagger
 * /upload/image/base64:
 *   post:
 *     summary: upload image from uri
 *     description: -- provide image uri for upload action thus  data:image/png;base64,iVBORw0KGgoAAA
 *     tags: [IMAGE SERVER]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: image_uri
 *         description: -- accepts only image url on the web
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: -- -- success response
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              data : { "image_url": "https://....." }
 *              status_code : 200
 *              code: agree_code
 *              message: please thanks for being kind
 *              response_details: null
 *
 *       404:
 *         description: -- 404
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: success
 *              status_code : 404
 *              code: agree_code
 *              message: string
 *              response_details: null
 *
 *
 *       417:
 *         description: -- 417
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 417
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       500:
 *         description: -- -- internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 500
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       400:
 *         description: --  -- bad request
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 400
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 */




/**
 * @swagger
 * /upload/image/delete:
 *   delete:
 *     summary: delete image
 *     description: -- provide image hash
 *     tags: [IMAGE SERVER]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: image_hash
 *         description: -- accepts only image hash
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: -- -- success response
 *         content:
 *           application/json:
 *             example:
 *              status: success
 *              data : { "image_url": "https://....." }
 *              status_code : 200
 *              code: agree_code
 *              message: please thanks for being kind
 *              response_details: null
 *
 *       404:
 *         description: -- 404
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: success
 *              status_code : 404
 *              code: agree_code
 *              message: string
 *              response_details: null
 *
 *
 *       417:
 *         description: -- 417
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 417
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       500:
 *         description: -- -- internal server error
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 500
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 *
 *       400:
 *         description: --  -- bad request
 *         content:
 *           application/json:
 *             example:
 *              data: null
 *              status: failure
 *              status_code : 400
 *              code: agree_code
 *              message: string
 *              response_details: debug_error_dump_for_developers
 */


router.get(paths.landing, homePageController.landing); // homepage

module.exports = router;
