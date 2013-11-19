$(function() {

  var $left = $('<div>');
  $left.addClass('left');
  $left.addClass('tower');
  $('#game-container').append($left);

  var $middle = $('<div>');
  $middle.addClass('middle');
  $middle.addClass('tower');
  $('#game-container').append($middle);

  var $right = $('<div>');
  $right.addClass('right');
  $right.addClass('tower');
  $('#game-container').append($right);



  for (var i=10; i>0; i--) {
    var $disc = $('<div>');
    $disc.addClass('disc');
    $disc.addClass('disc' + i);
    $disc.attr('id', i);
    var numDiscs = $left[0].children.length;
    $disc.attr('style', 'bottom:' + numDiscs*20 + 'px;');
    $left.append($disc);
  }


  $('.tower').droppable({
    drop: function(ev, ui) {
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
    }
  });


  $(".disc").draggable({
      revert : function(event, ui) {

          console.log(event);

          $(this).data("uiDraggable").originalPosition = {
              top : 0,
              left : 0
          };

          return !event;
      }
  });


});
