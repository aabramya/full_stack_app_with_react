import React from 'react';
import PropTypes from 'prop-types';

const Header = ({message}) => {
    return (
        <header className="Header">
            <div><img src="favicon.ico" /></div>
            <div>{message}</div>
        </header>
    )
}

Header.propTypes = {
    message: PropTypes.string
}

export default Header;