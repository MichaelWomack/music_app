angular.module('MusicApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {

        $httpProvider.interceptors.push('AuthInterceptor');
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'src/templates/login.html',
                        controller: 'LoginController',
                        controllerAs: 'LoginCtrl'
                    },
                    'register@login': {
                        templateUrl: 'src/templates/register.html',
                        controller: 'RegisterController',
                        controllerAs: 'RegisterCtrl'
                    }
                }
            })
            .state('artists', {
                url: '/artists',
                templateUrl: 'src/templates/artists.html',
                controller: 'ArtistsController',
                controllerAs: 'ArtistsCtrl'
            })
            .state('feed', {
              url:'/feed',
              views: {
                '': {
                  templateUrl: 'src/templates/feed.html'
                }
              }
            });

          $locationProvider.html5Mode(true);
    });
