angular.module('MusicApp').directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'src/templates/navbar.html',
    controller: 'NavController',
    controllerAs: 'NavCtrl'
  }
});
