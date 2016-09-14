var currentPlayer = true;
var playable = [];
var whiteWins = 0;
var blackWins = 0;
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
  }, //end isPlayable
  checkWins: function(current) {
    var areThereWins;
    var leftWin = UI.checkLeft();
    var rightWin = UI.checkRight();
    var upWin = UI.checkUp();
    var downWin = UI.checkDown();
    if (leftWin === true || rightWin  === true || upWin === true || downWin  === true) {
      UI.winner(!currentPlayer);
    } //end if
  }, //end checkWins
  overall: function() {
    var total = $('#board').children();
    return total;
  }
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
    $('#turn').removeClass('turnBlack turnWhite');
    $('#turn').text('White');
    currentPlayer = true;
  }, //end clearBoard
  playGame: function() {
    var thisRows = $(this).find('.row');
    var currCol = this;
    App.isPlayable(thisRows);
    // console.log(playable);
    // console.log(playable.length);
    if (playable.length > 0 && currentPlayer === true) {
      App.dropPieceWhite();
    } else if (playable.length > 0 && currentPlayer === false) {
      App.dropPieceBlack();
    } //end else if
    App.checkWins();
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
    } //end else if
  }, //end changeTurn
  buildUI: function() {
    $('#scoreWhite').text(whiteWins);
    $('#scoreBlack').text(blackWins);
    $('#turn').addClass('turnWhite');
    $('#turn').text('White');
  }, //end buildUI
  checkLeft: function() {
    var winArray = [];
    var colCheck = App.overall();
    for (var z = 0; z < colCheck.length; z++) {
      var rowCheck = $(colCheck[z]).children();
      for (var y = 0; y < rowCheck.length; y++) {
        if
      } //end interior for
    } //end exterior for
  }, //end leftWin
  checkRight: function() {

  }, //end rightWin
  checkUp: function() {

  }, //end upWin
  checkDown: function() {

  }, //end downWin
  winner: function(winner) {
    var winnerActual;
    if (winner === true) {
      winnerActual = 'White';
      whiteWins++;
    } else if (winner === false) {
      winnerActual = 'Black';
      blackWins++;
    } //end if
    alert(winnerActual + " has won the game!!");
  } //end winner
} //end UI


window.onload = function() {
  UI.createColumns();
  UI.buildUI();
  $('.column').on('click', UI.playGame);
  $('#reset').on('click', UI.clearBoard);
}
