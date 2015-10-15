
// Black is -1, white is 1
// The board representation startes in the 
// bottom-right and moves counter-
// clockwise to the top-right. Points are
// numbered left-to-right to ease visualizing
// the board, but he DOM ids go in order
// of the representations.
var board = [

  /* BOTTOM */

  /* Quadrant 1 - Bottom-Right: Black Home */
  /* Point 12, id: 1  */ [1, 1],
  /* Point 11, id: 2  */ [],
  /* Point 10, id: 3  */ [],
  /* Point 09, id: 4  */ [], 
  /* Point 08, id: 5  */ [], 
  /* Point 07, id: 6  */ [-1, -1, -1, -1, -1],

  /* Quadrant 2 - Bottom-Left */
  /* Point 06, id: 7  */ [], 
  /* Point 05, id: 8  */ [-1, -1, -1], 
  /* Point 04, id: 9  */ [], 
  /* Point 03, id: 10 */ [], 
  /* Point 02, id: 11 */ [], 
  /* Point 01, id: 12 */ [1, 1, 1, 1, 1],

  /* TOP */

  /* Quadrant 3 - Top-Left */
  /* Point 01, id: 13 */ [-1, -1, -1, -1, -1], 
  /* Point 02, id: 14 */ [], 
  /* Point 03, id: 15 */ [], 
  /* Point 04, id: 16 */ [], 
  /* Point 05, id: 17 */ [1, 1, 1], 
  /* Point 06, id: 18 */ [],

  /* Quadrant 4 - Top-Right: White Home */
  /* Point 07, id: 19 */ [1, 1, 1, 1, 1], 
  /* Point 08, id: 20 */ [], 
  /* Point 09, id: 21 */ [], 
  /* Point 10, id: 22 */ [], 
  /* Point 11, id: 23 */ [], 
  /* Point 12, id: 24 */ [-1, -1]
];

var pointsInQuad = function(quadrant) {
	var startPoint = (quadrant - 1) * 6;
	var endPoint = (quadrant * 6);

	return board.slice(startPoint, endPoint);
}

var bJail = [];
var wJail = [];
var wHome = [];


var d1;
var d2;
var diceClicked;
var startSpot = 0;
var endSpot = 0;
var $currentPiece = null;
var playerTurn = -1;
var amtOfDiceClicked = 0;
var totalBlackPieces = 0;
var totalWhitePieces = 0;
var escapeD1;
var escapeD2;
var escapeBD1;
var escapeBD2;

//this function checks if a space is already taken by two or more of the other 
//players pieces




//turn function - to change turns after a player finishes moving
var changeTurn = function() {
	playerTurn *= -1;
	$('.whitePiece').prop('disabled', false);
	$('.whitePiece').prop('disabled', false);
	$('.roll').prop('disabled', false);
	$('.di').prop("disabled", false)
	$('.di').css('background', '#F5F5F5');
	diceClicked = 0;
	amtOfDiceClicked = 0;
}


//this function allows players to move their pieces in opposite directions
// on the board depending on whose turn it is
var pieceMovement = function(diceClicked, startSpot, playerTurn) {
	var endSpace = 0;
	if (playerTurn === -1) {
		endSpace = startSpot - diceClicked;
	}
	else {
		endSpace = diceClicked + startSpot
	}
	return endSpace
}

//this funtion allows a player to begin moving their pieces into the home div if
//all of their pieces are in their home quadrant

var goingHome = function(playerTurn) {
	if (playerTurn === -1) {
		var bHome = [];
		if(endSpot <= 0) {
			var indx1 = parseInt($currentPiece[0].id.substr(0,2));
			var indx2 = parseInt($currentPiece[0].id.substr(2,2));
			console.log(indx1);
			var piece = board[indx1].splice(indx2, 1);
			bHome.push(piece[0]);
			console.log(bHome);
			renderBlackHome(bHome.length);
			renderBoard();	
		}
	}
	else {
		var wHome = [];
		if(endSpot >= 25) {
			var indx1 = parseInt($currentPiece[0].id.substr(0,2));
			var indx2 = parseInt($currentPiece[0].id.substr(2,2));
			console.log(indx1);
			var piece = board[indx1].splice(indx2, 1);
			wHome.push(piece[0]);
			console.log(wHome);
			renderWhiteHome(wHome.length);
			renderBoard();	
		}
	}
}

//ADD A COUNTER TO BLACK HOME WHEN PLAYER GETS PIECES INSIDE
var renderBlackHome = function(length) {
	for(var i = 0; i < length; i++) {
		totalBlackPieces += 1;
		$('#home1').text(totalBlackPieces);
		if(winnerCheck()) {
				alertWinnerBlack();
				changeTurn();
				boardReset();
				totalBlackPieces = 0;
				totalWhitePieces = 0;
			} 
		if(amtOfDiceClicked === 2) { 	
		changeTurn();
		}
	}
}

//ADD A COUNTER TO WHITE HOME WHEN PLAYER GETS PIECES INSIDE
var renderWhiteHome = function(length) {
	for(var i = 0; i < length; i++) {
		totalWhitePieces += 1;
		$('#home2').text(totalWhitePieces);
		if(winnerCheck()) {
				alertWinnerWhite();
				boardReset();
				changeTurn();
				totalBlackPieces = 0;
	 			totalWhitePieces = 0;
			} 
		if(amtOfDiceClicked === 2) {
		changeTurn();
		}
	}
}


//THIS FUNCTION CHECKS FOR A WINNER!!
var winnerCheck = function() {
	if (playerTurn === -1) {
		return (totalBlackPieces === 15);
	} else {
		return (totalWhitePieces === 15);
	}
}


//THIS FUNCTION ALERTS WHITE IF THEY ARE A WINNER HAHA
var alertWinnerWhite = function() {
	alert('WHITE WINS!!!')

}

//THIS FUNCTION ALERTS BLACK IF THEY ARE A WINNER HAHA
var alertWinnerBlack = function() {
	alert('BLACK WINS!!!');
}

//THIS FUNCTION RESETS THE BOARD WHEN THE GAME IS OVER LOL!
var boardReset = function() {
	console.log('reset!!')
	board = [

  /* BOTTOM */

  /* Quadrant 1 - Bottom-Right: Black Home */
  /* Point 12, id: 1  */ [1, 1],
  /* Point 11, id: 2  */ [],
  /* Point 10, id: 3  */ [],
  /* Point 09, id: 4  */ [], 
  /* Point 08, id: 5  */ [], 
  /* Point 07, id: 6  */ [-1, -1, -1, -1, -1],

  /* Quadrant 2 - Bottom-Left */
  /* Point 06, id: 7  */ [], 
  /* Point 05, id: 8  */ [-1, -1, -1], 
  /* Point 04, id: 9  */ [], 
  /* Point 03, id: 10 */ [], 
  /* Point 02, id: 11 */ [], 
  /* Point 01, id: 12 */ [1, 1, 1, 1, 1],

  /* TOP */

  /* Quadrant 3 - Top-Left */
  /* Point 01, id: 13 */ [-1, -1, -1, -1, -1], 
  /* Point 02, id: 14 */ [], 
  /* Point 03, id: 15 */ [], 
  /* Point 04, id: 16 */ [], 
  /* Point 05, id: 17 */ [1, 1, 1], 
  /* Point 06, id: 18 */ [],

  /* Quadrant 4 - Top-Right: White Home */
  /* Point 07, id: 19 */ [1, 1, 1, 1, 1], 
  /* Point 08, id: 20 */ [], 
  /* Point 09, id: 21 */ [], 
  /* Point 10, id: 22 */ [], 
  /* Point 11, id: 23 */ [], 
  /* Point 12, id: 24 */ [-1, -1]
];

renderBoard();
}

//function to make sure the current player
//can only click their pieces
var onlyClickMyPieces = function(piece) {
	if(playerTurn === -1 && piece === 'piece blackPiece') {
		console.log(piece);
		return true;
	}
	else if(playerTurn === 1 && piece === 'piece whitePiece') {
		return true;
	}
	else {
		return false;
	}
}

//gives me the location of a piece in the board array
var pad = function(n) {
	var s = n.toString();
	s = s.length === 1 ? '0' + s : s;
	return s; 
}

// quadrant is numbered 1 to 4, in board order
//this funtion gives the amount of pieces in a given quadrant
//depencing on the player
var piecesInQuadrant = function(quadrant, player) {
	// get just the array of points in THIS quad
	var quadsPoints = pointsInQuad(quadrant);
	var point,
	    piece,
	    total = 0;

	// console.log(quadsPoints)

	// iterate over the points
	for (var i = 0; i < quadsPoints.length; i++) {
		point = quadsPoints[i];

		// for the point, iterate over the pieces
		for (var j = 0; j < point.length; j++) {
			piece = point[j];
			// console.log(i,j,piece,player);
			if (piece === player) {
				total++;
			}
		};

		// console.log('finished point', i)
	};
	return total;
};



//this function tests to see if  all of a players 
//pieces are in their home quadrant.
var allInHomeQuad = function(player) {
	if (player === -1) {
		return (piecesInQuadrant(2, -1) === 0 &&
		        piecesInQuadrant(3, -1) === 0 &&
		        piecesInQuadrant(4, -1) === 0);
	} else {
		return (piecesInQuadrant(1, 1) === 0 &&
			    piecesInQuadrant(2, 1) === 0 &&
			    piecesInQuadrant(3, 1) === 0);
	}
}

//this funtion will render the board to its current 
//based on previous moves
var renderBoard = function() {
	for(var i =0; i < 25; i++) {
		$('#' + i).html('');
	}
	for(i = 0; i < board.length; i++)
		board[i].forEach(function(elem, index) {
			var s = '<div class="piece ' + ((elem === 1) ? 'whitePiece' : 'blackPiece') + '" id="' + pad(i) + pad(index) + '"></div>';
			$('#' + (i + 1)).append(s);
		});
}

renderBoard();


var checkSpaceAvailable = function(spaceAvailable, playerTurn) {
	console.log(spaceAvailable);
	if(board[spaceAvailable].length >= 2 && board[spaceAvailable][0] != playerTurn) {
			return true;
	}
}


//this function sends a piece to the jail if it is alone on a space
//and the opposite color.
var sendOpponentToJail = function(spaceAvailable, playerTurn) {
	if(board[spaceAvailable].length === 1 && board[spaceAvailable][0] !== playerTurn) {
		var jailPiece = board[spaceAvailable].pop();
		console.log(jailPiece);
		if(jailPiece === -1) {
			bJail.push(jailPiece);
		}
		else {
			wJail.push(jailPiece);
		}
	}
}

//this function renders the amount of values of bJail or wJail
//to the jail divs on the board.
var renderJail = function(bJail, wJail) {
	if(bJail.length === 0) {
		$('#jail1').html(0);
	}
	if(wJail.length === 0) {
		$('#jail2').html(0);	
		}
	for (var i = 0; i < wJail.length; i++) {
		$('#jail2').html(i + 1);
	}

	for (var i = 0; i < bJail.length; i++) {
		$('#jail1').html(i + 1);
	}
}

//this function checks to see if the dice rolled matches the 
//space to move to



$('#board').on('click', '.space', function(event) {
	if (!$currentPiece) return;

	console.log(endSpot);

	if (parseInt(event.target.id) !== endSpot) return;

	var indx1 = parseInt($currentPiece[0].id.substr(0,2));
	var indx2 = parseInt($currentPiece[0].id.substr(2,2));

	console.log(indx1);
	console.log(indx2);

	var piece = board[indx1].splice(indx2, 1);

	var spaceAvailable = event.target.id - 1;

	//check if the space cliced is take by two or more of the other players pieces
	//if true end click event function
	if(checkSpaceAvailable(spaceAvailable, playerTurn)) return;

	//need to call a function to see if there is only one piece of the other
	//player on the space, and if so send piece to the jail.
	sendOpponentToJail(spaceAvailable, playerTurn);
	//will call a function to render my jail with a number
	renderJail(bJail, wJail);


	board[spaceAvailable].push(piece[0]);

	renderBoard();

	if(amtOfDiceClicked === 2) { 
		changeTurn();
	}
});

//the following two functions
//check dice values to home board for white
//to see if they are eligible to escape jail
var checkForEscapeWhiteD1 = function(d1, playerTurn) {
	var possibleMovesD1 = [];
	if(board[d1 - 1].length < 2 && board[d1-1][0] !== playerTurn) {
		possibleMovesD1.push(d1 - 1);
	}
	if(board[d1 - 1][0] === playerTurn){
		possibleMovesD1.push(d1 - 1);
	}
	
	return possibleMovesD1;
}

var checkForEscapeWhiteD2 = function(d2, playerTurn) {
	var possibleMovesD2 = [];
	if(board[d2 - 1].length < 2 && board[d2 - 1][0] !== playerTurn) {
		possibleMovesD2.push(d2 - 1);
	}
	if(board[d2 - 1][0] === playerTurn){
		possibleMovesD2.push(d2 - 1);
	}
	
	return possibleMovesD2;
}

//the following two functions
//checks dice values to home board for black
//to see if they are eligible to escape jail
var checkForEscapeBlackD1 = function(d1, playerTurn) {
	var possibleMovesBD1 = [];
	if(board[24 - d1].length < 2 && board[24 - d1][0] !== playerTurn) {
		possibleMovesBD1.push(24 - d1);
	}
	if(board[24 - d1][0] === playerTurn){
		possibleMovesBD1.push(24 - d1);
	}
	console.log(possibleMovesBD1);
	return possibleMovesBD1;
}

var checkForEscapeBlackD2 = function(d2, playerTurn) {
	var possibleMovesBD2 = [];
	if(board[24 - d2].length < 2 && board[24 - d2][0] !== playerTurn) {
		possibleMovesBD2.push(24 - d2);
	}
	if(board[24 - d2][0] === playerTurn){
		possibleMovesBD2.push(24 - d2);
	}
	console.log(possibleMovesBD2);
	return possibleMovesBD2;
}


//This click function rolls dice and assigns the two values
//to variables d1 and d2
//It also prints the randomized # to my simulation dice divs.
$('.roll').on('click', function(){
	var die1 = document.getElementById('die1');
	var die2 = document.getElementById('die2');
	d1 = Math.floor(Math.random() * 6) + 1;
	d2 = Math.floor(Math.random() * 6) + 1;
	die1.innerHTML = d1;
	die2.innerHTML = d2;
	$(this).prop("disabled", true);
	
	if (bJail.length > 0 && playerTurn === -1) {
		escapeBD1 = checkForEscapeBlackD1(d1, playerTurn);
		escapeBD2 = checkForEscapeBlackD2(d2, playerTurn);
		if(escapeBD1.length === 0 && escapeBD2.length === 0) {
			alert('No possible Moves! White Turn.');
			changeTurn();
		}
	}
	if (wJail.length > 0 && playerTurn === 1) {
		escapeD1 = checkForEscapeWhiteD1(d1, playerTurn);
		escapeD2 = checkForEscapeWhiteD2(d2, playerTurn);
		if(escapeD1.length === 0 && escapeD2.length === 0) {
			alert('No possible Moves! Black Turn.');
			changeTurn();
		}
		else if (escape.length >= 1) {
			return;
		}
		console.log(escape);
	}
});


//function where i click a die and recieve the value
$('#dice').on('click', '.di', function(event) {
	diceClicked = parseInt($(event.target).html());
	amtOfDiceClicked = amtOfDiceClicked + 1;
	$(this).css('background', 'red');
	$(this).prop('disabled', true);

	if(playerTurn === -1 && bJail.length > 0) {
		
		if (24 - diceClicked === escapeBD1[0] && escapeBD2.length === 0) {
			var free = bJail.pop();
			board[24 - diceClicked].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if(bJail.length === 0) return;
			alert("Thats you're only move, Black turn!");
			changeTurn ();
		}
		else if (24 - diceClicked === escapeBD2[0] && escapeBD1.length === 0) {
			var free = bJail.pop();
			board[24 - diceClicked].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if(bJail.length === 0) return;
			alert("Thats you're only move, Black turn!");
			changeTurn();
		}
		else if (24 - diceClicked === escapeBD2[0] && escapeBD1.length === 1) {
			var free = bJail.pop();
			board[24 - diceClicked].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if (amtOfDiceClicked === 2){
				changeTurn();
			}
		}
		else if (24 - diceClicked === escapeBD1[0] && escapeBD2.length === 1) {
			var free = bJail.pop();
			board[24 - diceClicked].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if (amtOfDiceClicked === 2){
				changeTurn();
			}
		}
	}

	if(playerTurn === 1 && wJail.length > 0) {
		
		if (diceClicked - 1 === escapeD1[0] && escapeD2.length === 0) {
			var free = wJail.pop();
			board[diceClicked - 1].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if(wJail.length === 0) return;
			alert("Thats you're only move, Black turn!");
			changeTurn ();
		}
		else if (diceClicked - 1 === escapeD2[0] && escapeD1.length === 0) {
			var free = wJail.pop();
			board[diceClicked - 1].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if(wJail.length === 0) return;
			alert("Thats you're only move, Black turn!");
			changeTurn();
		}
		else if (diceClicked - 1 === escapeD2[0] && escapeD1.length === 1) {
			var free = wJail.pop();
			board[diceClicked - 1].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if (amtOfDiceClicked === 2){
				changeTurn();
			}
		}
		else if (diceClicked - 1 === escapeD1[0] && escapeD2.length === 1) {
			var free = wJail.pop();
			board[diceClicked - 1].push(free);
			renderBoard();
			renderJail(bJail, wJail);
			if (amtOfDiceClicked === 2){
				changeTurn();
			}
		}
	}
	console.log('clicked!')
});
 
//This click function attains the id of the parent div
//so that i can reference a function containing a switch statement
//in order to assign a starting position for when a player makes
//moves
$('#board').on('click', '.piece', function(event) {
	//statements below check if the player has any pieces in jail
	if (bJail.length > 0 && playerTurn === -1) return;
	if (wJail.length > 0 && playerTurn === 1) return;

	if(amtOfDiceClicked === 0) return;
	var pieceClass = ($(this).attr('class'));
	
	console.log('hi');
	if(!onlyClickMyPieces(pieceClass)) return;

	if ($currentPiece) $currentPiece.removeClass('selected-piece');

	$currentPiece = $(this);
	$currentPiece.addClass('selected-piece');
	
	startSpot = parseInt($(this).parent().attr('id'));
	endSpot = pieceMovement(diceClicked, startSpot, playerTurn);

	if(allInHomeQuad(playerTurn)) goingHome(playerTurn);

});


/* ****************************************************************************
 * 
 * CREATE TEST SETUPS
 * 
 * **************************************************************************** */

var setups = {};

setups.blackInHomeQ = function() {
	board = [
	   [],
	   [-1, -1],
	   [],
	   [-1, -1], 
	   [], 
	   [-1, -1],

	   [-1], 
	   [1], 
	   [-1], 
	   [1], 
	   [-1], 
	   [1],
	  
	   [-1], 
	   [1], 
	   [1], 
	   [-1], 
	   [], 
	   [1],

	   [], 
	   [1,1], 
	   [], 
	   [1,1], 
	   [], 
	   [1,1]
	];

	renderBoard();
};



