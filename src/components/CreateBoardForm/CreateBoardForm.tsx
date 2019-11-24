import React, {useState} from 'react';
import {ModalFormProps} from '../../common/types';
import Button, { ButtonProps } from '../Button/Button';

const CreateBoardForm = (props: ModalFormProps) => {
  const [title, setTitle] = useState('');
  const handleClick = (e: React.FormEvent) => {
    props.submit(e, title);
  }
  const buttonProps: ButtonProps = {
    text: 'Create',
    handleClick 
  }
  return (
    <div>
      <form onSubmit={e => props.submit(e, title)}>
        <label htmlFor="email">Title</label>
        <input type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}/>
        <Button {...buttonProps}/>
      </form>
    </div>
  );
}

export default CreateBoardForm;
