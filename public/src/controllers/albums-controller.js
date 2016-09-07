/**
 * Created by michaelwomack on 9/6/16.
 */

angular.module('MusicApp').controller('AlbumsController', function(Albums) {
    Albums.getAll().then((data) => {
       alert(data.data);
    });
    this.showAddAlbum = false;
    
    this.toggleAddAlbum = () => {
        
        this.showAddAlbum = !this.showAddAlbum;
    };
    
    
    
});