import React, {useState} from 'react';
import {redirect} from '../../common/util';
import Api from '../../common/api';
import Modal, {ModalProps} from '../Modal/Modal';
import LoginOrRegisterForm from '../LoginOrRegisterForm/LoginOrRegistrerForm';
import './Header.css';
import { JWT_TOKEN_NAME } from '../../common/constants';

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
      redirect('/dashboard');
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
      redirect('/dashboard');
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

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_NAME);
    redirect('/');
  }

  let submitCallback = login;
  let title = ModalOptions.LOGIN;
  if(modalOption === ModalOptions.REGISTER) {
    submitCallback = register;
    title = ModalOptions.REGISTER;
  }

  const modalProps: ModalProps = {
    showModal,
    closeModal: () => setShowModal(false),
    children: <LoginOrRegisterForm submit={submitCallback}/>,
    title,
  };

  return (
    <div className='header-wrap'>
      <h1 className="header-title" onClick={() => redirect('/')}>SoundTap</h1>
      {!localStorage.getItem(JWT_TOKEN_NAME) ? (
        <div className='header-nav'>
          <h3 className='header-nav-link' onClick={e => loginOrRegister(ModalOptions.REGISTER)}>Sign up</h3>
          <h3 className='header-nav-link' onClick={e => loginOrRegister(ModalOptions.LOGIN)}>Log in</h3>
        </div>
        ) : (
        <div className='header-nav'>
          <h3 className='header-nav-link' onClick={() => redirect('/dashboard')}>Boards</h3>
          <h3 className='header-nav-link' onClick={logout}>Log out</h3>
        </div>
        )
      } 
      <Modal {...modalProps}/>
    </div>
  );
}

export default Header;