import React from 'react';
import PopupWithForm from '../components/PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);


  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__info">
        <input id="name" type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_name" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
        <span className="popup__error name-error" />
        <input id="job" type="text" name="job" placeholder="О себе" className="popup__input popup__input_type_job" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
        <span className="popup__error job-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;