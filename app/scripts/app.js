'use strict';
var app = app || {};

(function($) {

    app.App = function(){
        this.url = "../data/playlist.json";
        this.$video = $('#video-container');
        this.$playlist = $('#playlist');

        this.data = false;
        
        this.fetch = function(){
            var self = this;

            $.ajax({
                url: self.url,
                success: function(data) {
                    self.data = data.videos;
                    self.appendListItem();
                    self.renderFirstVideo();
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
    };

    
})(jQuery);