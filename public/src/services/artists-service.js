angular.module('MusicApp')
    .factory('Artists', function($http) {
      let service = {};

      service.all = () => {
        return $http.get('/api/artists');
      }

      service.getArtistByName = (name) => {
        return $http.get(`/api/artists/name/${name}`);
      }

      service.getArtist = (id) => {
        return $http.get(`/api/artists/id/${id}`);
      }

      service.updateArtist = (id, artistInfo) => {
        return $http.put(`/api/artists/id/${id}`, artistInfo);
      };

      return service;
    });
