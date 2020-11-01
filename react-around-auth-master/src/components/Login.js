import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Header from './Header';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.logIn(email, password);
    }

    render() {
        return (
            <>
                <Header linkText="Sign Up" linkTo="/signup" />
                <main className="content">
                    <form className="register">
                        <h2 className="register__header">Log In</h2>
                        <input name="email" className="register__input" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email"/>
                        <input name="password" className="register__input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                        <button className="register__button btn-animate" onClick={this.handleSubmit}>Log In</button>
                        <Link to="/signup" className="register__link btn-animate">Not a member yet? Sign up here!</Link>                        
                    </form>
                </main>
            </>
        );
    }
}

export default withRouter(Login);