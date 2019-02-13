$(".custom-range").on("input", function(e) {
  var label = $("label[for='" + $(this).attr('id') + "']");
  console.log(label)
  $(label).find(".output").text( $(e.target).val() )
});