angular.module('MusicApp')
    .controller('LoginController', function(Authentication, $location, $rootScope) {
        Authentication.logout();
        this.user;
        this.error;

        this.signIn = () => {
            let user = this.user;
            Authentication.login(user.email, user.password).success((data) => {
                // alert(data.message);
                if (data.success) {
                    $location.path('/feed');
                  }
                else {
                    //show error message
                    this.error = data.message
                }
            });
            console.log('Successfully Signed In!');
        }
    });
