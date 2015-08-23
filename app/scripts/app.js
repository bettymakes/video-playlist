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

        this.appendVideoItem = function(){
            var self = this;

            _.forEach(self.data, function(val){
                self.event.trigger('video:added', val);
            });
        };

        this.renderFirstVideo = function(){
            var self = this,
                firstVideo = _.first(self.data);

            var template = _.template($('#player-template').html());
            var playerHTML = template(firstVideo.video);

            self.$video.html(playerHTML);
        };

        this.addVideo = function(data){
            var self = this;
            var video = new app.Video(data);
            video.render();

            self.$playlist.append(video.el);
        };

        this.initialize = function() {
            var self = this;
            this.fetch();

            this.event.on('success', function() {
                // On success, render video and playlist
                self.renderFirstVideo();
                self.appendVideoItem();
            });

            this.event.on('video:added', function(event, data){
                self.addVideo(data);
            });
        };
    };

    
})(jQuery);