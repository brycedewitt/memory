import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel}/>, root);
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      score: 1,
      tiles: [],
    };

    this.channel
        .join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp); });
  }

  got_view(view) {
    console.log(view);
    this.setState(view.game);
  }

  on_click(ev) {
    console.log("tile has been clicked, the on_click message has been pushed up the channel:", ev);
    this.channel.push("guess", {tile: ev})
        .receive("ok", this.got_view.bind(this));
  }

  on_reset() {
    console.log("reset message sent");
    this.channel.push("restart")
        .receive("ok", this.got_view.bind(this))
  }


  render() {

    let tiles  =  _.map(this.state.tiles, (tile, ii) => {
      return <ConstructTiles key={tile.key} number={tile.key} letter={tile.letter} finished={tile.finished} click={this.on_click.bind(this, tile.key)}/>
    });

    let score = this.state.score;

      return (
          <div>
            <h1 id="display" colSpan="4" className='header'>Memory</h1>
            <h2> Running Score: {score} </h2>
            <button id="restart-button" onClick={() => this.on_reset()}>Restart</button>
          <table>
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





