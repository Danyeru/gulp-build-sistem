if ($("#ippConvenios").length != 0) {
  var initial_items = 6;
  var next_items = 3;
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    originTop: true,
    originLeft: true
  });
  $('.filter button').click(function() {
    $('.filter button').removeClass("current");
    $(this).addClass("current");
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
    updateFilterCounts();
  });

  function updateFilterCounts() {
    // get filtered item elements
    var itemElems = $grid.isotope('getFilteredItemElements');
    var count_items = $(itemElems).length;
    if (count_items > initial_items) {
      $('.append-button').show();
    } else {
      $('.append-button').hide();
    }
    if ($('.grid-item').hasClass('visible_item')) {
      $('.grid-item').removeClass('visible_item');
    }
    var index = 0;
    $(itemElems).each(function() {
      if (index >= initial_items) {
        $(this).addClass('visible_item');
      }
      index++;
    });
    $grid.isotope('layout');
  }
  //function that shows the specific amount of items
  function showNextItems(pagination) {
    var itemsMax = $('.visible_item').length;
    console.log('itemsMax', itemsMax);
    var itemsCount = 0;
    $('.visible_item').each(function() {
      if (itemsCount < pagination) {
        $(this).removeClass('visible_item');
        itemsCount++;
      }
    });
    if (itemsCount >= itemsMax) {
      $('.append-button').hide();
    }
    $grid.isotope('layout');
  }
  // function that hides items when page is loaded
  function hideItems(pagination) {
    var itemsMax = $('.grid-item').length;
    var itemsCount = 0;
    $('.grid-item').each(function() {
      if (itemsCount >= pagination) {
        $(this).addClass('visible_item');
      }
      itemsCount++;
    });
    if (itemsCount < itemsMax || initial_items >= itemsMax) {
      $('.append-button').hide();
    }
    $grid.isotope('layout');
  }
  $('.load-more').on('click', function(e) {
    e.preventDefault();
    showNextItems(next_items);
  });
  hideItems(initial_items);
}