angular.module('MusicApp').controller('RegisterController', function() {
  this.isRegistered = true;
  this.user = {
    email: '',
    password: '',
    passwordRetype: '',
    artistName: ''
  };

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
