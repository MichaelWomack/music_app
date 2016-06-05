
angular.module('MusicApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {

        $urlRouterProvider.otherwise('artists');

        $stateProvider
            .state('artists', {
                url: '/artists',
                templateUrl: 'src/templates/artists.html',
                controller: 'ArtistsController',
                controllerAs: 'ArtistsCtrl'
            })
            .state('login', {
              url: '/login',
              templateUrl: 'src/templates/login.html',
              controller: 'LoginController',
              controllerAs: 'LoginCtrl'
            })
            .state('login.register', {
              templateUrl: 'src/templates/register.html',
              controller: 'RegisterController',
              controllerAs: 'RegisterCtrl'
            });
    });
