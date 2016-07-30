angular.module('MusicApp')
    .controller('ArtistsController', function(Artists) {
        Artists.all().success((data) => {
          this.artists = data;
        });
    });
