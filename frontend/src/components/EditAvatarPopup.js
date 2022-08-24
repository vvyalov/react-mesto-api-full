import React from 'react';
import PopupWithForm from '../components/PopupWithForm'

function EditAvatarPopup(props) {

  const refAvatar = React.useRef()

  React.useEffect(() => {
    refAvatar.current.value = '';
  }, [props.isOpen]
  )

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(refAvatar.current.value);
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__info">
        <input id="avatar-link" type="url" name="link" placeholder="Ссылка на аватар" className="popup__input popup__input_type_link" ref={refAvatar} required />
        <span className="popup__error avatar-link-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;