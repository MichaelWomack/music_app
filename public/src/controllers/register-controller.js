angular.module('MusicApp').controller('RegisterController', function() {
  this.isRegistered = true;
  this.user = {};

  this.toggleRegistered = () => {
    this.isRegistered = !this.isRegistered;
  }

  this.register = () => {
    if (this.user.password != this.user.passwordRetype) {
      alert("Passwords do not match!");
    }
    else
      alert('Sucessfully Registered!');
  }
});
