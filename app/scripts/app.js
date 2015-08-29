'use strict';
var app = app || {};
(function($) {

    app.App = function(){
        this.url = "../data/playlist.json";
        this.$video = $('#video-container');
        this.$playlist = $('#playlist');

        this.event = $({});

        this.data = false;

        this.videoCollection = [];
        
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


        this.renderVideo = function(video){
            var self = this,
                video = video.data.video,
                template = _.template($('#player-template').html()),
                playerHTML = template(video);

            self.$video.html(playerHTML);
        };

        this.addVideo = function(data){
            var self = this,
                video = new app.Video(data);

            this.videoCollection.push(video);

            video.render();

            self.$playlist.append(video.el);
        };

        this.initialize = function() {
            var self = this;
            this.fetch();

            this.event.on('success', function() {
                // On success, render video and playlist
                self.appendVideoItem();
                self.renderVideo(self.videoCollection[0]);
           
            });

            this.event.on('video:added', function(event, data){
                self.addVideo(data);
            });

            this.event.on('player:loadVideo', function(event, video){
                self.renderVideo(video);
            });

        };
    };

    
})(jQuery);