import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';
import React, { useCallback, useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import Button from "@material-ui/core/Button";
import Loader from "../Loader";
import {IconButton} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const Navbar = () => {

    const [userContext, setUserContext] = useContext(UserContext)
    const fetchUserDetails = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/me", {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            if (response.ok) {
                const data = await response.json()
                setUserContext(oldValues => {
                    return { ...oldValues, details: data }
                })
            } else {
                if (response.status === 401) {
                    // Edge case: when the token has expired.
                    // This could happen if the refreshToken calls have failed due to network error or
                    // User has had the tab open from previous day and tries to click on the Fetch button
                    window.location.reload()
                } else {
                    setUserContext(oldValues => {
                        return { ...oldValues, details: null }
                    })
                }
            }
        })
    }, [setUserContext, userContext.token])

    useEffect(() => {
        // fetch only when user details are not present
        if (!userContext.details) {
            fetchUserDetails()
        }
    }, [userContext.details, fetchUserDetails])


    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            setUserContext(oldValues => {
                return { ...oldValues, details: undefined, token: null }
            })
            window.localStorage.setItem("logout", Date.now())
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return  userContext.details === null ? (
        "Error Loading User details"
    ) : !userContext.details ? (
        <Loader />
    ) : (
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

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <p>
                                Welcome&nbsp;
                                <strong>
                                    {userContext.details.firstName}
                                    {userContext.details.lastName &&
                                    " " + userContext.details.lastName}
                                </strong>!
                            </p>

                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                        </Menu>
                    </div>

                </NavMenu>



            </Nav>
    );
};

export default Navbar;