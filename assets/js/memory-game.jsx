import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Memory />, root);
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      clicksEnabled: true,
      isTileSelected: false,
      tileSelected: 20,
      tiles: [
        {key: 0, letter: "A", finished: false},
        {key: 1, letter: "B", finished: false},
        {key: 2, letter: "C", finished: false},
        {key: 3, letter: "D", finished: false},
        {key: 4, letter: "E", finished: false},
        {key: 5, letter: "F", finished: false},
        {key: 6, letter: "G", finished: false},
        {key: 7, letter: "H", finished: false},
        {key: 8, letter: "A", finished: false},
        {key: 9, letter: "B", finished: false},
        {key: 10, letter: "C", finished: false},
        {key: 11, letter: "D", finished: false},
        {key: 12, letter: "E", finished: false},
        {key: 13, letter: "F", finished: false},
        {key: 14, letter: "G", finished: false},
        {key: 15, letter: "H", finished: false}],
    };
  }


  mark_selected_tiles(ii) {
    if (!this.state.isTileSelected) {
      let setFinishedTiles = [...this.state.tiles];
      let setFinishedTile = {...setFinishedTiles[ii]};
      setFinishedTile.finished = true;
      setFinishedTiles[ii] = setFinishedTile;

      setFinishedTile.finished = true;
      let scoreUpdate = this.state.score;

      this.setState({tileSelected: ii, isTileSelected: true, tiles: setFinishedTiles, score: scoreUpdate+1});
      return;
    } else {
      let setFinishedTiles = [...this.state.tiles];
      let setFinishedTile = {...setFinishedTiles[ii]};
      setFinishedTile.finished = true;
      setFinishedTiles[ii] = setFinishedTile;

      this.setState({tiles: setFinishedTiles});
      this.compare_tiles(ii);
    }
  }


  tile_clicked(ii) {

    if (!this.state.clicksEnabled) {
      return;
    }

    let setFinishedTile = {...this.state.tiles[ii]};
    setFinishedTile.finished = true;

    this.mark_selected_tiles(ii);
  }

  compare_tiles(ii) {

    if (this.state.tiles[this.state.tileSelected].letter == this.state.tiles[ii].letter) {
      var newScore = this.state.score - 1;

      var copyTiles = [...this.state.tiles];
      var setTile1 = {...copyTiles[this.state.tileSelected]};
      var setTile2 = {...copyTiles[ii]};

      setTile1.finished = true;
      setTile2.finished = true;

      copyTiles[this.state.tileSelected] = setTile1;
      copyTiles[ii] = setTile2;

      this.setState({tileSelected: 0, isTileSelected: false, tiles: copyTiles, score: newScore})
    } else {
      this.state.clicksEnabled = false;
      this.forceUpdate();
      window.setTimeout(this.wrong_tile.bind(this, ii), 1000);
    }

  }

  wrong_tile(ii) {
    this.state.tiles[this.state.tileSelected].finished = false;
    this.state.tiles[ii].finished = false;
    this.state.isTileSelected = false;
    this.state.clicksEnabled = true;
    this.forceUpdate();
  }

  // resets to initial state on selection of game restart
  restart_game() {
    this.setState({
      score: 0,
      isRunning: true,
      isTileSelected: false,
      tileSelected: 0,
      tiles: [
        {key: 0, letter: "A", finished: false},
        {key: 1, letter: "B", finished: false},
        {key: 2, letter: "C", finished: false},
        {key: 3, letter: "D", finished: false},
        {key: 4, letter: "E", finished: false},
        {key: 5, letter: "F", finished: false},
        {key: 6, letter: "G", finished: false},
        {key: 7, letter: "H", finished: false},
        {key: 8, letter: "A", finished: false},
        {key: 9, letter: "B", finished: false},
        {key: 10, letter: "C", finished: false},
        {key: 11, letter: "D", finished: false},
        {key: 12, letter: "E", finished: false},
        {key: 13, letter: "F", finished: false},
        {key: 14, letter: "G", finished: false},
        {key: 15, letter: "H", finished: false}],
    });

    var shuffleTiles = [
      {key: 0, letter: "A", finished: false},
      {key: 1, letter: "B", finished: false},
      {key: 2, letter: "C", finished: false},
      {key: 3, letter: "D", finished: false},
      {key: 4, letter: "E", finished: false},
      {key: 5, letter: "F", finished: false},
      {key: 6, letter: "G", finished: false},
      {key: 7, letter: "H", finished: false},
      {key: 8, letter: "A", finished: false},
      {key: 9, letter: "B", finished: false},
      {key: 10, letter: "C", finished: false},
      {key: 11, letter: "D", finished: false},
      {key: 12, letter: "E", finished: false},
      {key: 13, letter: "F", finished: false},
      {key: 14, letter: "G", finished: false},
      {key: 15, letter: "H", finished: false}];
    for (var i = shuffleTiles.length - 1; i > 0; i--) {
      var x = Math.floor(Math.random() * (i + 1));
      var acc = shuffleTiles[i];
      shuffleTiles[i] = shuffleTiles[x];
      shuffleTiles[x] = acc;
    }

    this.setState({tiles: shuffleTiles});
  }






  render() {
    let tiles  =  _.map(this.state.tiles, (tile, ii) => {
      return <ConstructTiles key={tile.key} number={tile.number} letter={tile.letter} finished={tile.finished} click={this.tile_clicked.bind(this, ii)}/>
    });


    let score = this.state.score;

      return (
          <div>
            <h1 id="display" colSpan="4" className='header'>Memory</h1>
            <h2> Running Score: {score} </h2>
            <button id="restart-button" onClick={this.restart_game.bind(this)}>Restart</button>
          <table class="center">
            <tbody>
            <tr>
            {tiles[0]}
            {tiles[1]}
            {tiles[2]}
            {tiles[3]}
            </tr>
            <tr>
            {tiles[4]}
            {tiles[5]}
            {tiles[6]}
            {tiles[7]}
            </tr>
            <tr>
            {tiles[8]}
            {tiles[9]}
            {tiles[10]}
            {tiles[11]}
            </tr>
            <tr>
            {tiles[12]}
            {tiles[13]}
            {tiles[14]}
            {tiles[15]}
            </tr>
            </tbody>
          </table>
          </div>);

  }

}

function ConstructTiles(props) {
  let {number, letter, finished} = props;
  let className;
  if (finished) {
    className = 'finished';
  } else {
    className = 'unfinished';
  }

  if (finished) {
    return <td id={number} onClick={props.click} className={className}>{letter}</td>;
  } else {
    return <td id={number} onClick={props.click} className={className}>   </td>;
  }
}





