angular.module('MusicApp').controller('TracksController', function (Users, Tracks, Artists, $state) {
    Users.getCurrentUser().success((data) => {
        this.user = data;

        Tracks.getTracksByArtistId(this.user.artist_id).success((data) => {
            this.tracks = data;
            this.editableTracks = this.tracks.map((track) => {this.editableTracks.push(false)});
        });
        
        Artists.getArtist(this.user.artist_id).success((data) => {
            this.artist = data;
            this.albums = this.artist.albums.map((album) => {return album.name});
        });
    });
    
    this.showUploadForm = false;
    
    this.toggleUploadForm = () => {
        this.showUploadForm = !this.showUploadForm;
    };
    
    this.toggleTrackDetail = (trackElement) => {
        trackElement.show = !trackElement.show;
    };

    this.toggleEditTrack = (index) => {
        this.editableTracks[index] = !this.editableTracks[index];
    };

    this.uploadTrack = () => {
        let $audioFile = $('#track-upload')[0].files[0];
        let formData = new FormData();

        alert(this.user.artist_id);
        if ($audioFile)
            formData.append('file', $audioFile);

        let keys = Object.keys(this.trackInfo);
        keys.map((key) => {formData.append(key, this.trackInfo[key])});

        Tracks.uploadTrack(this.user.artist_id, formData).success((data) => {
            if (data.success) {
                alert(data.message);
                this.toggleUploadForm();
            }

            $state.transitionTo($state.current, $state.params, {
                reload: true,
                inherit: true,
                notify: true
            });
        });
    };

    this.deleteTrack = (index) => {
        let trackId = this.tracks[index]._id;
        this.tracks.splice(index, 1);

        // Call delete track http
        Tracks.deleteTrack(this.artist._id, trackId).success((data) => {
            alert(`Track with Id ${trackId} deleted: ${data}`);
        });
    };
});