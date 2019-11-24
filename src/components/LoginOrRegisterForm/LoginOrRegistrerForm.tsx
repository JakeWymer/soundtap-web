import React, {useState} from 'react';
import {ModalFormProps} from '../../common/types';
import Button, { ButtonProps } from '../Button/Button';

const LoginOrRegisterForm = (props: ModalFormProps) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const handleClick = (e: React.FormEvent) => {
    props.submit(e, email, password);
  }
  const buttonProps: ButtonProps = {
    text: 'Submit',
    handleClick
  }
  return (
    <form onSubmit={(e: React.FormEvent) => props.submit(e, email, password)}>
      <label htmlFor="email">Email</label>
      <input type="text" 
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}/>
      <label htmlFor="password">Password</label>
      <input type="password"
        value={password}
        name="password"
        onChange={e => setPassword(e.target.value)}/>
      <Button {...buttonProps}/>
    </form>
  );
}

export default LoginOrRegisterForm;
