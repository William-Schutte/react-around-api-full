import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header(props) {

    const MOBILE_WIDTH = 425;

    const [width, setWidth] = React.useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    });
    
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            {isMenuOpen && 
            <header className="header header_menu">
                <p className="header__email">{props.userEmail}</p>
                <Link className="header__sign-out btn-animate" onClick={props.logOut} to='/'>Log Out</Link>
            </header>}

            <header className="header">
                <img className="header__logo" src={headerLogo} alt="Around the U.S. Logo" />
                {props.linkText && <Link className="header__link btn-animate" to={props.linkTo}>{props.linkText}</Link>}
                {(props.userEmail && width > MOBILE_WIDTH) && 
                    <>
                        <p className="header__email">{props.userEmail}</p>
                        <Link className="header__sign-out btn-animate" onClick={props.logOut} to='/'>Log Out</Link>
                    </>}
                {(props.userEmail && width <= MOBILE_WIDTH) && 
                    <>
                        <button type="button" className={`header__menu-btn btn-animate ${isMenuOpen ? `header__menu-btn_close` : `header__menu-btn_open`}`} onClick={handleMenu}></button>
                    </>}
            </header>
        </>
    )
}

export default Header;