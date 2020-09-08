const express = require('express');
const router = express.Router();
const paths = require('./paths/paths');
const homePageController = require('../controller/app/index');
const actionController = require('../controller/app/action');


const path = require('path');

//const ipfsAPI = require('ipfs-api');
const multer = require('multer');
//const fs = require('fs');
//const dataUriToBuffer = require('data-uri-to-buffer');
//const imageToURI = require('image-to-data-uri');

//const MAX_SIZE = 52428800;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

const upload = multer({ storage });

router.get(paths.landing, homePageController.landing);

router.post(paths.upload_file, upload.single("image_file"), actionController.postUploadSingleImage);
router.post(paths.upload_file_url, actionController.postUploadImageFromUrl);
router.post(paths.upload_file_base64, actionController.postUploadImageFromBase);
router.delete(paths.upload_file_delete, actionController.notAllowed);

module.exports = router;

