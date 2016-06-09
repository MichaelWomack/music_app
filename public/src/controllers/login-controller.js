angular.module('MusicApp')
  .controller('LoginController', function() {

    this.user = {
      email: '',
      password: ''
    };

    this.signIn = () => {
      alert('Successfully Signed In!');
      console.log('Successfully Signed In!');
    }
   });
