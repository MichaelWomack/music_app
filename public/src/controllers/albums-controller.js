/**
 * Created by michaelwomack on 9/6/16.
 */

angular.module('MusicApp').controller('AlbumsController', function(Artists, Users, $timeout) {
    
    Users.getCurrentUser().success((data) => {
        this.user = data;
        Artists.getArtist(this.user.artist_id).success((data) => {
            this.artist = data;
            if (!this.artist.albums)
                this.artist.albums = [];

            this.editableAlbum = [];
            this.artist.albums.map((album) => {this.editableAlbum.push(false)});

        });
    });


    this.album;
    this.saved = false;
    this.showAddAlbum = false;
    
    this.toggleAddAlbum = () => {
        this.showAddAlbum = !this.showAddAlbum;
    };
    
    this.toggleEdit = (index) => {
        this.editableAlbum[index] = !this.editableAlbum[index];
    };

    this.addAlbum = () => {
        if (this.album) {
            this.artist.albums.push(this.album);
            this.saveAlbums();
        }

        this.toggleAddAlbum();
    };
    
    this.removeAlbum = (index) => {
        this.artist.albums.splice(index, 1);
        this.saveAlbums();
    };
    
    this.albumsUndefinedOrEmpty = () => {
        let albums = this.artist.albums;
        return (albums == undefined || albums.length == 0);
    };

    this.formatDate = (date) => {
        let dateObj = new Date(date).toLocaleDateString();
        let [month, day, year] = dateObj.split('/');
        let months = ["January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"];

        return `${months[month - 1]} ${day}, ${year}`;
    };
    
    this.saveAlbums = () => {
        Artists.updateArtist(this.artist._id, this.artist).success((data) => {
            if (data.success) {
                this.album = {};
                this.message = data.message;
                this.editableAlbum = this.editableAlbum.map((album) => {album = false});
            }

        });
    };
});