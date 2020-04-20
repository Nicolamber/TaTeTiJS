var turn = 'X';
var game_type = 3;
var total_turns = 0;
var finished = false;

var selections = new Array(); 
	selections['X'] = new Array();
	selections['Y'] = new Array();

var scores = new Array(); 
	scores['X'] = 0;
	scores['Y'] = 0;
// Cuando se vuelve a iniciar el juego lo que hace esta funcion es reiniciar los parametros de
// Turno, tipo de juego, cantidad de jugadas y finalizado
function resetParams() {
	turn = 'X';
	game_type = 3;
	total_turns = 0;
	finished = false;

	selections['X'] = new Array();
	selections['Y'] = new Array();
}


//Cambio de turno despues de que un jugador juega 
function changeTurn(){
	if (turn == 'X') turn = 'Y';
	else turn = 'X';
}


// Para saber quien gana la partdia lo que hice fue gbuscar los patrones que se podian dar, es decir,
//todas las combinaciones posibles en un juego de 3x3 y guardarlas en un arreglo que voy a verificar
function winnerPatterns() {
	var wins = Array();

	// 3 x 3 winning patterns;
	if (game_type==3) wins = [ 
								[11,12,13], [21,22,23], [31,32,33],
						 		[11,21,31], [12,22,32], [13,23,33], 
						 		[11,22,33], [13,22,31]
						 	];

	return wins
}

/**
 * Con esta funcion lo que hago es ir verificando si hay o no un ganador, en pocas palabras lo que hace es
 * obtener los patrones ganadores y el turno, entonces recorro el array de los patrones e invoco al isWinner
 * enviandole el patron que encontre junto con el turno, si este da True, gana, sino continua 
 */
function checkWinner() {

	var selected = selections[turn].sort();
	var win_patterns = winnerPatterns();

	finished = false;
	for (var x=0; x < win_patterns.length; x++) {
		
		if (finished != true) { 
			finished = isWinner(win_patterns[x], selections[turn]);

			if ( finished === true ) {
				
				// Updating score card
				scoreUpdate(turn);

				// On winning disabled all boxes
				disableAllBoxes();

				switch(turn){
					case 'X': document.getElementById("winner").innerHTML = "Jugador 1 ha ganado"
					break;
					case 'Y': document.getElementById("winner").innerHTML = "Jugador 2 ha ganado"
					break;
				}
				
				break;
			} 
		}
	}

	// If no one wins; declare DRAW
	if ( ( total_turns == (game_type*game_type) ) && finished === false ) { 
		document.getElementById("winner").innerHTML = "Los jugadores han empatado"
		finished = true;
		disableAllBoxes(); 
	}
}

/**
 * este metodo boolean lo que hace es recorrer el array por X y por Y y buscar si existe un
 * match, es decir, si en un punto encuentra tres en linea retornara true y se declara un ganador
 */
function isWinner(win_pattern, selections){

	var match = 0;

	for (var x=0; x<win_pattern.length; x++) {
		for (var y=0; y<selections.length; y++) {
			if (win_pattern[x]==selections[y]) {
				match++;
			}
		}
	}

	if (match==win_pattern.length) return true;

	return false;
}

// Metodo que se encarga de limpiar la matriz una vez terminado el juego.
function disableAllBoxes() {

	var elements = document.getElementsByClassName("grid-box");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}

}

/**
 * Funcion de ayuda generada para tener los jugadores 
 */
function getValues(){
	var player1 = document.getElementById("player1").value
	var player2 = document.getElementById("player2").value
	generateGame(player1,player2)
}


/*
Metodo mas importante de la clase, se encarga de generar un juego nuevo verificando primero si los parametros
de nombre de jugador 1 y 2 se ingresaron
*/
function generateGame(player1, player2){
	

	// Cuando inicia un juego nuevo corremos el reset solo para verificar que no quede nada molestando
	resetParams();

	// Limpiamos la matriz seteandole el ''
	document.getElementById('game-board').innerHTML = '';

	// Generamos el tablero el cual antes de hacerlo se verifica que los usuarios esten cargados y no sean nulos
	if(player1 === "" && player2 === "" ){
		document.getElementById("error").innerHTML = "Los jugadores no se han registrado"
	}else{
		for (var row = 1; row <= game_type; row++){
			for (var col = 1; col <= game_type; col++) {
				var unique_name = 'grid-'+row+'-'+col;
				var unique_id = row+''+col;
				var button = document.createElement("input");
	
				button.setAttribute("value", ' ');
				button.setAttribute("id", unique_id);
				button.setAttribute("name", unique_name);
				button.setAttribute("class", 'grid-box');
				button.setAttribute("type", 'button');
				button.setAttribute("onclick", "markCheck(this)");
				document.getElementById('game-board').appendChild(button);
			}
	
			var breakline = document.createElement("br");
				document.getElementById('game-board').appendChild(breakline);
		}
}

}


// Seteo el valor de X o Y

	obj.value = turn;
	total_turns++;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
	} else {
		obj.setAttribute("class", 'red-player');
	}

	obj.setAttribute("disabled", 'disabled');
	selections[turn].push(Number(obj.id));

	checkWinner();
	changeTurn();
}



// Calculo el resultado de las intersecciones comparando 
function intersectionArray(x, y){

    var response = [];
    for (var i = 0; i < x.length; i++) {
        for (var z = 0; z < y.length; z++) {
            if (x[i] == y[z]) {
                response.push(x[i]);
                break;
            }
        }
    }
    return response;

}

//Actualiza el historial de los jugadores luego de que la partida finaliza
function scoreUpdate(turn){
	scores[turn]++;
	document.getElementById('score-'+turn).innerHTML = scores[turn];
}
