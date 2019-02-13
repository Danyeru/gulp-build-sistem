  $('a[href="#programs"], a[href="#benefits"], a[href="#advantages"], a[href="#formularie"]').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top - 0;
        $('html,body').animate({
          scrollTop: targetOffset
        }, 1000);
        return false;
      }
    }
  });