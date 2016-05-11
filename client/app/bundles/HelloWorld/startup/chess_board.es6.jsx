import React from 'react';
import {connect} from 'react-redux'

const Row = ({children, style}) => {
  return(<div className="row" style={style}>{children}</div>)
}

const BlackSquare = ({children, selected, onClick, piece}) => {
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

const Piece = () => {
  return(
    <div className="circle">P</div>
  )
}
export default class HelloWorldApp extends React.Component {

  pieceInfo(x, y){
    var state = window.store.getState();
    return(state && state.x === x && state.y === y)
  }

  componentWillMount(){
    window.store.subscribe(() => {
      this.forceUpdate();
    })
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
                  { var piece =  this.pieceInfo(i, j) ? <Piece /> : <div />}
                  if((jindex + iindex) % 2 === 0)
                    return <WhiteSquare key={iindex + jindex} onClick={() => {
                    console.log(window.store.getState())
                    window.store.dispatch({ type: 'MOVE_PIECE', x: i, y: j })}}>{piece}</WhiteSquare>
                  else
                    return <BlackSquare key={iindex + jindex}  onClick={ () => {window.store.dispatch({ type: 'MOVE_PIECE', x: i, y: j })}}>{piece}</BlackSquare>
                })}
              </Row>

            )

          }) }
        </div>
      </div>
    )
  }

}
