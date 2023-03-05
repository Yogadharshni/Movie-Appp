import { useCallback, useState } from "react";
import Button from '@mui/material/Button';
import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'



export function TicTacToe() {
 const [arr,setArr]=useState(Array(9).fill(null)) 
 const[isTurn,setisTurn]=useState(true) //for changing the value as alternative value as => X or O
 const { width, height } = useWindowSize()

  const WhileClicking = (index)=>{
  if( !winner && arr[index] == null ) 
  //if winner is there buttons will be disabled (if no winner then => !null == not null is true so prm will execute)
  //arr[index] == null  if box is already fille we cannot add val
   {
    console.log(index)   //to track board and to get index value
    const arrcopy=[...arr]  //copy of array(using spread operator)
    arrcopy[index] = isTurn ? 'X' : 'O' //setting the value by tracking index value(if true= x & if false = O
    setArr(arrcopy)
    setisTurn(!isTurn) //changing the alternative values
   }
}

//deciding winner
const decideWinner=(arr)=>{
  const sets=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
for(let i=0 ; i<sets.length; i++){
  const[a,b,c] = sets[i];
  if(arr[a]!= null && arr[a] == arr[b] && arr[b] == arr[c])
  {
    console.log("Winner", arr[a])
    return arr[a]
  }
}
return null;
}

const winner=decideWinner(arr)

const restart=()=>{
setArr(Array(9).fill(null)) 
setisTurn(true)
}

  return (
    <div className="Tic-Tac" >
       {winner ? <Confetti width={width} height={height} gravity={0.02}/> : null}
      <h1 className="title">Tic Tac Toe</h1>
        <div className="board">
          {arr.map((val,index)=>
          ( <GameBox val={val} 
          clickk={()=>WhileClicking(index)}/>  //  step2 getting index value          
          ))} 
       </div>
       <Button onClick={restart} variant="contained" color="success">ReStart the Game</Button>
       {winner ? <h1>Congratulations <i>'{winner}' !!</i></h1> : null}
       
       
    </div>
  );
}



function GameBox({val,clickk}){
  // const[val,setVal]=useState(" ")
  const style={
    color:val =='X' ? 'green':'red',
  }
  return(
    <div onClick={clickk} style={style} className="box">  {/* step1 clicking */}
    {val}
    </div>
  )
  
}
