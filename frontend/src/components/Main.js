import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { InitialCardsContext } from "../contexts/InitialCardsContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const initialCards = React.useContext(InitialCardsContext);


  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <div onClick={props.onEditAvatar} className="profile__avatar-overlay"/>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button image-button"
            type="button"
            aria-label="Редактировать"
          />
        </div>
        <button
          onClick={props.onAddCard}
          className="profile__add-button image-button"
          type="button"
          aria-label="Добавить изображение"
        />
      </section>
      <section className="elements">
        {initialCards.map(card => (
          <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          handleCardLike={props.handleCardLike}
          handleDeleteCardClick={props.handleDeleteCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
