import ReactOnRails from 'react-on-rails';
import HelloWorldApp from './chess_board.es6.jsx';
import {createStore} from 'redux'

// This is how react_on_rails can see the HelloWorldApp in the browser.
const initialState = {
  pieces: [
    {x: 'A', y: 1, color: 'white', name: 'elephant', icon: "\u2656"},
    {x: 'B', y: 1, color: 'white', name: 'horse', icon: "\u2658"},
    {x: 'C', y: 1, color: 'white', name: 'camel', icon: "\u2657"},
    {x: 'D', y: 1, color: 'white', name: 'queen', icon: "\u2655"},
    {x: 'E', y: 1, color: 'white', name: 'king', icon: "\u2654"},
    {x: 'F', y: 1, color: 'white', name: 'camel', icon: "\u2657"},
    {x: 'G', y: 1, color: 'white', name: 'horse', icon: "\u2658"},
    {x: 'H', y: 1, color: 'white', name: 'elephant', icon: "\u2656"},
    {x: 'A', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'B', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'C', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'D', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'E', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'F', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'G', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},
    {x: 'H', y: 2, color: 'white', name: 'pawn', icon: "\u2659"},

    {x: 'A', y: 8, color: 'black', name: 'elephant', icon: "\u265C"},
    {x: 'B', y: 8, color: 'black', name: 'horse', icon: "\u265E"},
    {x: 'C', y: 8, color: 'black', name: 'camel', icon: "\u265D"},
    {x: 'D', y: 8, color: 'black', name: 'queen', icon: "\u265B"},
    {x: 'E', y: 8, color: 'black', name: 'king', icon: "\u265A"},
    {x: 'F', y: 8, color: 'black', name: 'camel', icon: "\u265D"},
    {x: 'G', y: 8, color: 'black', name: 'horse', icon: "\u265E"},
    {x: 'H', y: 8, color: 'black', name: 'elephant', icon: "\u265C"},
    {x: 'A', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'B', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'C', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'D', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'E', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'F', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'G', y: 7, color: 'black', name: 'pawn', icon: "\u265F"},
    {x: 'H', y: 7, color: 'black', name: 'pawn', icon: "\u265F"}
  ],
  selectedPiece: { }
};
function ChessBoard(state=initialState, action) {
  console.log(action)
  switch(action.type){
    case 'MOVE_PIECE':
      var pieces = state.pieces.map((piece) => {
        if(piece.x === action.x1 && piece.y === action.y1)
          return { ...piece, x: action.x2, y: action.y2 }
        else
          return piece
      });
      return { ...state, pieces: pieces, selectedPiece: {} };
    case 'SELECT_PIECE':
      return { ...state, selectedPiece: { x: action.x, y: action.y } }
    default:
      return state
  }
};

const $store = createStore(ChessBoard);
window.store = $store

ReactOnRails.register({ HelloWorldApp });
