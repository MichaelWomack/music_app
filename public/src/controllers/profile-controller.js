angular.module('MusicApp')
    .controller('ProfileController', function(Artists, Users) {

        Users.getCurrentUser().success((data) => {
            this.user = data;

            Artists.getArtist(this.user.artist_id).success((data) => {
                if (data.success)
                    this.artist = data;
            });
        });




        //EDIT PROFILE
        //get this user/artist information
        //artist name
        //profile picture
        //genre
        //bio
        this.saveArtistProfile = () => {
            Artists.updateArtist(this.user._id, this.artist).success((data) => {
                // Alert that artist info successfully saved
                if (data.success)
                    this.message = data.message;
                alert(Object.keys(data).map((key) => key + ": " + data[key]));
            });
        };
    });
