var draw = {};
draw.init = function(){
  draw.fullscreen();
  $(window).resize(draw.fullscreen);
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.strokeStyle = "blue";
  draw.ctx = ctx;
  
};

draw.clear = function(){
  draw.ctx.clearRect(0,0,draw.width, draw.height);
}


//have the canvas take over the screen
draw.fullscreen = function(){
  var width = draw.width = $(window).width();
  var height = draw.height = $(window).height();
  draw.min_dimension = draw.width; //used to calc square size
  if(draw.height < draw.width){
    draw.min_dimension = draw.height;
  }
  $('#canvas').attr('width', width);
  $('#canvas').attr('height', height);
}

draw.data = function(data){
  draw.clear();
  var columns = data.length*2 + 1;
  var rows = data.length;
  var square_width = (draw.width)/columns;
  var square_height = (draw.height)/rows;
  //square size should be the min of the two
  var square_size = square_width < square_height ? square_width : square_height;
  var rows = data.length;
  start_top = start_left = 0;
  for(var r = 0; r < rows; r++){
    var row_str = '';
    for(var c = -rows; c<=rows; c++){
      //make it so lowest negative number is x=0
      var c_fix = c+rows;
      var x = start_left + (c_fix * square_size);
      var y = start_top + (r * square_size);
      if(app.data[r][c]){
        draw.ctx.fillRect(x, y, square_size-1, square_size-1);
      }      
    }
  }




}