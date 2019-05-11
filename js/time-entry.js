var debug = true;
var debugVal;

var debug = function(value) {
  if (!debug) return;
  console.log(value);
}

// DRAG AND DROP
$(document).ready(function(){

  $('.list-group-item').attr('draggable', true);
  $('.list-group-item').on('dragstart', function(e) {
    debugVal = e.target;
    e.originalEvent.dataTransfer.setData("text", e.target.innerText);
  })

  $('.agenda-block').on('dragenter', function(e) {
    $(this).addClass('bg-primary')
  })
  $('.agenda-block').on('dragexit', function(e) {
    $(this).removeClass('bg-primary')
  })
  $('.agenda-block').on('dragover', function(e) {
    e.preventDefault();
  })

  $('.agenda-block').on('drop', function(e) {
    e.preventDefault();
    var data = e.originalEvent.dataTransfer.getData("text");
    $(e.target).html(data);
  })
});

// RESIZE
