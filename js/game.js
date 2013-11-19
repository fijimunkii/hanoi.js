$(function() {

  // Make the towers
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

  // Make the discs
  for (var i=10; i>0; i--) {
    var $disc = $('<div>');
    $disc.addClass('disc');
    $disc.addClass('disc' + i);
    $disc.attr('id', i);
    var numDiscs = $left[0].children.length;
    $disc.attr('style', 'bottom:' + numDiscs*20 + 'px;');
    $left.append($disc);
  }


  // Init tower droppable ability
  $('.tower').droppable({
    drop: function(ev, ui) {
      $(ev['target']).removeClass('tower-focus');

      var numDiscs = ev['target'].children.length,
          height = 0;
          console.log(numDiscs);
      if (numDiscs) {
        height = (numDiscs*20) + 'px';
      }
      $(ui.draggable).detach().css({top: '', bottom: height, left: '0%'}).appendTo(this);
    },
    over: function(ev, ui) {
      $(ev['target']).addClass('tower-focus');
    },
    out: function(ev, ui) {
      $(ev['target']).removeClass('tower-focus');
    },
    tolerance: 'touch'
  });

  // Init disc draggable ability
  $(".disc").draggable({
      start: function(event, ui) {
        startPos = ui.helper.position();
        console.log(startPos);
        $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left + 88);
        $(ui.helper).css("left", '');
        $(ui.helper).css("right", '');
      },
      stop: function(event, ui) {
        $(ui.helper).css("margin-left", "");
        $(ui.helper).css("left", '0%');
        $(ui.helper).css("right", '0%');
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

    var $towers = $('.tower');
    for (var i=0; i< $towers.length; i++) {
      if ($towers[i].children) {

        var towerChildren = $towers[i].children,
            childrenSize = [];

        for (var c=0; c<towerChildren.length; c++) {
          var $child = $(towerChildren[c]),
              childWeight = $child.attr('id');
          childrenSize.push(childWeight);
        }

        childrenSize.sort(function(a,b){return a-b});
        $('#' + childrenSize[0]).draggable('enable');
      }
    }
  }

  // Disable towers with a smaller disc than the one being held
  $('body').on('mousedown', '.disc', function() {
    var discSize = $(this).attr('id'),
        $towers = $('.tower');

    for (var i=0; i< $towers.length; i++) {
      if ($towers[i].children) {
        var towerChildren = $towers[i].children,
            childrenSize = [];

        for (var c=0; c<towerChildren.length; c++) {
          var $child = $(towerChildren[c]),
              childWeight = $child.attr('id');
          childrenSize.push(childWeight);
        }

        childrenSize.sort(function(a,b){return b-a});

        var towerCapacity = childrenSize[0];
        if (parseInt(towerCapacity) < parseInt(discSize)) {
          console.log("disabling " + i);
          $($towers[i]).droppable('disable');
        }
      }
    }
  });

  // enable all towers droppable on mouseup
  $('body').on('mouseup', function(e) {
    setTimeout(function() {
      var $towers = $('.tower');
      for (var i=0; i<$towers.length; i++) {
        $($towers[i]).droppable('enable');
      }
    }, 100);
  });

  // Hammertime
  setInterval(function() {
    onlyEnableTopDiscs();
  }, 50);

});
