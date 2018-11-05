'use strict';
/*eslint-env jquery*/

const state = (function(){
    //this is an iffe
    //the array holds our cell values, so we can render the array to the DOM
    // cellsArray[{cellX.id || cellX.placed}]
    // state.cellsArray[0].id -> 0
    const cellsArray = [
        //row : 
         //[
            { id: 0, placed: ''},
            { id: 1, placed: ''},
            { id: 2, placed: ''},
        // ],
        // row2 : [
            { id: 3, placed: ''},
            { id: 4, placed: ''},
            { id: 5, placed: ''},
        // ],
        // row3 : [    
            { id: 6, placed: ''},
            { id: 7, placed: ''},
            { id: 8, placed: ''},
         ];
    //};
    //one variable to hold next click is X or O
    let turnIsX = false;//this var returns false make it an O. true make an X.
    const validateEmptyCell = function(whichCell){   //whichCell needs to be the id of the clicked cell.
        //method to check if target clicked cell has a non-empty placed string.
        if(state.cellsArray[whichCell].placed.length === 0){
            return true;//the cell is empty
        }
        throw new Error("That cell is not a legal move.");//the cell already has a placed X or O string.
    };
    const placeValueintoCell = function(targetCell){ //targetCell needs to be the id user clicked on
        //this method should 1. read is this turn an X or O.
        //2. change targetCell.placed to an X or O. ^^
        if(this.turnIsX){
            state.cellsArray[targetCell].placed = 'X';
            this.turnIsX = !this.turnIsX;
        } else {
             state.cellsArray[targetCell].placed = 'O';
             this.turnIsX = !this.turnIsX;
        }
    };
    const ResetCells = function(){
        //this method reads the cellsArray and sets the values to an empty string.
        this.cellsArray.forEach(element => element.placed = '');
    };
    return { cellsArray, turnIsX, validateEmptyCell,placeValueintoCell,ResetCells, };
}());

// State modification functions ok
//1. validate Cell  
//  invoke state.validateEmptyCell(event.target)
//2. change the value of a cell to X||O
//  invoke state.placeValueintoCell(event.target)

// Render functions
//redraw the board parent element with the rows/cells
function renderBoard(){
//1. build a `` of the html code for all cells.
  //  let newBoardCells = state.cellsArray.map(element => renderCell(element));
//2. send that var into parent element (board)
let newBoardCells = "";
state.cellsArray.forEach(function(element) {
    if(element.id === 0 || element.id === 3 || element.id === 6){
        newBoardCells += `<div class="row">`;
    }
    newBoardCells += `<div class="cell" id="${element.id}">
             <p>${element.placed}</p>
             </div>`;
    if(element.id === 2 || element.id === 5 || element.id === 8){
        newBoardCells += `</div>`;
    }
});

$('.board').html(newBoardCells);
}

// function renderCell(individualCell){
//     //this just needs to build one cell's html.
//     //return it ^^.
//     let rowOfCells = "";
//     if(individualCell.id === 0 || individualCell.id === 3 || individualCell.id === 6){
//         //console.log(individualCell.id); // should be 0, 3, 6. it also is...
//         rowOfCells += `<div class="row">`;
//     }
//     rowOfCells += `<div class="cell" id="${individualCell.id}">
//         <p>${individualCell.placed}</p>
//         </div>`;
//     if(individualCell.id === 2 || individualCell.id === 5 || individualCell.id === 8){
//        // console.log(individualCell.id); //this should be 2, 5, 8 to the console. ... it is..
//         rowOfCells += `</div>`;
//     }
//     return rowOfCells;
// }


// Event Listeners
//listener for cells  div class="board" parent->child class="cell"
function handlerClickOnCell(){
    $(".board").on("click", ".cell", function(event){// need to turn event.target into the id object
        //see what we are working with
        
        let targetId = $(event.target).closest('div').attr('id');
        console.log(targetId);
        // jquery traverse to get the id of object of the clicked cell. (state.cellsArray[me])
        //send ^ into lines 64,65 params.
        try {
        state.validateEmptyCell(targetId);//first check if legal move
        state.placeValueintoCell(targetId);//make the move
        }
        catch(err){
            console.log(err.message);
        }
        renderBoard();
    });
}

//listener for the New Game button id="new-game"
function handlerClickOnNewGame(){
    $("#new-game").on("click", function(){
    //1. empty all cells. does a forEach thru all cells and sets placed to ''.
    state.ResetCells();
    //2. this function needs to map thru state.cellsArray each element should render
    renderBoard();
    });
}

function init(){
    //place all event listeners here 1. cells. 2. newgame button  ok.
    handlerClickOnCell();//1. done? test event.target.id
    handlerClickOnNewGame();//2.
    renderBoard();
}
$(init());