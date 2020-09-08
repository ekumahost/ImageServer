
$(".uploadButton").on("click", function(e) {
    e.preventDefault();
    $('.uploadButton').LoadingOverlay("show");

    var post_path = $('#UploadImageForm').attr('action');
    var fd = new FormData();
    var files = $('#image_file')[0].files[0];
    fd.append('image_file', files);

    var contents = $('#UploadImageForm').serialize();

    $.ajax({
        url: post_path + '?'+contents,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(result){

            // set the url to where he can copy it..

            if(result['status'] === 'success'){
                Swal.fire(
                    'IMAGE URL!',
                    result['data']['image_url'],
                    'success'
                );

            }else{

                Swal.fire(
                    'Error!',
                    result['message'],
                    'error'
                )

            }

            $('.uploadButton').LoadingOverlay("hide");

        },
        error: function (e) {
            Swal.fire(
                'Error!',
                "Something is wrong, make sure your image is not too large please, try again later..",
                'error'
            )

        }

    });

});
