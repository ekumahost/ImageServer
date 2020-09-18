const response = require('../../action/response');
const md5 = require('md5');
const fs = require('fs');

const path = require('path');

const ipfsAPI = require('ipfs-api');
//const multer = require('multer');
const dataUriToBuffer = require('data-uri-to-buffer');
//const imageToURI = require('image-to-data-uri');

const MAX_SIZE = 52428800;

const ipfs = ipfsAPI({
    //host: '127.0.0.1',
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

module.exports =  {

    postUploadSingleImage(req, res){


/*

      // pprocess github uplaod first


        var GitHub = require('github-api');

// basic auth
        var gh = new GitHub({
            username: 'ekumahost',
            password: 'ahsj768GGVVNNBV'
            /!* also acceptable:
               token: 'MY_OAUTH_TOKEN'
             *!/
        });

        let gist = gh.getGist(); // not a gist yet
        gist.create({
            public: true,
            description: 'My first gist',
            files: {
                "1599596784191.jpeg": {
                    content: "Aren't gists great!"
                }
            }
        }).then(function({data}) {
            // Promises!
            let createdGist = data;
            return gist.read();
        }).then(function({data}) {
            let retrievedGist = data;
            // do interesting things
        });

*/

        // end github things..












        // some validations
      if (!req.file) {
          response.errorResponse(res, 200, null, "No image file selected", '');
      }

        const mime = req.file.mimetype;
        if (mime.split('/')[0] !== 'image') {
            // fs.unlink(req.file.path);
            fs.unlink(req.file.path, function (err) {
              //  if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });


            response.errorResponse(res, 200, null, "None image file selected", '');

        }

        const fileSize = req.file.size;
        if (fileSize > MAX_SIZE) {
           //  fs.unlink(req.file.path);
            fs.unlink(req.file.path, function (err) {
               // if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
            response.errorResponse(res, 200, null, "Image size too large, use https://tinypng.com to resize image before upload.", '');

        }


        const data = fs.readFileSync(req.file.path);
          //   console.log("DATA DTA", data);


       return ipfs.add(data, (err, files) => {
            // fs.unlink(req.file.path);
           fs.unlink(req.file.path, function (err) {
               //if (err) throw err;
               // if no error, file has been deleted successfully
               console.log('File deleted!');
           });
           if (files) {

                let output = {
                    image_url: 'https://ipfs.io/ipfs/'+files[0].hash
                };

                response.successResponse(res, output, "image uploaded", null);


            }else {
                console.log(err);
                response.errorResponse(res, 200, null, "Something is not right, try again later...", '');
            }
       });


    },

    postUploadImageFromUrl(req, res){

        console.log(req.file);

        if(!req.body.image_url){
            response.errorResponse(res, 200, null, "please provide valid image url", '');

        }

        const request = require('request-promise-native');

        let jpgDataUrlPrefix = 'data:image/png;base64,';
        let imageUrl         = req.body.image_url;
        request({
            url: imageUrl,
            method: 'GET',
            encoding: null // This is actually important, or the image string will be encoded to the default encoding
        })
            .then(result => {
                let imageBuffer  = Buffer.from(result);
                let imageBase64  = imageBuffer.toString('base64');
                let imageDataUrl = jpgDataUrlPrefix+imageBase64;

                const data = dataUriToBuffer(imageDataUrl);

                return ipfs.add(data, (err, files) => {

                    if (files) {

                        let output = {
                            image_url: 'https://ipfs.io/ipfs/'+files[0].hash
                        };

                        response.successResponse(res, output, "Image uploaded", null);


                    }else {
                        console.log(err);
                        response.errorResponse(res, 200, null, "Something is not right, try again later...", '');
                    }
                });

            });



    },


    postUploadImageFromBase(req, res){


        if(!req.body.image_uri){
            response.errorResponse(res, 200, null, "please provide valid image uri", '');

        }


        const data = dataUriToBuffer(req.body.image_uri);
        return ipfs.add(data, (err, files) => {

            if (files) {

                let output = {
                    image_url: 'https://ipfs.io/ipfs/'+files[0].hash
                };

                response.successResponse(res, output, "Image uploaded", null);

            }else {
                console.log(err);
                response.errorResponse(res, 200, null, "Something is not right, try again later...", '');
            }
        });


    },



    notAllowed(req, res){

            response.errorResponse(res, 200, null, "Action not available in version 1.0", '');


    },



};


