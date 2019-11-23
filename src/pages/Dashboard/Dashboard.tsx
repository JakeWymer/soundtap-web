import React, {useState, useEffect} from 'react';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import Api from '../../common/api';
import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';

type Board = {
  id: number;
  title: string;
}

const Dashboard = () => {
  const api = new Api();
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  useEffect(() => {
    const getBoards = async () => {
      try {
        const boards = await api.get('/api/boards');
        return boards;
      } catch (err) {
        console.log(err);
      }
    }
    getBoards().then(boards => setBoards(boards))
  }, []);
  const createBoard = async (event: React.FormEvent, title: string) => {
    event.preventDefault();
    try {
      const boards = await api.post('/api/boards', {title});
      setBoards(boards);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  const modalProps: ModalProps = {
    showModal,
    closeModal: () => setShowModal(false),
    children: <CreateBoardForm submit={createBoard}/>
  };
  const boardArr = boards.map(board => {
    return (
      <div key={board.id}>
        <h3>{board.title}</h3>
      </div>
    );
  });
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => setShowModal(true)}>Add board</button>
      {boardArr}
      <Modal {...modalProps}/>
    </div>
  );
}

export default Dashboard;
