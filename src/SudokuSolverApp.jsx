import React, { useState } from 'react';
import solve from './Solver';

function SudokuSolverApp(){
	
	const [selectedCell, setSelectedCell] = useState(
		{
			r: -1,
			c: -1
		}
	);
	var n = null;
	
	const [values, setValues] = useState(
		[
			[   n , 8 , n   ,   n , 1 , n   ,   n , 2 , n  ],
			[   6 , n , n   ,   3 , n , 5   ,   n , n , 1  ],
			[   n , n , 7   ,   n , n , n   ,   4 , n , n  ],
				
			[   n , 2 , n   ,   1 , n , 9   ,   n , 5 , n  ],
			[   7 , n , n   ,   n , n , n   ,   n , n , 6  ],
			[   n , 9 , n   ,   6 , n , 3   ,   n , 4 , n  ],
				
			[   n , n , 5   ,   n , n , n   ,   3 , n , n  ],
			[   9 , n , n   ,   2 , n , 1   ,   n , n , 8  ],
			[   n , 3 , n   ,   n , 6 , n   ,   n , 7 , n  ],
		]
	);
	
	return(
		
		<div style={{ display: "grid", gridTemplateColumns: "100%", justifyItems: "center", gap: "40px", padding: "40px" }} >
			
			Sudoku Solver App
			
			<SudokuGrid 
				values = {values}
				onClick = { (r,c) => clickedOnCell(r,c) }
				onKeyPress = { e => pressedKey(e) }
				onFocusLost = { () => focusLost() }
				selectedCell = {selectedCell}
			/>
			
			<button onClick={()=>solveClicked()}>
				Solve
			</button>
			
			
		</div>
			
	);
	
	function clickedOnCell( r , c ){
		
		setSelectedCell(
			{ r: r , c: c }
		);
		
	}
	function pressedKey( key ){
		
		if( selectedCell.r === -1 )
		{
			return;
		}
		
		var newValue = null;
		if( key === "1" ) newValue = 1;
		if( key === "2" ) newValue = 2;
		if( key === "3" ) newValue = 3;
		if( key === "4" ) newValue = 4;
		if( key === "5" ) newValue = 5;
		if( key === "6" ) newValue = 6;
		if( key === "7" ) newValue = 7;
		if( key === "8" ) newValue = 8;
		if( key === "9" ) newValue = 9;
		
		if( newValue === null )
		{
			return;
		}
		
		values[selectedCell.r][selectedCell.c] = newValue;
		setValues(values);
		setSelectedCell(
			{ r: selectedCell.r, c: selectedCell.c }
		);
		
	}
	function focusLost(){
		
		setSelectedCell(
			{ r: -1 , c: -1 }
		);
		
	}
	
	function solveClicked(){
		
		var resultValues = solve( values );
		setValues( resultValues );
		
		
	}
	
}

function SudokuGrid({ values , onClick , onKeyPress , onFocusLost , selectedCell }){
	
	if( values === null )
	{
		var n = null;
		values = [
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
			[   n , n , n   ,   n , n , n   ,   n , n , n   ],
		];
		
	}
	
	
	var boxes = [];
	for( var r1 = 0; r1 < 3; r1++)
	{
		for( var c1 = 0; c1 < 3; c1++)
		{
			var box = createBox( r1 , c1 );
			boxes.push( box );
		}
	}
	
	function createBox(boxR,boxC){
		
		var cells = [];
		for( var cellR = 0; cellR < 3; cellR++)
		{
			for( var cellC = 0; cellC < 3; cellC++)
			{
				var r = boxR*3 + cellR;
				var c = boxC*3 + cellC;
				var isSelected = (selectedCell != null) && (selectedCell.r === r) && (selectedCell.c === c)
				
				cells.push(
					<SudokuCell
						key={"cell "+r+","+c}
						value={values[r][c]}
						isSelected={isSelected}
						onClick={onClick}
						r={r}
						c={c}
						
					/>
				);
			}
		}
		
		return(
			
			<div style={{ display: "grid", gridTemplateColumns: "repeat( 3 , 50px )", gridTemplateRows: "repeat( 3 , 50px )", border: "1px solid darkBlue"}} >
				{cells}
			</div>
			
		);
		
		
	}
	
	return(
		<div style={{ display: "grid", gridTemplateColumns: "repeat( 3 , 150px )", gridTemplateRows: "repeat( 3 , 150px )", }} onKeyDown={(e)=>onKeyPress(e.key)} tabIndex="0" onBlur={e => onFocusLost()} >
			{boxes}
		</div>
	);
	
}



function SudokuCell( {value, isSelected, onClick, r,c } ){
	
	
	if( isSelected === null ) isSelected = false;
	
	var style = { display: "flex", justifyContent: "center", alignItems: "center" , textAlign: "center", fontSize: "24px", border: "1px solid gray", cursor: "pointer" };
	
	if( isSelected )
	{
		style.backgroundColor = "rgb(255,236,180)";
	}
	
	return(
		
		<div style={style} onClick={() => onClick(r,c)} onKeyDown={(e)=>console.log("cell key pressed: "+ r + "," + c)}>
				
			{ (value === null || value === 0 || value === null) ? "" : value }
			
		</div>
		
	);
	
}


export default SudokuSolverApp;