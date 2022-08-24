import React from 'react';


function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup ${props.name}-popup popup_open` : `popup ${props.name}-popup`}>
      <button className="popup__button popup__button_type_close" onClick={props.onClose} />
      <form name={`${props.name}-form`} className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__button popup__button_type_save">{props.buttonText}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;