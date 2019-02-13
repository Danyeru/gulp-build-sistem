function boostrapSliderCarousel() {
  var handler = $(".multiple-slide-elements");
  var xs = 426;
  var sm = 768;
  var md = 992;
  var lg = 1200;
  var w = window.innerWidth;
  // function mainMatrix() {
  $(handler).each(function() {
    // console.log("parentStructure" + parentStructure(this));
    // console.log("childStructure" + childStructure(this));
    if (lg < w) {
      // console.log("number of children" + childLength(this));
      //console.log("number of columns " + numberOfColumns(this, "lg")[1]);
      // console.log("blocks" +divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[2]));
      //console.log(columnAsigner(numberOfColumns(this, "lg")[1]));
      // console.log("divide" + divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[1]))
      // console.log("ejecucion del handler");
      constructor(
        /*primer parametro - size*/
        columnAsigner(numberOfColumns(this, "lg")[1]),
        /*segundo parametro - current*/
        this,
        /*tercer parametro - slides*/
        divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[1]),
        /*cuarto parametro - blocks*/
        divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[2]),
        /*quinto parametro - columns*/
        numberOfColumns(this, "lg")[1],
        /*sexto parametro - columnsslides*/
        numberOfColumns(this, "lg")[2],
        /*sexto parametro - parent structure*/
        parentStructure(this),
        /*septimo parametro - child structure*/
        childStructure(this));
    } else if (lg >= w && md < w) {
      constructor(columnAsigner(numberOfColumns(this, "lg")[1]), this, divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[1]), divideChildsIntoColumns(childLength(this), numberOfColumns(this, "lg")[2]), numberOfColumns(this, "lg")[1], numberOfColumns(this, "lg")[2], parentStructure(this), childStructure(this));
    } else if (md >= w && sm < w) {
      constructor(columnAsigner(numberOfColumns(this, "md")[1]), this, divideChildsIntoColumns(childLength(this), numberOfColumns(this, "md")[1]), divideChildsIntoColumns(childLength(this), numberOfColumns(this, "md")[2]), numberOfColumns(this, "md")[1], numberOfColumns(this, "md")[2], parentStructure(this), childStructure(this));
    } else if (sm >= w && xs < w) {
      constructor(columnAsigner(numberOfColumns(this, "sm")[1]), this, divideChildsIntoColumns(childLength(this), numberOfColumns(this, "sm")[1]), divideChildsIntoColumns(childLength(this), numberOfColumns(this, "sm")[2]), numberOfColumns(this, "sm")[1], numberOfColumns(this, "sm")[2], parentStructure(this), childStructure(this));
    } else if (xs >= w) {
      constructor(columnAsigner(numberOfColumns(this, "xs")[1]), this, divideChildsIntoColumns(childLength(this), numberOfColumns(this, "xs")[1]), divideChildsIntoColumns(childLength(this), numberOfColumns(this, "xs")[2]), numberOfColumns(this, "xs")[1], numberOfColumns(this, "xs")[2], parentStructure(this), childStructure(this));
    }
  });

  function parentStructure(element) {
    var wrap;
    $(element).find('.sub-item').each(function() {
      if ($(this).hasClass("active") == false && $(this).parent().hasClass("active") == false) {
        if ($(this).hasClass("carousel-item") == true) {
          var childClass = $(this).attr("class");
          wrap = '<div class="' + childClass + '"></div>';
        } else {
          var childClass = $(this).attr("class");
          var parentClass = $(this).parent().attr("class");
          wrap = '<div class="' + parentClass + '"><div class="' + childClass + '"></div></div>';
        }
      }
    });
    return wrap;
  }

  function childStructure(element) {
    var childStruct = [];
    $(element).find('.sub-item').children().each(function() {
      var child = $(this).html();
      childStruct.push(child);
    });
    return childStruct;
  }

  function divideChildsIntoColumns(children, columns) {
    var divide = Math.ceil(parseInt(children) / parseInt(columns));
    return divide;
  }

  function numberOfColumns(current, size) {
    var dataElements = $(current).data("elements");
    var indSizes = dataElements.split(" ");
    var finder = indSizes.filter((indSize) => indSize.startsWith(size));
    var stringer = finder.toString();
    var spliter = stringer.split("-");
    return spliter;
  }

  function childLength(current) {
    var child = $(current).find('.sub-item').children().length;
    return child;
  }

  function columnAsigner(element) {
    var boosCol = 12 / element;
    return ("col-" + boosCol);
  }

  function constructor(size, current, slides, blocks, columns, columnsSlides, parentStructure, childstructure) {
    $(current).find(".carousel-inner").html("");
    var x = 0;
    var y = 0;
    console.log(blocks)
    if (isNaN(blocks)) {
      console.log("got inside");
      for (var i = slides - 1; i >= 0; i--) {
        
        var parent = $(current).find(".carousel-inner");
        $(parent).append(parentStructure);
        var child = $(parent).find(".sub-item");
        if (x == 0) {
          $(child).parent().addClass("active")
          x++
        }
        for (var j = columns - 1; j >= 0; j--) {
          if (childstructure[y] != null) {
            $(child).last().append("<div class=" + size + ">" + childstructure[y] + "</div>");
            y++
          }
        }
      }
      sliderIndicatorsConstructor(current, slides);
    } else {
      for (var i = blocks - 1; i >= 0; i--) {
        var parent = $(current).find(".carousel-inner");
        $(parent).append(parentStructure);
        var child = $(parent).find(".sub-item");
        if (x == 0) {
          $(child).parent().addClass("active")
          x++
        }
        for (var j = columnsSlides - 1; j >= 0; j--) {
          if (childstructure[y] != null) {
            $(child).last().append("<div class=" + size + ">" + childstructure[y] + "</div>");
            y++
          }
        }
      }
      sliderIndicatorsConstructor(current, blocks);
    }
  }

  function sliderIndicatorsConstructor(current, slides) {
    if ($(current).find('.carousel-indicators').length == 1) {
      var attrib = $(current).find('.carousel-indicators').children().first();
      var arrs = [];
      $(attrib).each(function() {
        $.each(this.attributes, function(i, a) {
          arrs.push(a.name + '="' + a.value + '"');
        });
      });
      $(current).find('.carousel-indicators').html("");
      var paramConstructor = arrs.toString().replace(/,/g, " ");
      var paramConstructorClassCleaner = paramConstructor.replace(/active/g, '');
      for (var i = sliderCounter(current) - 1; i >= 0; i--) {
        var paramConstructorSlideAdjust = paramConstructorClassCleaner.replace(/data-slide-to="0"/g, 'data-slide-to="' + [i] + '" ')
        var indicatorStructure = ("<li " + paramConstructorSlideAdjust + "></li>");
        $(current).find('.carousel-indicators').prepend(indicatorStructure)
      }
      $(current).find('.carousel-indicators').children().first().addClass("active");
    }
  }

  function sliderCounter(current) {
    var slides = $(current).find('.carousel-inner').children().length;
    return slides;
  }
};
boostrapSliderCarousel();
var resizeTimer;
$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    console.log("risize");
    boostrapSliderCarousel();
  }, 250);
});

