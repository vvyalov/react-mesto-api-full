import React from "react";
import { Link } from "react-router-dom"
import Entrance from '../components/Entrance'

function Register(props) {

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
    props.registration(password, email)
  }

  return (
    <>
      <Entrance
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}>
        <input id="email" type="email" name="email" placeholder="Email" className="entrance__input entrance__input_type_email" required minLength="2" maxLength="40" value={email || ''} onChange={handleEmailChange} />
        <input id="password" type="password" name="password" placeholder="Пароль" className="entrance__input entrance__input_type_password" required minLength="2" maxLength="40" value={password || ''} onChange={handlePasswordChange} />
      </Entrance>
      <div className="registered">
        <p className="registered__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="registered__enter">Войти</Link>
      </div></>
  );
}

export default Register;
