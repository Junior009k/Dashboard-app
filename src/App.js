import {useEffect, useState} from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import Login from "./auth/Login";

import { useAuth } from "./auth/AuthContext";
import { getBoards,createBoard } from "./services/boardService";

import "./App.css";

function App() {
  const {  isAuthenticated, token} = useAuth();

  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] =
    useState(null);

  useEffect(() => {
    async function loadBoards() {
      try {
        const data = await getBoards(token);

        setBoards(data);

        if (data.length > 0) {
          setSelectedBoardId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadBoards();
  }, [token]);

  function handleSelectBoard(boardId) {
    setSelectedBoardId(boardId);
  }

  const selectedBoard = boards.find(
    (board) => board.id === selectedBoardId
  );

  if (!isAuthenticated) {
    return <Login />;
  }
  async function handleCreateBoard() {
    try {
      const newBoard = await createBoard({
        name: "Nuevo tablero",
        ownerId: "15b49785-0160-401c-e81e-08df1ceafe89"
      });
  
      setBoards((previousBoards) => [
        ...previousBoards,
        newBoard
      ]);
  
      setSelectedBoardId(newBoard.id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <main className="app">
      <Header />

      <div className="app__content">
        <Sidebar
          boards={boards}
          onSelectBoard={handleSelectBoard}
          selectedBoardId={selectedBoardId}
          onCreateBoard={handleCreateBoard}
        />

        <section className="app__main">
          <Board
            board={selectedBoard}
            token={token}
          />
        </section>
      </div>
    </main>
  );
}

export default App;