var currentPlayer = true;
var App = {
  dropPiece: function() {
    var thisRows = $(this).find('.row');
    for (var k = 6; k >= 0; k--) {
      var isBlack = $(thisRows[k]).hasClass('black');
      var isWhite = $(thisRows[k]).hasClass('white')
      if (isBlack === true || isWhite === true) {
        alert('Cannot be played');
        break;
      } else {
        if (currentPlayer === true) {
          $(thisRows[k]).addClass('white');
          currentPlayer = !currentPlayer;
        } else if (currentPlayer === false){
          $(thisRows[k]).addClass('black');
          currentPlayer = !currentPlayer;
          return;
        }
      }
    }
  } //end dropPiece
}
var UI = {
  createColumns: function() {
    for (var i = 0; i < 7; i++) {
      var columns = $('<div>');
      columns.addClass('column');
      if(i > 0 && i < 6){
        columns.addClass('centralColumn')
      }
      for (var j = 0; j < 6; j++) {
        var rows = $('<div>');
        rows.addClass('row');
        if (j > 0 && j < 5) {
          rows.addClass('centralRow');
        }
        columns.append(rows);
      }
      $('#board').append(columns);
    } //endFor
  } //endCreateColumns
} //endUI


window.onload = function() {
  UI.createColumns();
  $('.column').on('click', App.dropPiece)
}
