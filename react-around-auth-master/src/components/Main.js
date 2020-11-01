import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Header from './Header';
import Footer from './Footer';

function Main(props) {

    // Import of context value from provider
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
        <Header userEmail={props.userEmail} logOut={props.logOut} />
        <main className="content">
            {/* Profile section at top of page, contains three buttons for editing profile and cards */}
            <section className="profile">
                <button type="button" className="profile__pic-button" onClick={props.onEditAvatar}></button>
                <div className="profile__picture" style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="My Profile Pic" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__occupation">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="Edit Profile Button" className="profile__edit-button btn-animate" onClick={props.onEditProfile}></button>
                <button type="button" aria-label="Add Card Button" className="profile__add-button btn-animate" onClick={props.onAddPlace}></button>
            </section>

            {/* Image cards section, generated from server response */}
            <section className="cards">
                <ul className="cards__container">
                    {props.cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onClose={props.onClose} />
                    ))}
                </ul>
            </section>
        </main>
        <Footer />
        </>
    );
}

export default Main;