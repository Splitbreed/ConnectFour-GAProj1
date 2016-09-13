var App = {

}
var UI = {
  createColumns: function() {
    for (var i = 0; i < 7; i++) {
      var columns = $('<div>');
      columns.addClass('column');
      for (var j = 0; j < 6; j++) {
        var rows = $('<div>');
        rows.addClass('row');
        if (j > 0 && j < 5) {
          rows.attr('id', 'central');
        }
        columns.append(rows);
      }
      $('#board').append(columns);
    } //endFor
  } //endCreateColumns
} //endUI


window.onload = function() {

}
