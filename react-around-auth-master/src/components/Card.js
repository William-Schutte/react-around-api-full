import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Code to check if the card is owned by current user and determine the delete buttons visibility
    const owner = props.card.owner === currentUser._id;
    const cardDeleteButtonClasses = `card__delete-button ${owner ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`;

    // Checks if the card was liked by the current user
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClasses = `card__fav-button ${isLiked && 'card__fav-button_active'}`;
    
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="card">
            <div className="card__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} />
            <button type="button" aria-label="Card Delete Button" className={cardDeleteButtonClasses} onClick={handleDeleteClick}></button>
            <div className="card__overlay">
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__like-column">
                    <button type="button" aria-label="Card Favorite Button" className={cardLikeButtonClasses} onClick={handleLikeClick}></button>
                    <p className="card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;