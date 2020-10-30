const response = require('../../action/response');
const fs = require('fs');
const path = require('path');
//const multer = require('multer');

const MAX_SIZE = 52428800;

const IpfsHttpClient = require('ipfs-http-client');
const { globSource, urlSource } = IpfsHttpClient;
//const ipfs = IpfsHttpClient();
const ipfs = IpfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

module.exports =  {

    async postUploadSingleImage(req, res){


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


   /*     const data = fs.readFileSync(req.file.path);
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
*/

        try {
            // push the file to IPFS
            const file = await ipfs.add(globSource(req.file.path));
            let imageFile = (file.cid).toString();
            let output = {
               // image_url: 'https://ipfs.io/ipfs/' + imageFile
                image_url: 'https://cdn.imageserver.link/ipfs/' + imageFile
            };

            response.successResponse(res, output, "image uploaded", null);

        }catch (e) {
            console.log(e);
            response.errorResponse(res, 200, null, "Something is wrong, try again later", '');

        }

    },

    async postUploadImageFromUrl(req, res){

        console.log(req.body);
        console.log(req.params);

        if(!req.body.image_url){
            response.errorResponse(res, 200, null, "please provide valid image url; this test may not also work from swagger use postman", '');
        }else {


            try {

                // const { urlSource } = IpfsHttpClient;
                const file = await ipfs.add(urlSource(req.body.image_url));
                let imageFile = (file.cid).toString();

                let output = {
                    image_url: 'https://cdn.imageserver.link/ipfs/' + imageFile,
                    ipfs_url: 'https://ipfs.io/ipfs/' + imageFile,
                    ipfs_hash: imageFile
                };

                response.successResponse(res, output, "image uploaded", null);

            } catch (e) {
                console.log(e);
                response.errorResponse(res, 200, null, "Something is wrong, try again later", '');

            }

        }

    },


    postUploadImageFromBase(req, res){




        response.errorResponse(res, 200, null, "maintenance in progress please use image url", '');



        /*    if(!req.body.image_uri){
                response.errorResponse(res, 200, null, "please provide valid image uri, this test may not work from swagger", '');

            }*/


      /*  const data = dataUriToBuffer(req.body.image_uri);
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
        });*/


    },



    notAllowed(req, res){

            response.errorResponse(res, 200, null, "Action not available in version 1.0", '');


    },



};


