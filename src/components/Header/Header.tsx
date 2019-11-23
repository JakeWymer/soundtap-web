import React, {useState} from 'react';
import axios from 'axios';
import Api from '../../common/api';
import Modal, {ModalProps} from '../Modal/Modal';
import LoginOrRegisterForm from '../LoginOrRegisterForm/LoginOrRegistrerForm';
import './Header.css';

enum ModalOptions {
  REGISTER = 'register',
  LOGIN = 'login',
}

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalOption, setModalOption] = useState('');
  const api = new Api();
  const register = async (e: React.FormEvent, email: String, password: String) => {
    e.preventDefault();
    try {
      await api.post(`/auth/register`, {'email': email, 'password': password});
    } catch(err) {
      console.log(err);
    } finally {
      setShowModal(false);
    }
  }
  const login = async (e: React.FormEvent, email: String, password: String) => {
    e.preventDefault();
    try {
      await api.post(`/auth/login`, {'email': email, 'password': password});
    } catch(err) {
      console.log(err);
    } finally {
      setShowModal(false);
    }
  }
  const loginOrRegister = (option: ModalOptions)=> {
    setShowModal(true);
    setModalOption(option);
  }
  const submitCallback = 
    modalOption === ModalOptions.REGISTER ?
      register :
      login;
  const modalProps: ModalProps = {
    showModal,
    closeModal: () => setShowModal(false),
    children: <LoginOrRegisterForm submit={submitCallback}/>
  };

  return (
    <div className='header-wrap'>
      <h1>SoundTap</h1>
      <div className='header-nav'>
        <h3 className='header-nav-link' onClick={e => loginOrRegister(ModalOptions.REGISTER)}>Sign up</h3>
        <h3 className='header-nav-link' onClick={e => loginOrRegister(ModalOptions.LOGIN)}>Log in</h3>
      </div>
      <Modal {...modalProps}/>
    </div>
  );
}

export default Header;