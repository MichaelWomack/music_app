angular.module('MusicApp').controller('NavController',
  function(Authentication, $rootScope, $location) {
    this.loggedIn = Authentication.isLoggedIn();

    $rootScope.$on('$stateChangeStart', () => {
      this.loggedIn = Authentication.isLoggedIn();
    });

    this.signOut = () => {
      Authentication.logout();
    }
});
