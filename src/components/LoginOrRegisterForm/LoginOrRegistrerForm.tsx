import React, {useState} from 'react';

export interface LoginOrRegisterFormProps {
  submit: Function;
}

const LoginOrRegisterForm = (props: LoginOrRegisterFormProps) => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

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
      <button>Submit</button>
    </form>
  );
}

export default LoginOrRegisterForm;
