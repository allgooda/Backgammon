
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
var bHome = [];
var wHome = [];


var d1;
var d2;
var diceClicked;
var startSpot = 0;
var endSpot = 0;
var $currentPiece = null;
var playerTurn = -1;
var amtOfDiceClicked = 0;

//turn function - to change turns after a player finishes moving

var changeTurn = function() {
	playerTurn *= -1;
	$('.whitePiece').prop('disabled', false);
	$('.whitePiece').prop('disabled', false);
	$('.roll').prop("disabled", false);
	$('.di').prop("disabled", false)
	$('.di').css('background', '#F5F5F5');
	diceClicked = 0;
	amtOfDiceClicked = 0;
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
});
 
//This click function attains the id of the parent div
//so that i can reference a function containing a switch statement
//in order to assign a starting position for when a player makes
//moves
$('#board').on('click', '.piece', function(event) {
	var pieceClass = ($(this).attr('class'));
	if(!onlyClickMyPieces(pieceClass)) return;
	if ($currentPiece) $currentPiece.removeClass('selected-piece');
	$currentPiece = $(this);
	$currentPiece.addClass('selected-piece');
	// movePiece();
	startSpot = parseInt($(this).parent().attr('id'));
	endSpot = pieceMovement(diceClicked, startSpot, playerTurn);
	console.log(event.target.id);
});

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

$('#board').on('click', '.space', function(event) {
	if (!$currentPiece) return;
	console.log(endSpot);
	if (parseInt(event.target.id) !== endSpot) return;
	var indx1 = parseInt($currentPiece[0].id.substr(0,2));
	var indx2 = parseInt($currentPiece[0].id.substr(2,2));
	console.log(indx1);
	var piece = board[indx1].splice(indx2, 1);
	console.log(piece);
	board[event.target.id - 1].push(piece[0]);
	renderBoard();
	if(amtOfDiceClicked === 2) { 
		changeTurn();
	}
});

//function where i click a die and recieve the value

$('#dice').on('click', '.di', function(event) {
	diceClicked = parseInt($(event.target).html());
	$(this).css('background', 'red');
	$(this).prop('disabled', true);
	amtOfDiceClicked += 1;
	console.log('clicked!')
});


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











/* ****************************************************************************
 * 
 * CREATE TEST SETUPS
 * 
 * **************************************************************************** */
/*
var setups = {};

setups.blackInHomeQ = function() {
	board = [
	   [1, 1],
	   [-1, -1],
	   [],
	   [-1, -1, -1, -1, -1], 
	   [-1, -1, -1], 
	   [-1, -1, -1, -1, -1],

	   [], 
	   [], 
	   [], 
	   [], 
	   [], 
	   [1, 1, 1, 1, 1],
	  
	   [], 
	   [], 
	   [], 
	   [], 
	   [1, 1, 1], 
	   [],

	   [1, 1, 1, 1, 1], 
	   [], 
	   [], 
	   [], 
	   [], 
	   []
	];

	renderBoard();
};

*/

