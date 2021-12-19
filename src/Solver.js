

function solve( values ){
	
	console.log( toString( values ) );
	
	var possibleValues = createInitialPossibleValues();
	printPossibleValues( possibleValues );
	
	//fill in all the givens
	for( var r = 0; r < 9; r++)
	{
		for( var c = 0; c < 9; c++)
		{
			var v = values[r][c];
			if( v != null )
			{
				setValue( v , r , c , possibleValues );
			}
		}
	}
	
	printPossibleValues( possibleValues );
	
	var cellToFill;
	while( ( cellToFill = findCellToFill(possibleValues) ) != null )
	{
		setValue( cellToFill.v , cellToFill.r , cellToFill.c , possibleValues );
		//printPossibleValues( possibleValues );
	}
	
	var resultValues = getResultValues( possibleValues );
	return resultValues;
	
}

function toString( values ){
	
	var output = "";
	
	// output += "-------------------------";
	output += "┏━━━━━━━┳━━━━━━━┳━━━━━━━┓";
	
	for( var r = 0; r< 9; r++ )
	{
		output += "\n" + "┃";
		
		for( var c = 0; c< 9; c++ )
		{
			var v = values[r][c];
			if( v === null )
			{
				v = " ";
			}
			output += " " + v;
			
			if( c === 2 || c === 5 || c === 8)
			{
				output += " ┃";
			}
			
		}
		
		if( r === 2 || r === 5 )
		{
			output += "\n" + "┣━━━━━━━╋━━━━━━━╋━━━━━━━┫";
		}
		
	}
	
	output += "\n" +  "┗━━━━━━━┻━━━━━━━┻━━━━━━━┛";
	
	return output;
	
}

function createInitialPossibleValues(){
	
	var rows = [];
	
	for( var r = 0; r < 9; r++)
	{
		var row = [];
		for( var c = 0; c < 9; c++)
		{
			row.push( [1,2,3,4,5,6,7,8,9] );
		}
		rows.push( row );
	}
	
	return rows;
	
}

function isPossible( v , r , c , possibleValues ){
	
	// console.log( "isPossible: " + v + "   " + possibleValues[r][c] );
	
	if( Array.isArray( possibleValues[r][c] ) )
	{
		return possibleValues[r][c].indexOf(v) != -1;
	}
	
	return false;
	
	
	
}
function isAnswered( r , c , possibleValues ){
	
	return !Array.isArray( possibleValues[r][c] );
	
}


function printPossibleValues( possibleValues ){
	
	var output = "";
	
	output += "╔" + "═══════" + "╤" + "═══════" + "╤" + "═══════" + "╦" + "═══════" + "╤" + "═══════" + "╤" + "═══════" + "╦" + "═══════" + "╤" + "═══════" + "╤" + "═══════" + "╗";
	
	for( var r = 0; r< 9; r++ )
	{
		
		output += "\n" + "║ "
		for( var c = 0; c< 9; c++ )
		{
			var p1 = isPossible(1,r,c,possibleValues) ? "1" : " ";
			var p2 = isPossible(2,r,c,possibleValues) ? "2" : " ";
			var p3 = isPossible(3,r,c,possibleValues) ? "3" : " ";
			
			output += p1 + " " + p2 + " " + p3;
			
			
			if( c == 2 | c == 5 || c== 8 )
			{
				output += " ║ ";
			}
			else
			{
				output += " │ ";
			}
			
		}
		
		output += "\n" + "║ "
		for( var c = 0; c< 9; c++ )
		{
			var p4 = isPossible(4,r,c,possibleValues) ? "4" : " ";
			var p5 = isPossible(5,r,c,possibleValues) ? "5" : " ";
			var p6 = isPossible(6,r,c,possibleValues) ? "6" : " ";
			
			if( isAnswered(r,c,possibleValues) ){
				output += " " + "(" + possibleValues[r][c] + ")" + " ";
			}
			else{
				output += p4 + " " + p5 + " " + p6;
			}
			
			
			
			
			if( c == 2 | c == 5 || c== 8 )
			{
				output += " ║ ";
			}
			else
			{
				output += " │ ";
			}
		}
		
		output += "\n" + "║ "
		for( var c = 0; c< 9; c++ )
		{
			var p7 = isPossible(7,r,c,possibleValues) ? "7" : " ";
			var p8 = isPossible(8,r,c,possibleValues) ? "8" : " ";
			var p9 = isPossible(9,r,c,possibleValues) ? "9" : " ";
			
			output += p7 + " " + p8 + " " + p9;
			
			
			if( c == 2 | c == 5 || c== 8 )
			{
				output += " ║ ";
			}
			else
			{
				output += " │ ";
			}
		}
		
		if( r == 2 || r == 5 )
		{
			output += "╟" + "═══════" + "╪" + "═══════" + "╪" + "═══════" + "╬" + "═══════" + "╪" + "═══════" + "╪" + "═══════" + "╬" + "═══════" + "╪" + "═══════" + "╪" + "═══════" + "╢";
		}
		else if( r == 8 )
		{
			output += "╚" + "═══════" + "╧" + "═══════" + "╧" + "═══════" + "╩" + "═══════" + "╧" + "═══════" + "╧" + "═══════" + "╩" + "═══════" + "╧" + "═══════" + "╧" + "═══════" + "╝";
		}
		else
		{
			output += "╟" + "───────" + "┼" + "───────" + "┼" + "───────" + "╫" + "───────" + "┼" + "───────" + "┼" + "───────" + "╫" + "───────" + "┼" + "───────" + "┼" + "───────" + "╢";
		}
		
		
		
	}
	
	console.log( output );
}

function setValue( v , r , c , possibleValues ){
	
	//clear row
	for( var c1=0; c1<9; c1++ )
	{
		setNotPossible( v , r,c1 , possibleValues );
	}
	
	//clear rolumn
	for( var r1=0; r1<9; r1++ )
	{
		setNotPossible( v , r1,c , possibleValues );
	}
	
	//clear box
	var boxRow; 
	if( r == 0 || r == 1 || r == 2 )  boxRow = 0;
	if( r == 3 || r == 4 || r == 5 )  boxRow = 1;
	if( r == 6 || r == 7 || r == 8 )  boxRow = 2;
	
	var boxCol;
	if( c == 0 || c == 1 || c == 2 )  boxCol = 0;
	if( c == 3 || c == 4 || c == 5 )  boxCol = 1;
	if( c == 6 || c == 7 || c == 8 )  boxCol = 2;
	
	for( var r1 = boxRow*3; r1 < (boxRow+1)*3; r1++ )
	{
		for( var c1 = boxCol*3; c1 < (boxCol+1)*3; c1++ )
		{
			// console.log( "\t" + "clearing " + r1 + "," + c1 );
			setNotPossible( v , r1,c1 , possibleValues );
		}
	}
	
	//set value
	possibleValues[r][c] = v;
	
	
}
function setNotPossible( v , r , c , possibleValues ){
	
	if( isAnswered(r,c,possibleValues) )
	{
		return;
	}
	
	const index = possibleValues[r][c].indexOf(v);
	if( index != -1 )
	{
		possibleValues[r][c].splice( index , 1 );
	}
	
	
	
}

function findCellToFill( possibleValues ){
	
	var cellToFill = findCellWithOnePossible( possibleValues );
	if( cellToFill != null )
	{
		console.log( "found cell with one possible value: " + "v=" + cellToFill.v + ", " + "r=" + cellToFill.r + ", " + "c=" + cellToFill.c );
		return cellToFill;
	}
	
	cellToFill = findRowWhereANumberHasOnePossibleCell( possibleValues );
	if( cellToFill != null )
	{
		console.log( "found row with a number that has only one possible cell: " + "v=" + cellToFill.v + ", " + "r=" + cellToFill.r + ", " + "c=" + cellToFill.c );
		return cellToFill;
	}
	
	cellToFill = findColumnWhereANumberHasOnePossibleCell( possibleValues );
	if( cellToFill != null )
	{
		console.log( "found column with a number that has only one possible cell: " + "v=" + cellToFill.v + ", " + "r=" + cellToFill.r + ", " + "c=" + cellToFill.c );
		return cellToFill;
	}
	
	
	
	return null;
	
}

function findCellWithOnePossible( possibleValues ){
	
	for( var r = 0; r < 9; r++)
	{
		for( var c = 0; c < 9; c++)
		{
			if( !isAnswered(r,c,possibleValues) )
			{
				if( possibleValues[r][c].length == 1 )
				{
					return({
						v: possibleValues[r][c][0],
						r: r,
						c: c,
					});
				}
			}
		}
		
	}
	
	return null;
	
}
function findRowWhereANumberHasOnePossibleCell( possibleValues ){
	
	for( var r = 0; r < 9; r++)
	{
		for( var v = 1; v <= 9; v++ )
		{
			var columns = getAllColumnsInThisRowWhereThisValueIsPossible( v , r , possibleValues );
			if( columns.length == 1 )
			{
				return({
					v: v,
					r: r,
					c: columns[0],
				});
			}
		}
	}
	
	return null;
	
}
function getAllColumnsInThisRowWhereThisValueIsPossible( v , r , possibleValues ){
	
	var columns = [];
	
	for( var c=0; c<9; c++ )
	{
		if( isPossible(v,r,c,possibleValues) )
		{
			columns.push( c );
		}
	}
	
	return columns;
	
}

function findColumnWhereANumberHasOnePossibleCell( possibleValues ){
	
	for( var c = 0; c < 9; c++)
	{
		for( var v = 1; v <= 9; v++ )
		{
			var rows = getAllRowsInThisColumnWhereThisValueIsPossible( v , c , possibleValues );
			if( rows.length == 1 )
			{
				return({
					v: v,
					r: rows[0],
					c: c,
				});
			}
		}
	}
	
	return null;
	
}
function getAllRowsInThisColumnWhereThisValueIsPossible( v , c , possibleValues ){
	
	var rows = [];
	
	for( var r=0; r<9; r++ )
	{
		if( isPossible(v,r,c,possibleValues) )
		{
			rows.push( r );
		}
	}
	
	return rows;
	
}



function getResultValues( possibleValues ){
	
	var resultValues = [];
	
	for( var r=0; r<9; r++ )
	{
		var row = [];
		for( var c=0; c<9; c++ )
		{
			var value = null;
			if( isAnswered(r,c,possibleValues) )
			{
				value = possibleValues[r][c];
			}
			row.push( value )
		}
		resultValues.push( row );
	}
	
	return resultValues;
	
}


export default solve;