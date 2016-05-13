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
  let className = "square"
  if(selected)
    className += " selected"
  else
    className += " white"
  return(<div className={className} onClick={onClick} style={{float: 'left'}}>{children}</div>)
}

const Piece = ({color, name, icon}) => {
  return(
    <div className="circle">{`${icon}`}</div>
  )
}
export default class HelloWorldApp extends React.Component {


  pieceInfo(x, y){
    var state = window.store.getState();
    var return_value = <div />
    state.pieces.forEach((i) => {
      if(i.x === x && i.y === y)
        return_value = <Piece {...i}/>
    });
    return return_value
  }

  componentWillMount(){
    window.store.subscribe(() => {
      this.forceUpdate();
    })
  }

  handleOnClick(x, y){
    console.log(x, y)
    var state = window.store.getState();
    if(state.selectedPiece.x){
      window.store.dispatch({ type: 'MOVE_PIECE', x1: state.selectedPiece.x, y1: state.selectedPiece.y, x2: x, y2: y  })
    }else{
      var selectedPiece = {}
      state.pieces.forEach((i) => {
        if(i.x === x && i.y === y)
          selectedPiece = { x: x, y: y }
      });
      window.store.dispatch({ type: 'SELECT_PIECE', ...selectedPiece })
    }
  }
  render () {
    var y = [8, 7, 6, 5, 4, 3, 2, 1];
    var x = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H'];
    return (
      <div className="container-fluid">
        <div className="chess-board" >
          {y.map((j, jindex) => {
            return(
              <Row key={j} style={{height: "12.5%", width: "100%"}} >
                {x.map((i, iindex) => {
                  if((jindex + iindex) % 2 === 0)
                    return <WhiteSquare key={iindex + jindex} onClick={this.handleOnClick.bind(this, i, j)}>{this.pieceInfo(i, j)}</WhiteSquare>
                  else
                    return <BlackSquare key={iindex + jindex}  onClick={ this.handleOnClick.bind(this, i, j) }>{this.pieceInfo(i, j)}</BlackSquare>
                })}
              </Row>

            )

          }) }
        </div>
      </div>
    )
  }

}
