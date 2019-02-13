$('.custom-file-input').change(function(){
  var text = $(this).val();
  var cleaner = text.split("\\").pop();
  var find = $(this).parent().find('.custom-file-label');
  $(find).text(cleaner);
});