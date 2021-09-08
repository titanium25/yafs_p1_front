import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = () => {
    return (

            <Nav>
                <NavLink to='/' >
                    <img src={require('../../images/logo_150.png').default} alt='logo' />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/movies' >
                        Movies
                    </NavLink>
                    <NavLink to='/members' >
                        Members
                    </NavLink>
                    <NavLink to='/users' >
                        Users
                    </NavLink>
                    <NavLink to='/sign-up' >
                        Sign Up
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
    );
};

export default Navbar;