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
                url: '/feed',
                views: {
                    '': {
                        templateUrl: 'src/templates/feed.html'
                    }
                }
            }).state('profile', {
                url: '/profile',
                views: {
                    '': {
                        templateUrl: 'src/templates/edit-profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'ProfileCtrl'
                    },
                    'tracks@profile': {
                        templateUrl: 'src/templates/profile/tracks.html',
                        controller: 'TracksController',
                        controllerAs: 'TracksCtrl'
                    },
                    'albums@profile': {
                        templateUrl: 'src/templates/profile/albums.html'
                    },
                    'following@profile': {
                        templateUrl: 'src/templates/profile/following.html'

                    }
                }
            });

        $locationProvider.html5Mode(true);
    });
