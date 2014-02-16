var draw = {};
draw.init = function(){
  draw.fullscreen();
  $(window).resize(draw.fullscreen);
};

//have the canvas take over the screen
draw.fullscreen = function(){
  var width = $(window).width();
  var height = $(window).height();
  $('#canvas').attr('width', width);
  $('#canvas').attr('height', height);
}