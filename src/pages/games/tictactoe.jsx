import Main from "../../components/tictactoe/Main/Main";
import Footer from "../../components/tictactoe/Footer/Footer";
import JoinRoomModal from "../../components/tictactoe/JoinRoomModal/JoinRoomModal";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_USER_URL);

const TicTacToe = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  // The following socket connection is responsible for joining a user to a specified room

  useEffect(() => {
    // console.log(roomCode);
    if (roomCode) {
      socket.emit("joinRoom", roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    const test = localStorage.getItem("test");
    if (test) {
      setRoomCode(test);
    }
  }, []);

  return (
    <>
      <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      />
      <Main socket={socket} roomCode={roomCode} />
      <Footer setShowModal={setShowModal} />
    </>
  );
};

export default TicTacToe;
