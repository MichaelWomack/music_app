angular.module('MusicApp')
    .controller('LoginController', function(Authentication, $location, $rootScope) {
        if (Authentication.isLoggedIn())
          $location.path('/feed');

        this.user;
        this.error;
        this.message;

        this.signIn = () => {
            let user = this.user;
            Authentication.login(user.email, user.password).success((data) => {
                // alert(data.message);
                if (data.success) {
                  //if profile created
                    $location.path('/feed');
                  // otherwise route to create profile page
                  }
                else {
                    //show error message
                    this.error = data.message
                }
            });
            console.log('Successfully Signed In!');
        }
    });
