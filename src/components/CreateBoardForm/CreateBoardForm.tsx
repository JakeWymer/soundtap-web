import React, {useState} from 'react';
import {ModalFormProps} from '../../common/types';

const CreateBoardForm = (props: ModalFormProps) => {
  const [title, setTitle] = useState('');
  return (
    <form onSubmit={e => props.submit(e, title)}>
      <input type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}/>
      <button>Create</button>
    </form>
  );
}

export default CreateBoardForm;
