 debug = true;
var debugVal;

var debug = function(value) {
  if (!debug) return;
  console.log(value);
}

// DRAG AND DROP
$(document).ready(function(){
  // Be careful because text is always draggable!

});

// RESIZE

$(document).ready(function(){
  $('.drag-handle').on('mousedown', initializeResize);
});

var writeBoxPercents = function() {
  $container = $('#slider-container');
  containerHeight = $container.height();
  $container.children().each(function(index){
    $child = $(this);
    height = $child.height();
    $child.find('.box-label').html(parseInt(100 * height / containerHeight));
  })
}

var initializeResize = function(e) {
  debug("resizing!")
  $(window).on('mousemove', startResize.bind(null, $(e.target).parent().parent()))
  $(window).on('mouseup', stopResize.bind(null, $(e.target).parent().parent()))
}

var stopResize = function(e) {
  $(window).off('mousemove')
  $(window).off('mouseup')
}

var startResize = function($target, e) {
  $sibling = $target.parent().next();
  debugVal = $target;

  targetHeight = $target.outerHeight();
  siblingSnapTarget = $sibling.offset()['top'] + $sibling.outerHeight();
  siblingSnapBoundary = siblingSnapTarget - ( $sibling.outerHeight() * 0.15 );
  //siblingHeight = $sibling.height();
  //combinedHeight = targetHeight + siblingHeight;
  
  if (e.originalEvent.clientY >= siblingSnapBoundary) {
    debug('boundary crossed!')
    newHeight = siblingSnapBoundary - $target.parent().offset()['top'];
    $target.css('height', newHeight + 'px');
  }

  //newTargetHeight = (e.originalEvent.clientY - $target.offset()['top'])
  //$target.css('height', newTargetHeight + 'px');
  
  //$sibling.css('height', combinedHeight - newTargetHeight + 'px');
  //writeBoxPercents()
}

var writeDisplay = function() {
  $('#display').html(total);
}

var initializeDisplay = function() {
  writeDisplay();
}
