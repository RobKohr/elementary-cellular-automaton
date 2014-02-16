$(document).ready(function(){
  app.init();
  var buttons = ['start', 'stop', 'reset'];
  for(var i=0; i<buttons.length; i++){
    var button = buttons[i];
    $('#'+button).click(app[button]);
  }

});

var app = {}
app.init = function(){
  app.reset();
  draw.init();
};

app.step = function(){
  
}

app.start = function(){

}

app.stop = function(){

}

app.reset = function(){
  app.interval_id = null;
  // each index in the array is a row that contains an object indexing true cells
  // in the object 0 is the center of the screen, and indexes can be negative an positive
  app.data = [{0:true}]; 
  app.row_count = 1;
}