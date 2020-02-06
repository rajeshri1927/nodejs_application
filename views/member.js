
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
	
	setTimeout(function() {
		$('.error-message').hide('fast');
	}, 3000);
	
	function validateForm() {
	  var firstname = $('#firstname').val();
	  var lastname = $('#lastname').val();
	  var myfile = $('#myfile').val();
	  
	  if (firstname == "") {
		alert("Please enter FirstName");
		return false;
	  }
	  
	  if (lastname == "") {
		alert("Please enter LastName");
		return false;
	  }
	  
	  if (myfile == "" ) {
		alert("Please select File");
		return false;
	  } else if(!checkFileExtenstion('myfile', ['.jpg', '.gif', '.png']) {
		  alert("Please upload only JPG, GIF, PNG Files");
		  return false;
	  }
	};
	
	function checkFileExtenstion(inputID, exts) {
		var fileName = document.getElementById(inputID).value;
		return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
	};
	
});
	
	