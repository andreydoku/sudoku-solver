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
		getDefaultValues()
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
			
			
			
			{/* <SudokuGrid2 /> */}
			
			
			
			<div style={{display: "flex", gap: "20px" }} >
				<button onClick={()=>solveClicked()}>
					Solve
				</button>
				
				<button onClick={()=>clearClicked()}>
					Clear
				</button>
			</div>
			
			
			
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
	function clearClicked(){
		
		var n = null;
		var clearedValues = getClearedValues();
		
		setValues( clearedValues );
	
		
	}
	
	function getDefaultValues(){
		
		 
		var defaultValues = 
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
		];
		
		return defaultValues;
		
	}
	function getClearedValues(){
		
		var clearedValues = 
		[
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
				
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
			[   n , n , n   ,   n , n , n   ,   n , n , n  ],
		];
		
		return clearedValues;
		
	}
	
}


function SudokuGrid2(){
	
	var containerStyle={
		
		width: "min(800px , 90vw )",
		height: "min(800px , 90vw )",
		padding: "0 10vw",
		display: "flex", justifyContent: "center" ,alignItems: "center"
	}
	
	var gridStyle = {
		display: "grid",
		gridTemplateColumns: "repeat( 3  , 1fr )",
		gridTemplateRows: "repeat( 3  , 1fr )",
		
		//maxWidth: "500px",
		width: "94%",
		height: "94%",
		
		padding: "2%",
		gap: "2%",
		
		backgroundColor: "rgb(46, 81, 119)",
		
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
	
	function createBox(){
		
		var boxStyle = {
			
			backgroundColor: "rgb(46, 81, 119)",
			width: "100%",
			height: "100%",
			
			display: "grid",
			gridTemplateRows: "1fr 1fr 1fr",
			gridTemplateColumns: "1fr 1fr 1fr",
			
			gap: "3%"
			
		}
		
		return(
			<div style={boxStyle} >
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
				<div style={{width: "100%", height: "100%", backgroundColor: "rgb(145, 176, 213)"}}></div>
			</div>
			
			
		);
		
		
	}
	
	
	return(
		
		<div style={containerStyle} >
			<div style={gridStyle}>
				{boxes}
			</div>	
		</div>
		
		
		
		
	);
	
	
	
	
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
		
		var boxStyle = {
			
			backgroundColor: "rgb(46, 81, 119)",
			width: "100%",
			height: "100%",
			
			display: "grid",
			gridTemplateRows: "1fr 1fr 1fr",
			gridTemplateColumns: "1fr 1fr 1fr",
			
			gap: "3%"
			
		}
		
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
			
			<div style={boxStyle} >
				{cells}
			</div>
			
		);
		
		
	}
	
	var containerStyle={
		
		width: "min(700px , 90vw )",
		height: "min(700px , 90vw )",
		padding: "0 10vw",
		display: "flex", justifyContent: "center" ,alignItems: "center"
	}
	
	var gridStyle = {
		display: "grid",
		gridTemplateColumns: "repeat( 3  , 1fr )",
		gridTemplateRows: "repeat( 3  , 1fr )",
		
		//maxWidth: "500px",
		width: "100%",
		height: "100%",
		
		padding: "2%",
		gap: "2%",
		
		backgroundColor: "rgb(46, 81, 119)",
		
	}
	
	return(
		
		<div style={containerStyle} >
			<div style={gridStyle} onKeyDown={(e)=>onKeyPress(e.key)} tabIndex="0" onBlur={e => onFocusLost()} > 
				{boxes}
			</div>	
		</div>
		
		// <div style={{ display: "grid", gridTemplateColumns: "repeat( 3 , 150px )", gridTemplateRows: "repeat( 3 , 150px )", }} onKeyDown={(e)=>onKeyPress(e.key)} tabIndex="0" onBlur={e => onFocusLost()} >
		// 	{boxes}
		// </div>
	);
	
}



function SudokuCell( {value, isSelected, onClick, r,c } ){
	
	
	if( isSelected === null ) isSelected = false;
	
	var cellStyle = { 
		display: "flex", justifyContent: "center", alignItems: "center" , 
		textAlign: "center", 
		fontSize: "min( 6vw , 48px)", 
		// fontFamily: "Berlin Sans FB",
		fontFamily: "Montserrat",
		cursor: "pointer",
		backgroundColor: "rgb(145, 176, 213)",
		// color: "rgb(46, 81, 119)",
		color: "rgb(23, 41, 62)",
	};
	
	if( isSelected )
	{
		cellStyle.backgroundColor = "rgb(255,236,180)";
	}
	
	return(
		
		<div style={cellStyle} onClick={() => onClick(r,c)} onKeyDown={(e)=>console.log("cell key pressed: "+ r + "," + c)}>
				
			{ (value === null || value === 0 || value === null) ? "" : value }
			
		</div>
		
	);
	
}


export default SudokuSolverApp;