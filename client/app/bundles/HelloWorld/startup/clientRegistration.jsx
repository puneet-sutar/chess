import ReactOnRails from 'react-on-rails';
import HelloWorldApp from './chess_board.es6.jsx';
import {createStore} from 'redux'
import Chess from './chess.js'
var chess = new Chess();

const femToPieces = (fem) => {
  var result = [];
  var peicesInfo = fem.split(' ')[0].split("/")
  peicesInfo.forEach((rowInfo) => {
    var row = [];
    rowInfo.split('').forEach((cellInfo) => {
      if(isNaN(cellInfo)){
        row.push(cellInfo)
      }else{
        var i = null;
        for (i = 0; i < cellInfo; i++) {
          row.push(null);
        }
      }
    });
    result.push(row)
  });
  return result
};

// This is how react_on_rails can see the HelloWorldApp in the browser.
const initialState = {

    pieces: femToPieces(chess.fen()),
    selectedPiece: { }

} ;

function ChessBoard(state=initialState, action) {
  console.log(action)
  switch(action.type){
    case 'MOVE_PIECE':
      debugger
      chess.move({ from: action.x1 + action.y1, to: action.x2 + action.y2 })
      return { ...state, pieces: femToPieces(chess.fen()), selectedPiece: {} };
    case 'SELECT_PIECE':
      return { ...state, selectedPiece: { x: action.x, y: action.y } }
    default:
      return state
  }
};


const $store = createStore(ChessBoard);
window.store = $store

ReactOnRails.register({ HelloWorldApp });

