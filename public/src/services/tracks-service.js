
angular.module('MusicApp').factory('Tracks', function($http) {
   let service = {};
    
    service.getTracksByArtistId = (id) => {
        return $http.get(`/api/tracks/${id}`);
    };
    
    service.uploadTrack = (artistId, formData) => {
        return $http.post(`/api/tracks/${artistId}`, formData, {
            transformRequest: angular.identity, headers: { 'Content-Type': undefined }
        });
    };
    
    service.deleteTrack = (artistId, trackId) => {
      return $http.delete(`/api/tracks/${artistId}/${trackId}`);  
    };
    
    return service;
});