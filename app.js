var currentPlayer = true;
var mostRecent;
var playable = [];
var whiteWins = 0;
var blackWins = 0;
var classCheck;
var App = {
  dropPieceWhite: function() {
    $(playable[0]).addClass('white');
    mostRecent = playable[0];
    currentPlayer = !currentPlayer;
    UI.changeTurn();
  }, //end dropPiece
  dropPieceBlack: function() {
    $(playable[0]).addClass('black');
    mostRecent = playable[0];
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
    var leftWin = UI.checkLeft(current);
    var rightWin = UI.checkRight(current);
    var upWin = UI.checkUp(current);
    var downWin = UI.checkDown(current);
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
    for (var i = 1; i < 8; i++) {
      var columns = $('<div id=column' + i + '></div>');
      columns.addClass('column');
      for (var j = 1; j < 7; j++) {
        var rows = $('<div id=column' + i + 'row' + j + '></div>');
        rows.addClass('row');
        if (j > 1 && j < 6) {
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
    App.checkWins(currCol);
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
  checkLeft: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }
    var toCheckLeft = $(mostRecent).attr('id').replace(/\D/g,'').split('');
    var toCheckLeftNum = toCheckLeft.map(Number);
    var startLeft = $('#column' + toCheckLeftNum[0] + 'row' + toCheckLeftNum[1]).hasClass(classCheck);
    var startLeft1 = $('#column' + (toCheckLeftNum[0]-1) + 'row' + toCheckLeftNum[1]).hasClass(classCheck);
    console.log($('#column' + (toCheckLeftNum[0]-1) + 'row' + toCheckLeftNum[1]))
    var startLeft2 = $('#column' + (toCheckLeftNum[0]-2) + 'row' + toCheckLeftNum[1]).hasClass(classCheck);
    var startLeft3 = $('#column' + (toCheckLeftNum[0]-3) + 'row' + toCheckLeftNum[1]).hasClass(classCheck);
    console.log(startLeft);
    console.log(startLeft1);
    console.log(startLeft2);
    console.log(startLeft3);
  }, //end checkLeft
  checkRight: function(thisCol) {

  }, //end checkRight
  checkUp: function(thisCol) {

  }, //end checkUp
  checkDown: function(thisCol) {

  }, //end checkDown
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
