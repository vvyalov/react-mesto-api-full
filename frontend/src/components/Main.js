import { useContext } from 'react';
import Card from '../components/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className='main'>
      <section className="profile">
        <div className="profile__container">
          <img id="avatar" src={currentUser.avatar} alt="аватар" className="profile__avatar" />
          <button className="profile__button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <button className="profile__edit-button" onClick={onEditProfile} />
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} />
      </section>
      <section className="elemants">
        {cards.map((card) =>
          (<Card card={card} key={card._id} name={card.name} link={card.link} like={card.likes} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
        )}
      </section>
    </main>
  );
}

export default Main;