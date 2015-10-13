

var board = [
[1, 1], [], [], [], [], [-1, -1, -1, -1, -1], [], [-1, -1, -1], [], [], [], [1, 1, 1, 1, 1],
[-1, -1, -1, -1, -1], [], [], [], [1, 1, 1], [], [1, 1, 1, 1, 1], [], [], [], [], [-1, -1]
];


var d1;
var d2;
var diceClicked;
var startSpot = 0;
var endSpot = 0;
var $currentPiece = null;

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
});

//This click function attains the id of the parent div
//so that i can reference a function containing a switch statement
//in order to assign a starting position for when a player makes
//moves
$('#board').on('click', '.piece', function(event) {
	if ($currentPiece) $currentPiece.removeClass('selected-piece');
	$currentPiece = $(this);
	$currentPiece.addClass('selected-piece');
	// movePiece();
	startSpot = parseInt($('#1204').parent().attr('id'));
	endSpot = diceClicked + startSpot;
	console.log(event.target.id);
	event.stopPropagation();
});

$('#board').on('click', '.space', function(event) {
	if (!$currentPiece) return;
	console.log(endSpot);
	if (parseInt(event.target.id) !== endSpot) return;
	var indx1 = parseInt($currentPiece[0].id.substr(0,2));
	var indx2 = parseInt($currentPiece[0].id.substr(2,2));
	console.log(indx1);
	var piece = board[indx1].splice(indx2, 1);
	console.log(piece);
	board[event.target.id - 1].push(piece);

	renderBoard();
});

//function where i click a die and recieve the value

$('.di').on('click', function(event) {
	diceClicked = parseInt($(event.target).html());
});



var pad = function(n) {
	var s = n.toString();
	s = s.length === 1 ? '0' + s : s;
	return s; 
}


//this click function appends a piece to a new spot on the board.
// var movePiece = function() {
// 	$('.space').on('click', function() {
// 		$(this).append($currentPiece).off('click');
// 	})	
// }


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


//funtion to calculate how far a player is allowed to move
//and control where they can click
// var moveDistance = function() {
// 	endSpot = startSpot + diceClicked;
// 	if()
// }













