
$(document).ready(function(){
      $('.table-bordered').on('click','.update',function(){
        var member_id = $(this).data('id');
        var firstname = $(this).data('firstname');
        var lastname = $(this).data('lastname');
        var myfile = $(this).data('userimage');

        $('#member_id').val(member_id);
        $('#firstname').val(firstname);
        $('#lastname').val(lastname);

        $('.image-div').html('<img src="./uploads/'+ myfile + '" alt="test" height="100" width="80" id="profile-img-tag">');

      });

      $('.table-bordered').on('click','.delete',function(){
        var member_id = $(this).data('id');
        $('#DeleteMembersModal').modal('show');
        $('.member_ids').val(member_id);
      });
    });

    $("#myfile").change(function(){
        readURL(this);
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $('.image-div').html('<img src="'+ e.target.result + '" alt="images" height="100" width="80">');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }