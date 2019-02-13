$('.video iframe').each(function() {
  console.log("excuted");
  var videoW = $(this).width();
  var videoH = (videoW / 4) * 2.5;
  $(this).css('height', videoH);
});