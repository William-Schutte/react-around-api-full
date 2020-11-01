import React from 'react';

function PopupWithForm(props) {
    return(
        <form className={`form ${props.name} ${props.isOpen && (`popup-opened`)}`} name={props.name} onSubmit={props.onSubmit}>
            <div className="form__container">
                <h2 className="form__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="form__save-button btn-animate">{props.btnText}</button>
                <button type="button" aria-label="Close Form Button" className="form__exit-btn btn-animate" onClick={props.onClose}></button>
            </div>
        </form>
    );
}

export default PopupWithForm;