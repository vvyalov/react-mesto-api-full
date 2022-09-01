/* eslint-disable jsx-a11y/alt-text */
import notRegistration from "../images/Bad.svg"
import goodRegistration from '../images/Good.svg'

function InfoTooltip({ isOpen, onClose, login }) {
  return (
    <div className={isOpen ? `popup popup_open` : `popup`}>
      <button className="popup__button popup__button_type_close" onClick={onClose} />
      <div className="tooltip-popup">
        <img src={login ? goodRegistration : notRegistration} className='tooltip-popup__image' />
        <p className='tooltip-popup__text'> {login ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
