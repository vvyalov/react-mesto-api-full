import React from 'react';


function ImagePopup(props) {
  return (
    <div className={`popup photo-popup ${props.card.name ? 'popup_open' : ''}`}>
      <button className="popup__button popup__button_type_close" onClick={props.onClose} />
      <img src={props.card.link} className="popup__image" alt={props.name} />
      <p className="popup__text">{props.card.name}</p>
    </div>
  );
}

export default ImagePopup;