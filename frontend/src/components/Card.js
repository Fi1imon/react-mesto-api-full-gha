import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(like => like === currentUser._id)



  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.handleCardLike(props.card)
  }

  function handleDeleteCardClick() {
    props.handleDeleteCardClick(props.card._id)
  }

  return (
    <div className="element">
      {isOwn && <button onClick={handleDeleteCardClick} className="element__delete image-button" aria-label="Удалить"/>}
      <img onClick={handleClick} className="element__photo" src={props.card.link} alt={props.card.name}/>
      <div className="element__info">
        <h3 className="element__name">{props.card.name}</h3>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            className={`element__like-button image-button ${isLiked ? "element__like-button_active" : ""}`}
            type="button"
            aria-label="нравится"
          />
          <p className="element__likes-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )


}

export default Card
