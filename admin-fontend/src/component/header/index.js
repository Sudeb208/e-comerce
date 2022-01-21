import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { headerName } from '../layout';
import { signOut } from '../../Store/actions/auth.action';

// eslint-disable-next-line react/prop-types
function Header() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signOut());
    };
    console.log("header");
    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <span
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={logout}>
                    Sign out
                </span>
            </Nav>
        );
    };

    const renderNonLogedInUser = () => {
        return (
            <Nav>
                <Link className="nav-link" to="/sign-up">
                    Sign Up
                </Link>
                <Link className="nav-link" to="/sign-in">
                    Sign in
                </Link>
            </Nav>
        );
    };
    return (
        <div >
            <Navbar
                fixed='top'
                style={{ zIndex: '1', }}
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <headerName.Consumer>
                            {name => {
                                return <h1>{name}</h1>;
                            }}
                        </headerName.Consumer>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        {auth.authenticate
                            ? renderLoggedInLinks()
                            : renderNonLogedInUser()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default React.memo(Header);
