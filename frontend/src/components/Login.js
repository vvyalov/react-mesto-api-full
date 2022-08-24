import React from 'react'
import Entrance from '../components/Entrance'

function Login({ onLogin }) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')


  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(password, email)
  }

  return (
    <Entrance
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}>
      <input id="email" type="email" name="email" placeholder="Email" className="entrance__input entrance__input_type_email" required minLength="2" maxLength="40" value={email || ''} onChange={handleEmailChange} />
      <input id="password" type="password" name="password" placeholder="Пароль" className="entrance__input entrance__input_type_password" required minLength="2" maxLength="40" value={password || ''} onChange={handlePasswordChange} />
    </Entrance>
  );
}

export default Login;
