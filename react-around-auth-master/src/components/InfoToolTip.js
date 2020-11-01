import React from 'react';
import { withRouter } from 'react-router-dom';


class InfoToolTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`form ${this.props.isOpen && (`popup-opened`)}`}>
                <div className="form__container">
                    <div className={`form__tool-icon ${this.props.success ? `form__tool-icon_success` : `form__tool-icon_failure`}`} />
                    <h2 className="form__tool-tip">{this.props.success ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</h2>
                    <button type="button" aria-label="Close Form Button" className="form__exit-btn btn-animate" onClick={this.props.onClose}></button>
                </div>
            </div>
        );
    }
}

export default withRouter(InfoToolTip);