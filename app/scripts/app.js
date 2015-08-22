'use strict';
var app = app || {};

(function($) {

    app.App = function(){
        this.url = "../data/playlist.json";
        this.$video = $('#video-container');
        this.$playlist = $('#playlist');

        this.event = $({});

        this.data = false;
        
        this.fetch = function(){
            var self = this;

            $.ajax({
                url: self.url,
                success: function(data) {
                    self.data = data.videos;
                    self.event.trigger('success');
                }
            })
        };

        this.appendListItem = function(){
            var self = this;

            _.forEach(self.data, function(val){
                self.$playlist.append('<h2>' + val.title + '</h2>');
            });
        };

        this.renderFirstVideo = function(){
            var self = this,
                firstVideo = _.first(self.data);

            var template = _.template($('#video-template').html());
            var videoHTML = template(firstVideo.video);

            self.$video.html(videoHTML);
        };

        this.initialize = function() {
            var self = this;
            this.fetch();

            this.event.on('success', function() {
                // On success, render video and playlist
                self.renderFirstVideo();
                self.appendListItem();
            });

        };
    };

    
})(jQuery);