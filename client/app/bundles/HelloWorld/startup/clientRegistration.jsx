import ReactOnRails from 'react-on-rails';
import HelloWorldApp from './chess_board.es6.jsx';
import {createStore} from 'redux'

// This is how react_on_rails can see the HelloWorldApp in the browser.
const initialState = {
  pieces: [
    {x: 'A', y: 1, color: 'white', name: 'elephant'},
    {x: 'B', y: 1, color: 'white', name: 'horse'},
    {x: 'C', y: 1, color: 'white', name: 'camel'},
    {x: 'D', y: 1, color: 'white', name: 'queen'},
    {x: 'E', y: 1, color: 'white', name: 'king'},
    {x: 'F', y: 1, color: 'white', name: 'camel'},
    {x: 'G', y: 1, color: 'white', name: 'horse'},
    {x: 'H', y: 1, color: 'white', name: 'elephant'},
    {x: 'A', y: 2, color: 'white', name: 'pawn'},
    {x: 'B', y: 2, color: 'white', name: 'pawn'},
    {x: 'C', y: 2, color: 'white', name: 'pawn'},
    {x: 'D', y: 2, color: 'white', name: 'pawn'},
    {x: 'E', y: 2, color: 'white', name: 'pawn'},
    {x: 'F', y: 2, color: 'white', name: 'pawn'},
    {x: 'G', y: 2, color: 'white', name: 'pawn'},
    {x: 'H', y: 2, color: 'white', name: 'pawn'}
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
