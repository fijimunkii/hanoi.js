$(function() {

  // Make the towers
  var $gameContainer = $('#game-container'),

  $left = $('<div>')
    .addClass('left')
    .addClass('tower')
    .appendTo($gameContainer),

  $middle = $('<div>')
    .addClass('middle')
    .addClass('tower')
    .appendTo($gameContainer),

  $right = $('<div>')
    .addClass('right')
    .addClass('tower')
    .appendTo($gameContainer);

  // Make the discs
  for (var i=10; i>0; i--) {
    var numDiscs = $left[0].children.length;
    $('<div>')
      .addClass('disc')
      .addClass('disc' + i)
      .attr('id', i);
      .attr('style', 'bottom:' + numDiscs*20 + 'px;')
      .appendTo($left);
  }


  // Tower droppable ability
  $('.tower').droppable({
    drop: function(ev, ui) {
      $(ev['target']).removeClass('tower-focus');
      var numDiscs = ev['target'].children.length,
          height = 0;
          console.log(numDiscs);

      if (ev.target == window.pickupContainer) numDiscs -= 1;
      if (numDiscs) height = (numDiscs*20) + 'px';

      $(ui.draggable).detach()
        .css({top: '', bottom: height, left: '0%'})
        .appendTo(this);
    },
    over: function(ev, ui) {
      $(ev['target']).addClass('tower-focus');
    },
    out: function(ev, ui) {
      $(ev['target']).removeClass('tower-focus');
    },
    tolerance: 'touch'
  });

  // Disc draggable ability
  $('.disc').draggable({
      start: function(event, ui) {
        startPos = ui.helper.position();
        console.log('start-position', startPos);
        $(ui.helper).css('margin-left',
          event.clientX - $(event.target).offset().left + 88);
        $(ui.helper).css('left', '');
        $(ui.helper).css('right', '');
      },
      stop: function(event, ui) {
        $(ui.helper).css('margin-left', '');
        $(ui.helper).css('left', '0%');
        $(ui.helper).css('right', '0%');
      },
      revert: function(event, ui) {
        $(this).data('uiDraggable')
          .originalPosition = {
            top : startPos.top,
            left: 0
          };
        return !event;
      }
  });


  // ensures that only the top disc is picked up
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

  // ensures larger discs cannot be placed on top of their smaller bros
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
          $($towers[i]).droppable('disable');
        }
      }
    }
  });

  // enables all towers droppable on mouseup
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

  // lock scroll position
  var scrollPosition = [
    self.pageXOffset
      || document.documentElement.scrollLeft
      || document.body.scrollLeft,
    self.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
  ];

  $('html')
    .data('scroll-position', scrollPosition);
    .data('previous-overflow', html.css('overflow'))
    .css('overflow', 'hidden');

  window.scrollTo(scrollPosition[0], scrollPosition[1]);

});
