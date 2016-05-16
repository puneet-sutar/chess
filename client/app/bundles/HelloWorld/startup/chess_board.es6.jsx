import React from 'react';
import {connect} from 'react-redux'

const Row = ({children, style}) => {
  return(<div className="row" style={style}>{children}</div>)
}

const BlackSquare = ({children, selected, onClick}) => {
  let className = "square "
  if(selected)
    className += " selected"
  else
    className += " black"
  return(<div className={className} onClick={onClick} style={{float: 'left'}}>{children}</div>)
}

const WhiteSquare = ({children, selected, onClick, piece}) => {
  let className = "square";
  if(selected)
    className += " selected";
  else
    className += " white";
  return(<div className={className} onClick={onClick} style={{float: 'left'}}>{children}</div>)
}

const pieceToIconMapping = {
  R: "\u2656",
  N: "\u2658",
  B: "\u2657",
  Q: "\u2655",
  K: "\u2654",
  P: "\u2659",
  r: "\u265C",
  n: "\u265E",
  b: "\u265D",
  q: "\u265B",
  k: "\u265A",
  p: "\u265F"
};

const Piece = ({piece}) => {
  return(
    <div className="circle">{pieceToIconMapping[piece]}</div>
  )
}
export default class HelloWorldApp extends React.Component {


  pieceInfo(i, j){
    var state = window.store.getState();
    var return_value = <div />
    var piece = state.pieces[j][i];
    if(piece)
      return_value = <Piece piece={piece}/>
    return return_value
  }

  componentWillMount(){
    window.store.subscribe(() => {
      this.forceUpdate();
    })
  }

  handleOnClick(x, y, i, j){
    console.log(x, y)
    var state = window.store.getState();
    if(state.selectedPiece.x){
      window.store.dispatch({ type: 'MOVE_PIECE', x1: state.selectedPiece.x, y1: state.selectedPiece.y, x2: x, y2: y  })
    }else{
      var selectedPiece = {}
      var piece = state.pieces[j][i];
      if(piece)
        selectedPiece = { x: x, y: y }
      window.store.dispatch({ type: 'SELECT_PIECE', ...selectedPiece })
    }
  }
  render () {
    var y = [8, 7, 6, 5, 4, 3, 2, 1];
    var x = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h'];
    return (
      <div className="container-fluid">
        <div className="chess-board" >
          {y.map((j, jindex) => {
            return(
              <Row key={j} style={{height: "12.5%", width: "100%"}} >
                {x.map((i, iindex) => {
                  if((jindex + iindex) % 2 === 0)
                    return <WhiteSquare key={iindex + jindex} onClick={this.handleOnClick.bind(this, i, j, iindex, jindex)}>{this.pieceInfo(iindex,jindex)}</WhiteSquare>
                  else
                    return <BlackSquare key={iindex + jindex}  onClick={ this.handleOnClick.bind(this, i, j, iindex, jindex) }>{this.pieceInfo(iindex,jindex)}</BlackSquare>
                })}
              </Row>

            )

          }) }
        </div>
      </div>
    )
  }

}
