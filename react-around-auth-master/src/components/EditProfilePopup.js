import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    // Hook will load user data and then will 
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);
    
    function handleName(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name: name, about: description });
    }

    return (
        <PopupWithForm name="form-edit" title="Edit profile" isOpen={props.isOpen} btnText="Save" onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="form__input-field">
                <input id="form-name" name="primary" className="form__name form__input" type="text" value={name} onChange={handleName} required minLength="2" maxLength="40" pattern="[A-Za-z -]*" />
                <span id="form-name-error" className="form__error"></span>
            </label>
            <label className="form__input-field">
                <input id="form-occupation" name="secondary" className="form__occupation form__input secondary" type="text" value={description} onChange={handleDescription} required minLength="2" maxLength="200" />
                <span id="form-occupation-error" className="form__error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;