console.log('wut');
$(document).ready(function(){ applyHandlers(); });

var total = 0
var commandHistory = []
var debug = true;
var debugVal;

var applyHandlers = function() {
  debug('applying handlers');

  $('.button.value').on("click", function(e) {
    $target = $(e.target);
    valueString = $target[0].id;
    value = $target.hasClass('float') ? 
      parseFloat(valueString) :
      parseInt(valueString)
      
    addValue(value);
    writeDisplay();
  });

  $('#clear').on("click", function() {
    reset();
    writeDisplay();
  });

  $('#delete').on("click", function() {
    removeLastAddend();
    syncTotal();
    writeDisplay();
  });

  initializeDisplay();

  $('.account-name-container').on("click", function(e) {
    debug('account clicked');
    $target = $(e.target);
    if ($target.parent().hasClass('expanded')) {
      debug("has class 'expanded'")
      collapseAccount($target);
    } else {
      debug("has class 'collapsed'")
      expandAccount($target);
    }
  })

  $('.line-name-container').attr('draggable', true);
  $('.line-name-container').on('dragstart', function(e) {
    e.originalEvent.dataTransfer.setData("text", e.target.id);
  })

  $('#timesheet').on('dragover', function(e) {
    e.preventDefault();
  })
  $('#timesheet').on('drop', function(e) {
    e.preventDefault();
    var data = e.originalEvent.dataTransfer.getData("text");
    e.target.appendChild($('#' + data).clone()[0]);
  })

  $('.resize-handle').on('mousedown', initializeResize);
  writeBoxPercents();
}

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
  $(window).on('mousemove', startResize.bind(null, $(e.target).parent()))
  $(window).on('mouseup', stopResize.bind(null, $(e.target).parent()))
}

var stopResize = function(e) {
  $(window).off('mousemove')
  $(window).off('mouseup')
}

var startResize = function($target, e) {
  debug('$target is ' + $target)
  debugVal = $target;
  debug('e is ' + e)
  $sibling = $target.next();

  targetHeight = $target.height();
  siblingHeight = $sibling.height();
  combinedHeight = targetHeight + siblingHeight;

  newTargetHeight = (e.originalEvent.clientY - $target.offset()['top'])
  $target.css('height', newTargetHeight + 'px');
  
  $sibling.css('height', combinedHeight - newTargetHeight + 'px');
  writeBoxPercents()
}

var writeDisplay = function() {
  $('#display').html(total);
}

var initializeDisplay = function() {
  writeDisplay();
}

var addValue = function(value) {
  debug(value);
  commandHistory.push(value);
  total = total + value;
}

var reset = function() {
  history = [];
  total = 0;
}

function removeLastAddend() {
  commandHistory.pop();
}

var syncTotal = function() {
  total = commandHistory.reduce(function(acc, value) {
    return acc + value
  }, 0)
}

var debug = function(value) {
  if (!debug) return;
  console.log(value);
}


var expandAccount = function($target) {
  debugVal = $target
  debug("expanding account");
  $target.parent().removeClass('collapsed');
  $target.parent().addClass('expanded');
  $target.parent().find('.line-container').children().show();
  $target.show();
}

var collapseAccount = function($target) {
  debugVal = $target
  debug("collapsing account");
  $target.parent().removeClass('expanded');
  $target.parent().addClass('collapsed');
  $target.parent().find('.line-container').children().hide();
  $target.show();
}
