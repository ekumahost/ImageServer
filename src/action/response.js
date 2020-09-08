
function errorResponse (res,status_code=200,data=null,message='Action Failed',error_details={}) {
    let response = {
        'data': data,
        'status' : 'failure',
        'status_code' : status_code,
        'message' : message.toString().replace(/ *\([^)]*\) */g, ""),
        'response_details' : error_details

    };

    res.status(status_code).json(response);

}

function successResponse (res,data=null,message='Action complete',error_details={}) {
    let response = {
        'data': data,
        'status' : 'success',
        'status_code' : 200,
        'message' : message.toString().replace(/ *\([^)]*\) */g, ""),
        'response_details': error_details
    };

    res.status(200).json(response);
}

function Parse (data) {
    return JSON.parse(JSON.stringify(data, null, 4));

}


module.exports = {
    errorResponse,
    successResponse,
    Parse
};



