// angular.module('MusicApp', [])
//     .controller('ArtistController', function() {
//         alert("Hey!");
//         this.artists = [{
//             name: 'Tool',
//             album: 'Lateralus'
//         },
//         {
//           name: 'Jimi Hendrix',
//           album: 'Electric LadyLand'
//         },
//         {
//           name: 'Radiohead',
//           album: 'The Bends'
//         }];
//     });
//
import angular from 'angular';

angular.module('MusicApp')
  .controller('ArtistController', function() {
    this.name = "Michael";
  });
