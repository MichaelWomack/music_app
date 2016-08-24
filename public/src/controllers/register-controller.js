
angular.module('MusicApp').controller('RegisterController', function(Authentication) {
  this.isRegistered = true;
  this.user;
  this.error;

  this.toggleRegistered = () => {
    this.isRegistered = !this.isRegistered;
  };

  this.register = () => {
    if (this.user.password !== this.user.passwordRetype) {
        this.error = "Passwords don't match";
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
