import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`picture ${card && (`popup-opened`)}`}>
            <div className="picture__column">
                <img className="picture__img" src={card ? card.link : ''} alt={card ? card.name : ''}/>
                <h2 className="picture__title">{card && card.name}</h2>
                <button type="button" aria-label="Close Picture Button" className="form__exit-btn btn-animate" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;