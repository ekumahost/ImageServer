const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languages = require('../../src/utils/language_helper');


const GeneralMerchandiseSchema = new Schema({

    product_name : {
        type : String,
        validate : {
            validator: (product_name) => product_name.length > 2,
            message : languages('inventory_models','product_name_length'),
        },
        required : [true, languages('inventory_models','product_name_required')],


    },
    quantity : Number

});

const GeneralMerchandise = mongoose.model('general_merchandise_inventories_test_db', GeneralMerchandiseSchema); // mocha test

module.exports = GeneralMerchandise;