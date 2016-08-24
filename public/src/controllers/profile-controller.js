angular.module('MusicApp')
    .controller('ProfileController', function (Artists, Users, $timeout, $state) {

        Users.getCurrentUser().success((data) => {
            this.user = data;

            Artists.getArtist(this.user.artist_id).success((data) => {
                this.artist = data;
            });
        });

        this.editMode = false;
        this.image;

        this.toggleEditMode = () => {
            this.editMode = !this.editMode;
        };

        this.saveArtistProfile = () => {
            Artists.updateArtist(this.user.artist_id, this.artist).success((data) => {
                if (data.success) {
                    this.message = 'Successfully updated profile';
                    this.toggleEditMode();

                } else {
                    this.message = `Failed to update profile. ${data.message}`;
                }

                $timeout(() => {
                    this.message = undefined;
                }, 2000);
            });
        };

        this.uploadImage = () => {
            let imageFile = $('#imageUploader')[0].files[0];
            if (!imageFile) return;
            let formData = new FormData();
            formData.append('file', imageFile);
            Artists.uploadImage(this.user.artist_id, formData).success((data) => {
                if (data.success) {
                    this.message = data.message;
                    $timeout(() => {
                        this.message = undefined;
                    }, 2000);
                }

                $state.transitionTo($state.current, $state.params, {
                    reload: true,
                    inherit: true,
                    notify: true
                });
            });
        };
    })
;
