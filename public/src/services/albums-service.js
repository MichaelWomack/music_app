/**
 * Created by michaelwomack on 9/6/16.
 */

angular.module('MusicApp').factory('Albums', function ($http) {
    let service = {};

    service.getAll = () => {
        return $http.get('/api/albums');
    };

    return service;
});