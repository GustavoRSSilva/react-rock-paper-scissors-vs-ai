import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Carousel from './components/Carousel';

const moves = {
  rock: {
    beats: 'scissors',
  },
  scissors: {
    beats: 'paper',
  },
  paper: {
    beats: 'rock',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneMove: null,
      playerTwoMove: null,
      errorLog: null,
      result: null,
    };
  }

  resetGame() {
    this.setState({
      playerOneMove: null,
      playerTwoMove: null,
      errorLog: null,
      result: null,
    });
  }

  validMove(target) {
    return target && moves[target];
  }

  setMoves(playerOneMove, playerTwoMove = null) {
    //If the Player one move is not valid, we show a error message
    if(!this.validMove(playerOneMove)) {
      return this.setState({ errorLog: 'Invalid move' });
    }

    //If the Player two move is not valid, we show a error message
    if(playerTwoMove !== null && !this.validMove(playerTwoMove)) {
      return this.setState({ errorLog: 'Invalid move' });
    }

    //In order to not override a function parameter, we create an auxiliary variable
    let _playerTwoMove = playerTwoMove;
    const availableMoves = Object.keys(moves);

    //If player two move is null, we set it up
    if(_playerTwoMove === null) {
      _playerTwoMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    this.setState(
      { playerOneMove, playerTwoMove: _playerTwoMove },
      () => this.setGameResult()
    );
  }

  setGameResult() {
    const { playerOneMove, playerTwoMove } = this.state;

    if(!this.validMove(playerOneMove) || !this.validMove(playerTwoMove)) {
      return this.setState({ errorLog: 'Invalid operation!' });
    }

    switch (playerOneMove) {
      case playerTwoMove:
        return this.setState({ result: 'It\'s a draw' });

      case moves[playerTwoMove].beats:
        return this.setState({ result: 'You lose!' });

      default:
        return this.setState({ result: 'You win!' });
    }
  }

  renderResult() {
    return (
      <div className="App">
        <header>
          <h1 className="App-result-title">{this.state.result}</h1>
          <h2>
            <p>You picked <i className={`fa fa-hand-${this.state.playerOneMove}-o large`} /></p>
            <p>Vs</p>
            <p>Your opponent picked <i className={`fa fa-hand-${this.state.playerTwoMove}-o large`} /></p>
          </h2>
        </header>
        <button
          className="restart-btn"
          onClick={() => this.resetGame()}
        >
          Restart Game
        </button>
      </div>
    );
  }

  render() {
    // If the game over show the result and the restart button
    if(this.state.result) {
      return this.renderResult();
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rock, paper, scissors</h1>
          <h2>vs AI</h2>
        </header>
        <p>
          Please choose a move.
        </p>
        <div id="player-one-container">
          <button
            className="rock-btn yoo"
            onClick={() => this.setMoves('rock')}
          >
            <i className="fa fa-hand-rock-o large"></i>
          </button>
          <button
            className="scissors-btn"
            onClick={() => this.setMoves('scissors')}
          >
            <i className="fa fa-hand-scissors-o large"></i>
          </button>
          <button
            className="paper-btn"
            onClick={() => this.setMoves('paper')}
          >
            <i className="fa fa-hand-paper-o large"></i>
          </button>
        </div>
        <p>
          vs
        </p>
        <Carousel
          options={Object.keys(moves).map((move) => (<i className={`fa fa-hand-${move}-o large`} />))}
        />
        <p className="App-error-log">
          {this.state.errorLog}
        </p>
        <p className="app-footer">
          For more information about the project, see the <a href="https://gustavorsilva.github.io/blog/react-rock-paper-scissors/" target="_blank">blog post</a>.
        </p>
      </div>
    );
  }
}

export default App;
