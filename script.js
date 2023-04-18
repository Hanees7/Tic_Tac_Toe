const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;


const winPosition  = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

// UI pr boxes ko empty krna
boxes.forEach((box, index) =>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all"; //change the position pointer cursor 
 
    // remove color after win the game
    box.classList  = `box box${index+1}`;
});


    // "new game" button hide
    newGameBtn.classList.remove("active");

    gameInfo.innerText=`Current Player : ${currentPlayer}`;
}

initGame(); 

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer= "X";
    }
    // Update in UI
    gameInfo.innerText = `Current Player : ${currentPlayer}`;

}


// Main Fx  GAMEE OVER
function checkGameOver(){
    let ans = "";

    winPosition.forEach((position) =>{
        // all 3 boxes are not empty nd should b same
       if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]])){

    // check winner is "X" or "O"
    if(gameGrid[position[0]] === "X")
    ans = "X";

    else
    ans = "O";
 
    // disable the pointer events when player win the match
     boxes.forEach((box) =>{
        box.style.pointerEvents = "none";
     }); 

 

    // now we know the winner then we mark green color on the boxes
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
}
     });

    //  it means we have a win ya "Winner mil chuka hai"
if(ans  !== ""){
    gameInfo.innerText  =`Winner Player : ${ans}`;
    newGameBtn.classList.add("active");
     return;
}

// lets check when match tie !
let fillCount  = 0;
gameGrid.forEach((box) =>{
    if(box !== ""){
        fillCount++;
    }
});

// board is Filled, game is TIE
if(fillCount ===9){
    gameInfo.innerText = "Game TieD !";
    newGameBtn.classList.add("active");
 }


}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //change in UI
        gameGrid[index] = currentPlayer;




        boxes[index].style.pointerEvents = "none"; //change the position pointer cursor 
        // swap kro turn ko x to y and viceversa
        swapTurn();

        // check koi jeeta to nai na
        checkGameOver();
    }
}

// click event listerner

boxes.forEach((box, index) => {
    // for every box we use it
box.addEventListener("click", () => {
    handleClick(index);
})
})

newGameBtn.addEventListener("click", initGame);