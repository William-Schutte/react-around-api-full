import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    
    function handleName(e) {
        setName(e.target.value);
    }

    function handleUrl(e) {
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ name: name, link: url });
        setName("");
        setUrl("");
    }

    return (
        <PopupWithForm name="form-add" title="New place" isOpen={props.isOpen} btnText="Create" onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="form__input-field">
                <input id="form-place" name="primary" className="form__place form__input" type="text" placeholder="Title" value={name} onChange={handleName} required minLength="1" maxLength="30" />
                <span id="form-place-error" className="form__error"></span>
            </label>
            <label className="form__input-field">
                <input id="form-url" name="secondary" className="form__url form__input" type="url" placeholder="Image link" value={url} onChange={handleUrl} required />
                <span id="form-url-error" className="form__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;