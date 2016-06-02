'use strict';

import angular from 'angular';
import 'angular-ui-router';

angular.module('MusicApp', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider) => {

        $urlRouterProvider.otherwise('artist');

        $stateProvider
            .state('artist', {
                url: '/artist',
                templateUrl: 'src/templates/artist.html',
                controller: 'ArtistController',
                controllerAs: 'ArtistCtrl'

            });
    });

angular.module('MusicApp').controller('ArtistController', function() {
  this.name = "Michael";
});
