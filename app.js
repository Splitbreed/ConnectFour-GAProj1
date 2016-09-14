var currentPlayer = true;
var playable = [];
var App = {
  dropPieceWhite: function() {
    $(playable[0]).addClass('white');
    currentPlayer = !currentPlayer;
    UI.changeTurn();
  }, //end dropPiece
  dropPieceBlack: function() {
    $(playable[0]).addClass('black');
    currentPlayer = !currentPlayer;
    UI.changeTurn();
  }, //end dropPieceBlack
  isPlayable: function(whichCol) {
    playable = [];
    for (var k = 5; k >= 0; k--) {
      // console.log(playable);
      // console.log(whichCol);
      var isBlack = $(whichCol[k]).hasClass('black');
      // console.log(isBlack);
      var isWhite = $(whichCol[k]).hasClass('white')
      // console.log(isWhite);
      if (isBlack === true || isWhite === true) {
        if (playable.length === 0 && k === 0){
          alert("That column is full, and cannot be played");
        }
      } else {
        playable.push(whichCol[k]);
      } //end else
    } //end for
    return playable;
  } //end isPlayable
} //end App
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
  }, //endCreateColumns
  clearBoard: function() {
    $('.row').removeClass('black white');
  }, //end clearBoard
  playGame: function() {
    var thisRows = $(this).find('.row');
    App.isPlayable(thisRows);
    // console.log(playable);
    // console.log(playable.length);
    if (playable.length > 0 && currentPlayer === true) {
      App.dropPieceWhite();
    } else if (playable.length > 0 && currentPlayer === false) {
      App.dropPieceBlack();
    } //end else if
  }, //end playGame
  changeTurn: function() {
    if (currentPlayer === true) {
      $('#turn').text('White');
      $('#turn').removeClass('turnBlack');
      $('#turn').addClass('turnWhite');
    } else if (currentPlayer ===false) {
      $('#turn').text('Black');
      $('#turn').removeClass('turnWhite');
      $('#turn').addClass('turnBlack');
    }
  }
} //endUI


window.onload = function() {
  UI.createColumns();
  $('.column').on('click', UI.playGame);
  $('#reset').on('click', UI.clearBoard);
}
