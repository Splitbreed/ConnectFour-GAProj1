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
  }, //end dropPieceWhite

  dropPieceBlack: function() {
    $(playable[0]).addClass('black');
    mostRecent = playable[0];
    currentPlayer = !currentPlayer;
    UI.changeTurn();
  }, //end dropPieceBlack

  isPlayable: function(whichCol) {
    playable = [];
    for (var k = 5; k >= 0; k--) {
      var isBlack = $(whichCol[k]).hasClass('black');
      var isWhite = $(whichCol[k]).hasClass('white')
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
    var downWin = UI.checkDown(current);
    var downRightWin = UI.checkDownRight(current);
    var downLeftWin = UI.checkDownLeft(current);
    var upRightWin = UI.checkUpRight(current);
    var upLeftWin = UI.checkUpLeft(current);
    if (leftWin === true || rightWin  === true || downWin  === true || downRightWin === true || downLeftWin === true || upLeftWin === true || upRightWin === true) {
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
    $('.column').off()
    $('#winnerSpan').css('display', 'none');
    $('.column').on('click', UI.playGame);
  }, //end clearBoard

  playGame: function() {
    var thisRows = $(this).find('.row');
    var currCol = this;
    App.isPlayable(thisRows);
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
    var startLeft2 = $('#column' + (toCheckLeftNum[0]-2) + 'row' + toCheckLeftNum[1]).hasClass(classCheck);
    var startLeft3 = $('#column' + (toCheckLeftNum[0]-3) + 'row' + toCheckLeftNum[1]).hasClass(classCheck);

    if (startLeft1 === true && startLeft === true && startLeft2 === true && startLeft3 === true) {
      return true;
    }
  }, //end checkLeft

  checkRight: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckRight = $(mostRecent).attr('id').replace(/\D/g,'').split('');
    var toCheckRightNum = toCheckRight.map(Number);
    var startRight = $('#column' + toCheckRightNum[0] + 'row' + toCheckRightNum[1]).hasClass(classCheck);
    var startRight1 = $('#column' + (toCheckRightNum[0]+1) + 'row' + toCheckRightNum[1]).hasClass(classCheck);
    var startRight2 = $('#column' + (toCheckRightNum[0]+2) + 'row' + toCheckRightNum[1]).hasClass(classCheck);
    var startRight3 = $('#column' + (toCheckRightNum[0]+3) + 'row' + toCheckRightNum[1]).hasClass(classCheck);
    var horzCheck = $('#column' + (toCheckRightNum[0]-1) + 'row' + toCheckRightNum[1]).hasClass(classCheck);
    var horzCheck2 = $('#column' + (toCheckRightNum[0]-2) + 'row' + toCheckRightNum[1]).hasClass(classCheck);

    if (startRight1 === true && startRight === true && startRight2 === true && startRight3 === true) {
      return true;
    } else if (startRight === true && horzCheck === true && startRight1 === true && startRight2 === true) {
      return true;
    } else if (startRight === true && startRight1 === true && horzCheck === true && horzCheck2 === true) {
      return true;
    }
  }, //end checkRight

  checkDown: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckDown = $(mostRecent).attr('id').replace(/\D/g,'').split('');
    var toCheckDownNum = toCheckDown.map(Number);
    var startDown = $('#column' + toCheckDownNum[0] + 'row' + toCheckDownNum[1]).hasClass(classCheck);
    var startDown1 = $('#column' + (toCheckDownNum[0]) + 'row' + (toCheckDownNum[1]+1)).hasClass(classCheck);
    var startDown2 = $('#column' + (toCheckDownNum[0]) + 'row' + (toCheckDownNum[1]+2)).hasClass(classCheck);
    var startDown3 = $('#column' + (toCheckDownNum[0]) + 'row' + (toCheckDownNum[1]+3)).hasClass(classCheck);

    if (startDown1 === true && startDown === true && startDown2 === true && startDown3 === true) {
      return true;
    }
  }, //end checkDown

  checkDownRight: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckDownRight = $(mostRecent).attr('id').replace(/\D/g,'').split('');
    var toCheckDownRightNum = toCheckDownRight.map(Number);
    var startDownRight = $('#column' + toCheckDownRightNum[0] + 'row' + toCheckDownRightNum[1]).hasClass(classCheck);
    var startDownRight1 = $('#column' + (toCheckDownRightNum[0]+1) + 'row' + (toCheckDownRightNum[1]+1)).hasClass(classCheck);
    var startDownRight2 = $('#column' + (toCheckDownRightNum[0]+2) + 'row' + (toCheckDownRightNum[1]+2)).hasClass(classCheck);
    var startDownRight3 = $('#column' + (toCheckDownRightNum[0]+3) + 'row' + (toCheckDownRightNum[1]+3)).hasClass(classCheck);

    if (startDownRight1 === true && startDownRight === true && startDownRight2 === true && startDownRight3 === true) {
      return true;
    }
  }, //end checkDownRight

  checkDownLeft: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckDownLeft = $(mostRecent).attr('id').replace(/\D/g,'').split('');
    var toCheckDownLeftNum = toCheckDownLeft.map(Number);
    var startDownLeft = $('#column' + toCheckDownLeftNum[0] + 'row' + toCheckDownLeftNum[1]).hasClass(classCheck);
    var startDownLeft1 = $('#column' + (toCheckDownLeftNum[0]-1) + 'row' + (toCheckDownLeftNum[1]+1)).hasClass(classCheck);
    var startDownLeft2 = $('#column' + (toCheckDownLeftNum[0]-2) + 'row' + (toCheckDownLeftNum[1]+2)).hasClass(classCheck);
    var startDownLeft3 = $('#column' + (toCheckDownLeftNum[0]-3) + 'row' + (toCheckDownLeftNum[1]+3)).hasClass(classCheck);

    if (startDownLeft1 === true && startDownLeft === true && startDownLeft2 === true && startDownLeft3 === true) {
      return true;
    }
  }, //end checkDownLeft

  checkUpRight: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckUpRight = $(mostRecent).attr('id').replace(/\D/g,'').split('');

    var toCheckUpRightNum = toCheckUpRight.map(Number);

    var startUpRight = $('#column' + toCheckUpRightNum[0] + 'row' + toCheckUpRightNum[1]).hasClass(classCheck);

    var startUpRight1 = $('#column' + (toCheckUpRightNum[0]+1) + 'row' + (toCheckUpRightNum[1]-1)).hasClass(classCheck);

    var startUpRight2 = $('#column' + (toCheckUpRightNum[0]+2) + 'row' + (toCheckUpRightNum[1]-2)).hasClass(classCheck);

    var startUpRight3 = $('#column' + (toCheckUpRightNum[0]+3) + 'row' + (toCheckUpRightNum[1]-3)).hasClass(classCheck);

    var centCheckRight = $('#column' + (toCheckUpRightNum[0]-1) + 'row' + (toCheckUpRightNum[1]+1)).hasClass(classCheck);

    var centCheckRight1 = $('#column' + (toCheckUpRightNum[0]-2) + 'row' + (toCheckUpRightNum[1]+2)).hasClass(classCheck);

    if (startUpRight1 === true && startUpRight === true && startUpRight2 === true && startUpRight3 === true) {
      return true;
    } else if (startUpRight === true && startUpRight1 === true && centCheckRight === true && centCheckRight1 === true) {
      return true;
    } else if (startUpRight === true && startUpRight1 === true && startUpRight2 === true && centCheckRight === true) {
      return true;
    }
  }, //end checkUpRight

  checkUpLeft: function(thisCol) {
    if (currentPlayer === false) {
      classCheck = 'white';
    } else if (currentPlayer === true) {
      classCheck = 'black';
    }

    var toCheckUpLeft = $(mostRecent).attr('id').replace(/\D/g,'').split('');

    var toCheckUpLeftNum = toCheckUpLeft.map(Number);

    var startUpLeft = $('#column' + toCheckUpLeftNum[0] + 'row' + toCheckUpLeftNum[1]).hasClass(classCheck);

    var startUpLeft1 = $('#column' + (toCheckUpLeftNum[0]-1) + 'row' + (toCheckUpLeftNum[1]-1)).hasClass(classCheck);

    var startUpLeft2 = $('#column' + (toCheckUpLeftNum[0]-2) + 'row' + (toCheckUpLeftNum[1]-2)).hasClass(classCheck);

    var startUpLeft3 = $('#column' + (toCheckUpLeftNum[0]-3) + 'row' + (toCheckUpLeftNum[1]-3)).hasClass(classCheck);

    var centCheckLeft = $('#column' + (toCheckUpLeftNum[0]+1) + 'row' + (toCheckUpLeftNum[1]+1)).hasClass(classCheck);

    var centCheckLeft1 = $('#column' + (toCheckUpLeftNum[0]+2) + 'row' + (toCheckUpLeftNum[1]+2)).hasClass(classCheck);

    if (startUpLeft1 === true && startUpLeft === true && startUpLeft2 === true && startUpLeft3 === true) {
      return true;
    } else if (startUpLeft === true && startUpLeft1 === true && centCheckLeft1 === true && centCheckLeft === true) {
      return true;
    } else if (startUpLeft === true && startUpLeft1 === true && startUpLeft2 === true && centCheckLeft === true) {
      return true;
    }
  }, //end checkUpLeft

  winner: function(winner) {
    var winnerActual;
    if (winner === true) {
      winnerActual = 'White';
      whiteWins++;
      var winnerColor = 'white';
    } else if (winner === false) {
      winnerActual = 'Black';
      blackWins++;
      var winnerColor = 'black';
    } //end if
    $('#winnerText').text(winnerActual);
    $('#winnerSpan').css('display', 'inline-block');
    $('#winnerText').css('color', winnerColor);
    $('#scoreWhite').text(whiteWins);
    $('#scoreBlack').text(blackWins);
    $('.column').off();
  } //end winner
} //end UI


window.onload = function() {
  UI.createColumns();
  UI.buildUI();
  $('.column').on('click', UI.playGame);
  $('#reset').on('click', UI.clearBoard);
}
