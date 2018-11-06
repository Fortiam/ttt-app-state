'use strict';
/*eslint-env jquery*/

const state = (function(){
    //this is an iffe
    //the array holds our cell values, so we can render the array to the DOM
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
        this.cellsArray.forEach(function(element) {
            element.placed = '';
            element.isAWinner = false; //sad
        });
        this.victory = false;
    };
    // const checkForWin = function(){
    //         //we win if all rows match, or all columns match, or diagonals match.
    //         if(state.cellsArray[0].placed === state.cellsArray[3].placed && state.cellsArray[3].placed=== state.cellsArray[6].placed && state.cellsArray[6].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[0].isAWinner = true;
    //             state.cellsArray[3].isAWinner = true;
    //             state.cellsArray[6].isAWinner = true;
    //         }
    //         if(state.cellsArray[1].placed === state.cellsArray[4].placed && state.cellsArray[4].placed === state.cellsArray[7].placed&& state.cellsArray[7].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[1].isAWinner = true;
    //             state.cellsArray[4].isAWinner = true;
    //             state.cellsArray[7].isAWinner = true;
    //         }
    //         if(state.cellsArray[2].placed === state.cellsArray[5].placed&& state.cellsArray[5].placed === state.cellsArray[8].placed&& state.cellsArray[8].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[2].isAWinner = true;
    //             state.cellsArray[5].isAWinner = true;
    //             state.cellsArray[8].isAWinner = true;
    //         }
    //         if(state.cellsArray[0].placed === state.cellsArray[1].placed && state.cellsArray[1].placed=== state.cellsArray[2].placed && state.cellsArray[2].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[0].isAWinner = true;
    //             state.cellsArray[1].isAWinner = true;
    //             state.cellsArray[2].isAWinner = true;
    //         }
    //         if(state.cellsArray[3].placed === state.cellsArray[4].placed && state.cellsArray[4].placed === state.cellsArray[5].placed&& state.cellsArray[5].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[3].isAWinner = true;
    //             state.cellsArray[4].isAWinner = true;
    //             state.cellsArray[5].isAWinner = true;
    //         }
    //         if(state.cellsArray[6].placed === state.cellsArray[7].placed&& state.cellsArray[7].placed === state.cellsArray[8].placed&& state.cellsArray[8].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[6].isAWinner = true;
    //             state.cellsArray[7].isAWinner = true;
    //             state.cellsArray[8].isAWinner = true;
    //         }
    //         if(state.cellsArray[0].placed === state.cellsArray[4].placed && state.cellsArray[4].placed === state.cellsArray[8].placed&& state.cellsArray[8].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[0].isAWinner = true;
    //             state.cellsArray[4].isAWinner = true;
    //             state.cellsArray[8].isAWinner = true;
    //         }
    //         if(state.cellsArray[2].placed === state.cellsArray[4].placed&& state.cellsArray[4].placed === state.cellsArray[6].placed&& state.cellsArray[6].placed !== ''){
    //             this.victory = true;
    //             state.cellsArray[2].isAWinner = true;
    //             state.cellsArray[4].isAWinner = true;
    //             state.cellsArray[6].isAWinner = true;
    //         }
    // };
    const betterCheckForWin = function(){
        //check for win. this time DRY
        const wins = [[0, 1, 2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        //the numbers in the wins array will be placed into the cells' arrays.
        wins.forEach(function(InnerArray){
            //here InnerArray is each array one at a time..
            if(state.cellsArray[InnerArray[0]].placed !== '' && state.cellsArray[InnerArray[0]] === state.cellsArray[InnerArray[1]] &&  state.cellsArray[InnerArray[1]] === state.cellsArray[InnerArray[2]]){
                //here all the placed strings are X's or O's, i think
                this.victory = true;
                state.cellsArray[InnerArray[0]].isAWinner = true;
                state.cellsArray[InnerArray[1]].isAWinner = true;
                state.cellsArray[InnerArray[2]].isAWinner = true;
            }
        });
    };
    return { cellsArray, turnIsX, validateEmptyCell,placeValueintoCell,ResetCells, victory, betterCheckForWin};
}());

// Render functions
//redraw the board parent element with the rows/cells
function renderBoard(){
//1. build a `` of the html code for all cells.
  // 
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

// Event Listeners
//listener for cells  div class="board" parent->child class="cell"
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
    //1. empty all cells. does a forEach thru all cells and sets placed to ''.
    state.ResetCells();
    //2. this function needs to map thru state.cellsArray each element should render
    renderBoard();
    });
}

function init(){
    //place all event listeners here 1. cells. 2. newgame button  ok.
    handlerClickOnCell();//1. done test event.target.id: works.
    handlerClickOnNewGame();//2. done.
    renderBoard();//done
}
$(init());