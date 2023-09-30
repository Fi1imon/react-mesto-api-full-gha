import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import { InitialCardsContext } from "../contexts/InitialCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import AvatarEditPopup from "./AvatarEditPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletionConfirmationPopup from "./DeletionConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [isTooltipPopupOpened, setIsTooltipPopupOpened] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [initialCards, setInitialCards] = React.useState([]);
  const [cardIdForDeleting, setCardIdForDeleting] = React.useState('')
  const [loggedIn, setLoggedIn] = React.useState(Boolean);
  const [headerText, setHeaderText] = React.useState('');
  const [authenticationState, setAuthenticationState] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState('');
  const [isCheckingToken, setIsCheckingToken] = React.useState(false)

  React.useEffect(() => {
    if(loggedIn) {
      api.getUserInfo({ token: localStorage.getItem('jwt') })
        .then((user) => {
          setCurrentUser(user)
        })
        .catch(console.error)
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if(loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setInitialCards(res.cards)
        })
        .catch(console.error)
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setIsCheckingToken(true)
    const token = localStorage.getItem('jwt')
    if(token) {
      auth.checkToken({ token })
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`'catch' поймал ошибку: ${err}`);
        })
        .finally(() => {
          setIsCheckingToken(false)
        })
    } else {
      setIsCheckingToken(false)
    }
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsCardPopupOpen(true)
  }

  function handleDeleteCardClick(cardId) {
    setIsConfirmPopupOpen(true)
    setCardIdForDeleting(cardId)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipPopupOpened(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setInitialCards((cards) => cards.map(c => c._id === card._id ? newCard : c))
      })
      .catch(console.error)
  }

  function handleDeleteCardSubmit({ setButtonText }) {
    setButtonText('Удаление...')
    api.deleteCard(cardIdForDeleting)
      .then(() => {
        setInitialCards((cards) => cards.filter(c => c._id !== cardIdForDeleting));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {setButtonText('Да');})
  }

  function handleUpdateUser({ name, about, setButtonText }) {
    setButtonText('Сохранение...')
    api.setUserInfo({name, about})
      .then(user => {
        setCurrentUser({...currentUser, name: user.name, about: user.about});
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {setButtonText('Сохранить')})
  }

  function handleUpdateAvatar({ imageUrl, setButtonText }) {
    setButtonText('Сохранение...')
    api.uploadAvatar({imageUrl})
      .then(user => {
        setCurrentUser({...currentUser, avatar: user.avatar});
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {setButtonText('Сохранить')})
  }

  function handleAddCardSubmit({ title, imageUrl, setButtonText }) {
    setButtonText('Сохранение...');

    api.addCard({ title, imageUrl })
      .then(res => {
        setInitialCards([...initialCards, res.card]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {setButtonText('Сохранить')})
  }

  function handleRegistration({ email, password }) {
    auth.register({ email, password })
      .then(() => {
        setAuthenticationState(true);
      })
      .catch((err) => {
        setAuthenticationState(false);
        console.log(`'catch' поймал ошибку: ${err}`);
      })
      .finally(() => {
        setIsTooltipPopupOpened(true);
      })
  }

  function handleLogin({ email, password }) {

    auth.login({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        auth.checkToken({ token: res.token })
          .then((res) => {
            setLoggedIn(true);
            setUserEmail(res.email)
          })
      })
      .catch((err) => {
        setAuthenticationState(false);
        setIsTooltipPopupOpened(true);
        console.log(`'catch' поймал ошибку: ${err}`);
      })
  }

  return (
    <BrowserRouter>
      <div className="page" >
        {isCheckingToken && <div className="page__loading"><div className="page__spinner" /></div>}
        <CurrentUserContext.Provider value={currentUser}>
        <InitialCardsContext.Provider value={initialCards}>
          <Header
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            headerText={headerText}
            userEmail={userEmail}
          />
          <Routes>
            <Route path="/" element={<ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleDeleteCardClick={handleDeleteCardClick}
              />}
            />
            <Route path="/sign-in" element={!loggedIn ? <Login
              loggedIn={loggedIn}
              setHeaderText={setHeaderText}
              handleLogin={handleLogin}
              /> : <Navigate to="/" />}
            />
            <Route path="/sign-up" element={!loggedIn ? <Register
              loggedIn={loggedIn}
              setHeaderText={setHeaderText}
              handleRegistration={handleRegistration}
              /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Routes>
          <Footer />
          <ImagePopup isOpened={isCardPopupOpen} onClose={closeAllPopups} card={selectedCard}/>
          {/*Попапы с формами*/}
          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdate={handleUpdateUser}
          />
          <AddPlacePopup
            isOpened={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCardSubmit}
          />
          {/*Попап удаления карточки*/}
          <DeletionConfirmationPopup isOpened={isConfirmPopupOpen} onClose={closeAllPopups} handleSubmit={handleDeleteCardSubmit} />
          <AvatarEditPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
            isOpened={isTooltipPopupOpened}
            onClose={closeAllPopups}
            authenticationState={authenticationState}
          />
        </InitialCardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
