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
    };
  }


  mark_selected_tiles(ii) {
    if (!this.isTileSelected) {
      console.log(ii);
      let setFinishedTile = {...this.state.tiles[ii]};
      setFinishedTile.finished = true;
      let scoreUpdate = this.state.score;

      this.setState({tileSelected: ii, isTileSelected: true, ...rhia, score: scoreUpdate+1});
    } else {
        this.compare_tiles.bind(this, ii);

    }
  }


  tile_clicked(ii) {

    if (!this.state.clicksEnabled) {
      return;
    }

    let setFinishedTile = {...this.state.tiles[ii]};
    setFinishedTile.finished = true;
    let scoreUpdate = this.state.score;

    this.mark_selected_tiles(ii);
    this.setState({setFinishedTile, score: scoreUpdate+1});
  }

  compare_tiles(ii) {

    var tileSelected = this.state.tileSelected;


    if (this.state.tiles[tileSelected].letter == this.state.tiles[ii].letter) {
      this.state.score = this.state.score - 1;
      this.state.tiles[tile1].finished = true;
      this.state.tiles[tile2].finished = true;
      this.state.tileSelected = -1;
      this.state.isTileSelected = false;
      this.forceUpdate();
    } else {
      this.state.clicksEnabled = false;
      this.forceUpdate();
      window.setTimeout(this.wrong_tile.bind(this, ii), 1000);
    }

  }

  wrong_tile(ii) {
    this.state.tiles[this.state.tileSelected].finished = false;
    this.state.tiles[ii].finished = false;
    this.state.tileSelected1 = -1;
    this.state.isTileSelected = -1;
    this.state.clicksEnabled = true;
    this.forceUpdate();
  }

  // resets to initial state on selection of game restart
  restart_game(ev) {
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
    this.forceUpdate();
  }






  render() {
    let tiles  =  _.map(this.state.tiles, (tile, ii) => {
      return <ConstructTiles key={tile.key} number={tile.number} letter={tile.letter} finished={tile.finished} click={this.tile_clicked.bind(this, ii)}/>
    });


    let score = this.state.score;

      return (
          <div>
            <h2> Running Score: {score} </h2>
            <button id="restart-button" onClick={this.restart_game.bind(this)}>Restart</button>
          <table>
            <thead>
            <tr>
              <th id="display" colSpan="4">Memory</th>
            </tr>
            </thead>
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

  if (finished) {
    return <td id={number} onClick={props.click}>{letter}</td>;
  } else {
    return <td id={number} onClick={props.click}>"?"</td>;
  }
}





