import ReactOnRails from 'react-on-rails';
import HelloWorldApp from './chess_board.es6.jsx';
import {createStore} from 'redux'

// This is how react_on_rails can see the HelloWorldApp in the browser.
const initialState = { x: 'A', y: '1' };
function ChessBoard(state, action) {
  console.log(state, "undefined")
  if (typeof state === 'undefined') {
    console.log(state, "undefined")
    return initialState
  }
  switch(action.type){
    case 'MOVE_PIECE':
      return { x: action.x, y: action.y }
    default:
      return state
  }
};

const $store = createStore(ChessBoard, { x: 'A', y: '1' });
window.store = $store

ReactOnRails.register({ HelloWorldApp });
