angular.module('MusicApp')
    .controller('ArtistController', function() {
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
