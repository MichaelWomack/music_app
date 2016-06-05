angular.module('MusicApp')
    .controller('ArtistsController', function() {
        this.artists = [{
            name: 'Tool',
            album: 'Lateralus'
        },
        {
          name: 'Jimi Hendrix',
          album: 'Electric LadyLand'
        },
        {
          name: 'Radiohead',
          album: 'The Bends'
        }];
    });
