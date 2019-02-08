defmodule MemoryWeb.GameChannel do
  # use MemoryWeb, :channel
  use Phoenix.Channel

  alias Memory.Game


  def join("games:" <> name, payload, socket) do
    if true do  ## was authorized?(payload)
      IO.inspect(name)
      game = Memory.BackupAgent.get(name) || Game.new()
      socket = socket
               |> assign(:game, game)
               |> assign(:name, name)
      Memory.BackupAgent.put(name, game)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("guess", %{"tile" => ii}, socket) do
    IO.inspect("handle_in method for guess message has been called")
    name = socket.assigns[:name]
    game = Game.guess(socket.assigns[:game], ii)
    socket = assign(socket, :game, game)
    Memory.BackupAgent.put(name, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("restart", payload, socket) do
    game = Game.new()
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end
end
