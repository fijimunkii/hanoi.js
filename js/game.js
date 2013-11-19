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
      var numDiscs = this.children.length,
          height = 0;
      console.log(this);
      if (numDiscs) {
        height = numDiscs*20 + 'px';
      }
      $(ui.draggable).detach().css({bottom: height, left: '0%'}).appendTo(this);

    }
  });


  $(".disc").draggable({
      revert : function(event, ui) {
          $(this).data("uiDraggable").originalPosition = {
              bottom : 0,
              left: 0
          };
          return !event;
      }
  });

  $('body').on('mousedown', '.disc', function() {
    var discSize = $(this).attr('id'),
        towers = $('.tower');

    console.log('picked up a ' + discSize);

    for (var i=0; i< towers.length; i++) {
      if (towers[i].children) {
        var towerChildren = towers[i].children.length,
            towerCapacity = $(towers[i].children[towerChildren-1]).attr('id');

        console.log("tower " + i + " -- " + towerCapacity );
        if (parseInt(towerCapacity) < parseInt(discSize)) {
          $(towers[i]).droppable('disable');
        }
      }
    }
  });

  $('body').on('mouseup', '.disc', function() {
    setTimeout(function() {
      var towers = $('.tower');
      for (var i=0; i<towers.length; i++) {
        $(towers[i]).droppable('enable');
      }
    }, 100);
  });

});
