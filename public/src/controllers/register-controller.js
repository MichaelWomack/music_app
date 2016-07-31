
angular.module('MusicApp').controller('RegisterController', function(Authentication) {
  this.isRegistered = true;
  this.user;
  this.error;

  this.toggleRegistered = () => {
    this.isRegistered = !this.isRegistered;
  }

  this.register = () => {
    this.error = "Passwords don't match";
    if (this.user.password !== this.user.passwordRetype) {
      alert("No matching passwords")
    }
    else {
      Authentication.register(this.user).success((data) => {
        if (data.success) {
          $('#modal').click();
          //show message
        } else {
          this.error = data.message;
        }
      });
    }

  }
});
