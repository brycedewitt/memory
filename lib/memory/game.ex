defmodule Memory.Game do

  def new do
    %{score: 0,
      clicksEnabled: true,
      isTileSelected: false,
      tileSelected: 20,
      tiles: randomize_tiles()}
  end

  def client_view(game) do
    x = %{
    score: Map.get(game, :score),
    tiles: scrub_tiles(Map.get(game, :tiles))
    }
    x
  end

  def scrub_tiles(tiles) do
    x = Enum.map(tiles, fn x ->
      if Map.get(x, :finished) == false do
        %{x | letter: "hidden"}
        else
        y = x.letter
        %{x | letter: y}
      end
    end)
    x
  end

  def guess(game, tile) do
    score = Map.get(game, :score)
    oldTiles = Map.get(game, :tiles)
    newTile = Map.replace(Enum.at(Map.get(game, :tiles), tile), :finished, true)
    newBoard = List.replace_at(oldTiles, tile, newTile)
    newWorld = Map.replace(game, :tiles, newBoard)
    newScore = Map.replace(newWorld, :score, score + 1)
    if game.isTileSelected == true do
      check_against_guess(newScore, tile)
      else
        update_game_flag = %{newScore | isTileSelected: true}
        update_selected_tile = %{update_game_flag | tileSelected: tile}
        update_selected_tile
    end
  end

  def check_against_guess(game, tile) do
    tile1 = Map.get(Enum.at(Map.get(game, :tiles), game.tileSelected), :letter)
    tile2 = Map.get(Enum.at(Map.get(game, :tiles), tile), :letter)
    score = Map.get(game, :score)

    if tile1 == tile2 do
      updateScore = Map.put(game, :score, score-1)
      updateGame = Map.put(updateScore, :tileSelected,  false)
      updateGame
    else
        IO.inspect(game)
        xx = Map.get(game, :tileSelected)
        yy = Map.get(game, :tiles)
        updateTile1 = Map.put(Enum.at(Map.get(game, :tiles), tile), :finished, false)
        updateTile2 = Map.put(Enum.at(Map.get(game, :tiles), xx), :finished, false)
        game1 = List.replace_at(yy, tile, updateTile1)
        game2 = List.replace_at(game1, xx, updateTile2)
        game3 = Map.put(game, :tiles, game2)
        game4 = Map.put(game3, :score, score+1)
        game5 = Map.put(game4, :isTileSelected, false)
        game5

    end
  end

  def reset() do
    x = new()
    IO.inspect(x)
    x
  end

  def randomize_tiles() do
    temp = ~w(
      A B C D E F G H A B C D E F G H
    )
    letters = Enum.shuffle(temp);

    x = [
      %{key: 0, letter: Enum.at(letters, 0), finished: false},
      %{key: 1, letter: Enum.at(letters, 1), finished: false},
      %{key: 2, letter: Enum.at(letters, 2), finished: false},
      %{key: 3, letter: Enum.at(letters, 3), finished: false},
      %{key: 4, letter: Enum.at(letters, 4), finished: false},
      %{key: 5, letter: Enum.at(letters, 5), finished: false},
      %{key: 6, letter: Enum.at(letters, 6), finished: false},
      %{key: 7, letter: Enum.at(letters, 7), finished: false},
      %{key: 8, letter: Enum.at(letters, 8), finished: false},
      %{key: 9, letter: Enum.at(letters, 9), finished: false},
      %{key: 10, letter: Enum.at(letters, 10), finished: false},
      %{key: 11, letter: Enum.at(letters, 11), finished: false},
      %{key: 12, letter: Enum.at(letters, 12), finished: false},
      %{key: 13, letter: Enum.at(letters, 13), finished: false},
      %{key: 14, letter: Enum.at(letters, 14), finished: false},
      %{key: 15, letter: Enum.at(letters, 15), finished: false}]
    x
  end





end
