angular.module('MusicApp')
    .controller('ArtistsController', function(Artists) {
        Artists.all().success((data) => {
          this.artists = data;
        });


        // Maybe can filter artists by most popular,
        // most likes, followers, by date joined.

    });
