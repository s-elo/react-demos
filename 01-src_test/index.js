import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Hello from './component/Hello';

// class Square extends React.Component {
//   handleSquareClick() {
//     this.props.squareClick();
//   }

//   render() {
//     return (
//       <button className="square" onClick={this.handleSquareClick.bind(this)}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const val of lines) {
    const [a, b, c] = val;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.squareClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.square[i]}
        squareClick={this.props.handleClickOnBoard.bind(this, i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: new Array(9).fill(null)
        },
      ],

      xIsNext: true,

      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentSquare = history[history.length - 1].squares;

    const nextSquare = currentSquare.slice();

    // someone won or the square has beenn filled
    if (calculateWinner(nextSquare) || nextSquare[i]) {
      return;
    }

    nextSquare[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: nextSquare
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const currentSquare = history[this.state.stepNumber].squares;

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move:
        'Go to start';

      return (
        <li key={ move }>
          <button onClick={ this.jumpTo.bind(this, move) }>{ desc }</button>
        </li>
      );
    });

    let status = "";
    let result = calculateWinner(currentSquare);

    if (result) {
      status = `Winner: ${result}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={currentSquare}
            handleClickOnBoard={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <Hello/>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
