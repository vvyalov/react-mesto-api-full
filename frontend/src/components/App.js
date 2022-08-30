import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import '../index.css'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import PopupWithForm from '../components/PopupWithForm'
import ImagePopup from '../components/ImagePopup'
import EditProfilePopup from '../components/EditProfilePopup'
import EditAvatarPopup from '../components/EditAvatarPopup'
import AddPlacePopup from '../components/AddPlacePopup'
import Register from '../components/Register'
import Login from '../components/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import InfoTooltip from '../components/InfoTooltip'
import { api } from '../utils/Api'
import { auth } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext'



function App() {
  const history = useHistory()
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' })
  const [cards, setCards] = React.useState([])
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [login, setLogin] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch(err => console.log(err));
      api.getInitialCards()
        .then((data) => {
          setCards(data)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])



  function closeAllPopups() {
    setEditAvatarPopup(false)
    setEditProfilePopup(false)
    setAddPlacePopup(false)
    setInfoTooltip(false)
    setSelectedCard({})
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleEditAvatarClick() {
    setEditAvatarPopup(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data, token)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api.newAvatar(link)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(data) {
    api.getInitialNewCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id, token)
      .then(() => {
        const filteredCards = cards.filter(filteredCard => filteredCard !== card)
        setCards(filteredCards)
      })
      .catch(err => console.log(err))
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((r) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', r.token)
        history.push('/')
        handleToken()
      })
      .catch((err) => {
        setLogin(false)
        setInfoTooltip(true)
        console.log(err)
      })
  }

  function handleRegistration(password, email) {
    auth.registration(password, email)
      .then(() => {
        setLogin(true);
        setInfoTooltip(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        setLogin(false)
        setInfoTooltip(true)
        console.log(err)
      })
  }

  const handleToken = React.useCallback(
    () => {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/')
          setToken(jwt)
        })
        .catch(err => console.log(err))
    }, [history])

  React.useEffect(
    () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        handleToken()
      }
    }, [handleToken]
  )

  function logOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    history.push('/sign-in')
  }



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} logOut={logOut} />
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={handleCardDelete} />
          <Route path="/sign-up"><Register registration={handleRegistration} /></Route>
          <Route path="/sign-in"><Login onLogin={handleLogin} /></Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={infoTooltip}
          login={login}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
