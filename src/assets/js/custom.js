$('.toggle-password').on('click', function() {
    $(this).toggleClass('fa-eye fa-eye-slash');
});
function showPass() {
    var inputPass = document.getElementById("passInput");

    if (inputPass.type === "password") {
      inputPass.type = "text";
    } else {
      inputPass.type = "password";
    }
  }


  $('#openDrag').click(function()
  {
      $("#drag").modal('show')
  });