angular.module('MusicApp')
  .controller('LoginController', function() {
    this.email = '';
    this.password = '';

    this.signIn = () => {
      alert('Successfully Signed In!');
      console.log('Successfully Signed In!');
    }
   });
