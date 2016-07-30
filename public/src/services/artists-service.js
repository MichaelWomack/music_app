angular.module('MusicApp')
    .factory('Artists', function($http) {
      let service = {};

      service.all = () => {
        return $http.get('api/artists');
      }

      service.getArtistByName = (name) => {
        return $http.get('api/artists/:name');
      }

      service.getArtistById = (id) => {
        return $http.get('api/artists/:id');
      }

      return service;
    });
