
angular.module('MusicApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {

        $urlRouterProvider.otherwise('artist');

        $stateProvider
            .state('artist', {
                url: '/artist',
                templateUrl: 'src/templates/artist.html',
                controller: 'ArtistController',
                controllerAs: 'ArtistCtrl'
            })
            .state('login', {
              url: '/login',
              templateUrl: 'src/templates/login.html',
              controller: 'LoginController',
              controllerAs: 'LoginCtrl'
            });
    });
