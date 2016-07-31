angular.module('MusicApp').factory('Users', function($http) {
  let service = {};

  service.getAll = () => {
    return $http.get('/api/users');
  };

  service.getCurrentUser = () => {
      return $http.get('/api/users/me');
  };

  service.getUserById = (id) => {
    return $http.get(`/api/users/${id}`);
  }

  return service;
});
