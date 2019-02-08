// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";

// Import local files
//
// Local files can be imported directly using relative paths, for example:

import game_init from "./memory-game";
import socket from "./socket";

// Now that you are connected, you can join channels with a topic:
//let channel = socket.channel("games:memory", {})
//channel.join()
 //   .receive("ok", resp => { console.log("Joined successfully", resp) })
  //  .receive("error", resp => { console.log("Unable to join", resp) })

// URL Parsing function from HTML-online.com
// https://html-online.com/articles/get-url-parameters-javascript/
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function start() {
  let id = getUrlVars()['game'];
  let root = document.getElementById('root');
  console.log(root)
  if (root) {
    let channel = socket.channel("games:" + id, {});
    // We want to join in the react component.
    game_init(root, channel);
  }
}



$(start);

