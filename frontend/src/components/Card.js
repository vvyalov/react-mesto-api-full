import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete ${isOwn ? '' : 'element__delete_none'}`);
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`element__like_button ${isLiked ? 'element__like_active' : ''}`);


  return (

    <li className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
      <div className="element__title">
        <h2 className="element__text">{props.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like_number">{props.like.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;