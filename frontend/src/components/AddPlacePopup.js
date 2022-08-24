import React from 'react';
import PopupWithForm from '../components/PopupWithForm'

function AddPlacePopup(props) {

  const [card, setCard] = React.useState("")
  const [link, setLink] = React.useState("")

  React.useEffect(() => {
    if (props.isOpen) {
      setCard("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: card,
      link,
    });
  }

  function handleCardChange(e) {
    setCard(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm name="card" title="Новое место" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
      <fieldset className="popup__info">
        <input id="card" type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_title" minLength="2" maxLength="30" onChange={handleCardChange} value={card} required />
        <span className="popup__error card-error"></span>
        <input id="link" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" onChange={handleLinkChange} value={link} required />
        <span className="popup__error link-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup