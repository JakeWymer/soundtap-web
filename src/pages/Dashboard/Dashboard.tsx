import React, {useState, useEffect} from 'react';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import {FiPlus} from "react-icons/fi";
import Api from '../../common/api';
import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import Button, {ButtonProps, ButtonThemes} from '../../components/Button/Button';
import './Dashboard.css';

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
  const openModal = () => {
    setShowModal(true);
  }
  const modalProps: ModalProps = {
    showModal,
    closeModal: () => setShowModal(false),
    children: <CreateBoardForm submit={createBoard}/>,
    title: 'Create Board',
  };
  const boardArr = boards.map(board => {
    return (
      <div className="dashboard-board" key={board.id}>
        <div className="dashboard-board-img"></div>
        <h3 className="dashboard-board-title">{board.title}</h3>
      </div>
    );
  });
  const addBoardButton: ButtonProps = {
    handleClick: openModal,
    text: 'New Board',
    icon: <FiPlus />,
  }
  return (
    <div className="dashboard-wrap">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Boards</h2>
        <Button {...addBoardButton} />
      </div>
      <hr/>
      <div className="dashboard-boards">
        {boardArr}
      </div>
      <Modal {...modalProps}/>
    </div>
  );
}

export default Dashboard;
