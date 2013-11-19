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
      start : function(event, ui) {
        startPos = ui.helper.position();
        console.log(startPos);
      },
      revert: function(event, ui) {
          $(this).data("uiDraggable").originalPosition = {
              top : startPos.top,
              left: 0
          };
          return !event;
      }
  });

  function onlyEnableTopDiscs() {

    var $discs = $('.disc');
        for (var i=0; i<$discs.length; i++) {
          $($discs[i]).draggable('disable');
    }

    var leftLength = $('.left')[0].children.length - 1,
        topLeft = $('.left')[0].children[leftLength];
    $(topLeft).draggable('enable');

    var middleLength = $('.middle')[0].children.length - 1,
        topMiddle = $('.middle')[0].children[middleLength];
    $(topMiddle).draggable('enable');

    var rightLength = $('.right')[0].children.length - 1,
        topRight = $('.right')[0].children[0];
    $(topRight).draggable('enable');

  }

  onlyEnableTopDiscs();


  $('body').on('mousedown', '.disc', function() {
    var discSize = $(this).attr('id'),
        $towers = $('.tower');

    for (var i=0; i< $towers.length; i++) {
      if ($towers[i].children) {
        var towerChildren = $towers[i].children.length,
            towerCapacity = $($towers[i].children[towerChildren-1]).attr('id');

        console.log("tower " + i + " -- " + towerCapacity );
        if (parseInt(towerCapacity) < parseInt(discSize)) {
          $($towers[i]).droppable('disable');
        }
      }
    }
  });

  $('body').on('mouseup', '.disc', function() {
    setTimeout(function() {

      var $towers = $('.tower');
      for (var i=0; i<$towers.length; i++) {
        $($towers[i]).droppable('enable');
      }

      onlyEnableTopDiscs();

    }, 200);
  });

});
