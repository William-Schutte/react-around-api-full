import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip'
import * as auth from '../utils/auth.js';

class App extends React.Component {
    constructor() {
        super();
        this.state={
            isLoggedIn: null,
            userEmail: null,
            currentUser: {},
            jwt: null,
            isEditProfileOpen: false,
            isAddPlaceOpen: false,
            isEditAvatarOpen: false,
            isInfoToolTipOpen: false,
            regSuccess: false,
            selectedCard: null,
            cards: [],
        };
        this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this);
        this.handleEditProfileClick = this.handleEditProfileClick.bind(this);
        this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this);
        this.handleAuthRegClick = this.handleAuthRegClick.bind(this);
        this.closeAllPopups = this.closeAllPopups.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
        this.handleCardLike = this.handleCardLike.bind(this);
        this.handleCardDelete = this.handleCardDelete.bind(this);
        this.handleAddPlace= this.handleAddPlace.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        // Check if user has jwt token
        const jwt = localStorage.getItem('jwt');
        
        // If so, get user info and cards
        if (jwt) {
            this.setState({ jwt: jwt });
            auth.getUser(jwt).then((res) => {
                if (res) {
                    this.setState({ 
                        isLoggedIn: true,
                        userEmail: res.data.email,
                        currentUser: res.data,
                    });
                }
            }).then(() => {
                this.props.history.push('/');
            }).catch((err) => { 
                console.log(err) 
            });
        
            // Get initial cards
            api.getInitialCards(jwt).then((res) => { 
                if (res) {
                    this.setState({ cards: res.data });
                }
            }).catch((err) => { 
                console.log(err) 
            });
        }
    }

    handleLogIn(email, password) {
        auth.authorize(email, password).then((res) => {
            if (res) {
                this.componentDidMount();
            } else {
                this.handleAuthRegClick(false);
            }
        }).catch((err) => { 
            console.log(err) 
        });
    }

    handleRegister(email, password) {
        auth.register(email, password).then((res) => {
            if (res) {
                this.handleAuthRegClick(true);
                this.props.history.push('/signin');
            } else {
                this.handleAuthRegClick(false);
            }
        }).catch((err) => { 
            this.handleAuthRegClick(false)
            console.log(err) 
        });
    }

    handleLogOut() {
        localStorage.removeItem('jwt');
        this.setState({ isLoggedIn: false, email: null, currentUser: {} });
    }

    handleEditAvatarClick() {
        this.setState({ isEditAvatarOpen: true });
    }

    handleEditProfileClick() {
        this.setState({ isEditProfileOpen: true });
    }

    handleAddPlaceClick() {
        this.setState({ isAddPlaceOpen: true });
    }

    handleAuthRegClick(result) {
        this.setState({
            regSuccess: result,
            isInfoToolTipOpen: true
        });
    }

    closeAllPopups() {
        this.setState({
            isEditAvatarOpen: false,
            isEditProfileOpen: false,
            isAddPlaceOpen: false,
            isInfoToolTipOpen: false,
            selectedCard: null
        });
    }

    handleCardClick(card) {
        this.setState({ selectedCard: card });
    }

    // This route has Joi validation on the API and thus has slightly different error handling
    handleUpdateUser(newInfo) {
        api.patchUserInfo({...newInfo, token: this.state.jwt })
            .then((res) => { 
                if (res.data) {
                    this.setState({ currentUser: res.data }, this.closeAllPopups());
                } else {
                    return Promise.reject(`Error: 400; ${res.message}`);
                }
            })
            .catch((err) => { console.log(err) });
    }

    // This route has Joi validation on the API and thus has slightly different error handling
    handleUpdateAvatar(avatar) {
        api.patchUserPic({...avatar, token: this.state.jwt })
            .then((res) => { 
                if (res.data) {
                    this.setState({ currentUser: res.data }, this.closeAllPopups());
                } else {
                    return Promise.reject(`Error: 400; ${res.message}`);
                }
            })
            .catch((err) => { console.log(err) });
    }

    handleCardLike(card) {
        const isLiked = card.likes.some(i => i === this.state.currentUser._id);
        api.likeCard({ card, isLiked, token: this.state.jwt })
            .then((res) => {
                const newCards = this.state.cards.map((c) => (c._id === card._id) ? res.data : c);
                this.setState({ cards: newCards });
            })
            .catch((err) => { console.log(err) });
    }

    handleCardDelete(card) {
        api.deleteCard({ cardId: card._id, token: this.state.jwt })
            .then(() => {
                const newCards = this.state.cards.filter((c) => c._id !== card._id);
                this.setState({ cards: newCards });
            }).catch((err) => { 
                console.log(err) 
            });
    }

    // This route has Joi validation on the API and thus has slightly different error handling
    handleAddPlace(card) {
        api.addNewCard({...card, token: this.state.jwt })
            .then((res) => {
                if (res.data) {
                    const newCards = [...this.state.cards, res.data];
                    this.setState({ cards: newCards }, this.closeAllPopups());
                } else {
                    return Promise.reject(`Error: 400; ${res.message}`);
                }
            }).catch((err) => { 
                console.log(err);
            });
    }

    render() {
        return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <Switch>
                    <ProtectedRoute exact path="/" component={Main} loggedIn={this.state.isLoggedIn} userEmail={this.state.userEmail} 
                        onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onEditAvatar={this.handleEditAvatarClick}
                        onCardClick={this.handleCardClick} onClose={this.closeAllPopups} cards={this.state.cards} onCardLike={this.handleCardLike} 
                        onCardDelete={this.handleCardDelete} logOut={this.handleLogOut} />
                    <Route path='/signup'>
                        <Register register={this.handleRegister} />
                    </Route>
                    <Route path='/signin'>
                        <Login logIn={this.handleLogIn} />
                    </Route>
                    <Route path='*'>
                        <Redirect to="/signin" />
                    </Route>
                </Switch>
                
                {/* Popup ToolTip for Registration/Login */}
                <InfoToolTip isOpen={this.state.isInfoToolTipOpen} success={this.state.regSuccess} onClose={this.closeAllPopups} />    

                {/* Popup Edit User Info Form */}
                <EditProfilePopup isOpen={this.state.isEditProfileOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />

                {/* Popup Edit User Pic Form */}
                <EditAvatarPopup isOpen={this.state.isEditAvatarOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} currentUser={this.state.currentUser} />

                {/* Popup Add Form */}
                <AddPlacePopup isOpen={this.state.isAddPlaceOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlace} />

                {/* Popup Delete Form */}
                {/* <PopupWithForm name="form-delete" title="Are you sure?" isOpen={null} btnText="Yes" onClose={this.closeAllPopups} /> */}

                {/* Image Popup */}
                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />

            </CurrentUserContext.Provider>
        );
    }
}

export default withRouter(App);