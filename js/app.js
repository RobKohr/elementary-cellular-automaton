$(document).ready(function(){
  app.init();
  var buttons = ['start', 'stop', 'reset', 'step'];
  for(var i=0; i<buttons.length; i++){
    var button = buttons[i];
    $('#'+button).click(app[button]);
  }

});

var app = {}
app.init = function(){
  app.iteration_dom = $('#iteration');//so we don't have too look it up each time
  draw.init();
  app.reset();
  $('.loading').hide();
  $('.loaded').show();
};

app.calc = function(left, center, right){
  var key = '';
  key += left ? '1' :'0';
  key += center ? '1' :'0';
  key += right ? '1' :'0';
  var mapping = {
    '111':false,
    '110':false,
    '101':false,
    '100':true,
    '011':true,
    '010':true,
    '001':true,   
    '000':false
  }
  return mapping[key];
}

app.step = function(){
  //the number columns left and right of middle = rows
  var rows = app.data.length;
  app.iteration_dom.html(rows+1);
  //previous row
  var prev = app.data[app.data.length-1];
  //new current row
  cur = {};
  //set current row in data obj
  app.data[app.data.length] = cur;
  for(var c = -rows; c<=rows; c++){
    cur[c] = app.calc(prev[c-1], prev[c], prev[c+1]);
  }
  //  app.console(); // see data in console
  draw.data(app.data); // see data drawn on canvas
}

app.console = function(){
  var rows = app.data.length;
  console.log("=============================");
  console.log("Rows = "+rows+"   ==============");
  console.log("=============================");
  for(var r = 0; r < rows; r++){
    var row_str = '';
    for(var c = -rows; c<=rows; c++){
      if(app.data[r][c]){
        row_str += '1';
      }else{
        row_str += '0';
      }
    }
    console.log(row_str);
  }
}

app.start = function(){
  if(app.interval_id){
    console.log('Ops, seems we already started... don\'t want to do it twice');
    return;
  }
  var interval = 1000;
  app.interval_id = setInterval(app.step, interval);
}

app.stop = function(){
  if(!app.interval_id){
    return;//do nothing
  }
  clearInterval(app.interval_id);
  app.interval_id = null;
}

app.reset = function(){
  app.stop();
  app.iteration_dom.html(0);
  app.interval_id = null;
  // each index in the array is a row that contains an object indexing true cells
  // in the object 0 is the center of the screen, and indexes can be negative an positive
  app.data = [{0:true}]; 
  draw.clear();
}