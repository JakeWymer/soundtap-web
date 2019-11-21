import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header-wrap'>
      <h1>SoundTap</h1>
      <div className='header-nav'>
        <h3 className='header-nav-link'>Sign up</h3>
        <h3 className='header-nav-link'>Log in</h3>
      </div>
    </div>
  );
}

export default Header;