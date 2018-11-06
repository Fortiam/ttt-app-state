'use strict';
/*eslint-env jquery*/
const state = (function(){
    const cellsArray = [
        { id: 0, placed: '', isAWinner: false},
        { id: 1, placed: '', isAWinner: false},
        { id: 2, placed: '', isAWinner: false},
        { id: 3, placed: '', isAWinner: false},
        { id: 4, placed: '', isAWinner: false},
        { id: 5, placed: '', isAWinner: false},
        { id: 6, placed: '', isAWinner: false},
        { id: 7, placed: '', isAWinner: false},
        { id: 8, placed: '', isAWinner: false},
    ];
    //one variable to hold next click is X or O
    let turnIsX = false;//this var returns false make it an O. true make an X.
    let victory = false; //change this at winning check to stop further moves.
    const validateEmptyCell = function(whichCell){
        //method to check if target clicked cell has a non-empty placed string.
        if(state.cellsArray[whichCell].placed.length === 0){
            return true;//the cell is empty
        }
        throw new Error("That cell is not a legal move.");//the cell already has a placed X or O string.
    };
    const placeValueintoCell = function(targetCell){
        //this method should 1- Read is this turn an X or O?
        //2- change targetCell. placed to an X or O. ^^
        (this.turnIsX)? state.cellsArray[targetCell].placed = 'X' : state.cellsArray[targetCell].placed = 'O';
        this.turnIsX = !this.turnIsX;
    };
    const ResetCells = function(){
        //this method reads the cellsArray and sets the values to an empty string.
        this.cellsArray.forEach(function(element) {
            element.placed = '';
            element.isAWinner = false; //sad
        });
        this.victory = false;
    };
    const betterCheckForWin = function(){
        //check for win. this time DRY
        const wins = [[0, 1, 2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        //the numbers in the wins array will be placed into the cells' arrays.
        wins.forEach(function(InnerArray){
            //here InnerArray is each array one at a time..
            if(state.cellsArray[InnerArray[0]].placed !== '' && state.cellsArray[InnerArray[0]].placed === state.cellsArray[InnerArray[1]].placed && state.cellsArray[InnerArray[1]].placed === state.cellsArray[InnerArray[2]].placed){
                //here all the placed strings are X's or O's
                state.victory = true;
                state.cellsArray[InnerArray[0]].isAWinner = true;
                state.cellsArray[InnerArray[1]].isAWinner = true;
                state.cellsArray[InnerArray[2]].isAWinner = true;
            }
        });
    };
    return { cellsArray, turnIsX, validateEmptyCell,placeValueintoCell,ResetCells, victory, betterCheckForWin};
}());

//redraw the board parent element with the rows/cells
function renderBoard(){
//1. build a var of the html code for all cells.
//2. send that var into parent element (board)
    let newBoardCells = "";
    state.cellsArray.forEach(function(element) {
    if(element.id === 0 || element.id === 3 || element.id === 6){
        newBoardCells += `<div class="row">`;
    }
    if(element.isAWinner){
        newBoardCells += `<div class="cell win" id="${element.id}">
             <p>${element.placed? element.placed : '&nbsp;'}</p>
             </div>`;
    }else {
    newBoardCells += `<div class="cell" id="${element.id}">
             <p>${element.placed? element.placed : '&nbsp;'}</p>
             </div>`;
    }
    if(element.id === 2 || element.id === 5 || element.id === 8){
        newBoardCells += `</div>`;
    }
    });
    $('.board').html(newBoardCells);
}

// event listener for cells  div class="board" parent-> child class="cell"
function handlerClickOnCell(){
    $(".board").on("click", ".cell", function(event){
        // need to turn event.target into the id object
        let targetId = $(event.target).closest('div').attr('id');
        // jquery traverse to get the id of object of the clicked cell. (state.cellsArray[me])
        //send ^ into   params below   \/
        try {
            state.validateEmptyCell(targetId);//first check if legal move
            if(!state.victory){
                //here we can only place move if nobody has won
                state.placeValueintoCell(targetId);//make the move
                state.betterCheckForWin();//did we win?
            }
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
    // empty all cells.
    state.ResetCells();
    renderBoard();
    });
}

function init(){
    //place all event listeners here, and render.
    handlerClickOnCell();
    handlerClickOnNewGame();
    renderBoard();
}
$(init());