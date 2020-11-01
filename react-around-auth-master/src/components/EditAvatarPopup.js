import React from 'react';
import PopupWithForm from './PopupWithForm.js';

class EditAvatarPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            isOpen: this.props.isOpen,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        const {value} = e.target
        this.setState({ avatar: value })
    }

    handleClose() {
        this.props.onClose();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUpdateAvatar({ avatar: this.state.avatar });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen === true && this.props.isOpen === false) {
            this.setState({ avatar: '' });
        }
    }

    render() {
        return (
            <PopupWithForm name="form-pic" title="Change userpic" isOpen={this.props.isOpen} btnText="Save" onClose={this.handleClose} onSubmit={this.handleSubmit}>
                <label className="form__input-field">
                    <input id="form-name" name="primary" className="form__name form__input" type="url" value={this.state.avatar} placeholder={this.props.currentUser.avatar} onChange={this.handleChange} required />
                    <span id="form-name-error" className="form__error"></span>
                </label>
            </PopupWithForm>
        );
    };
}

export default EditAvatarPopup;