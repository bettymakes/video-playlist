'use strict';

var app = app || {};

app.Video = function(data){

  this.data;
  this.el;

  this.template = _.template($('#video-item-template').html());

  this.render = function(){
    this.el = this.template(this.data);
  };


  this.initialize = function(data){
    if(!data) return false;

    this.data = data;
  };
  this.initialize(data);
};