import React from 'react';
import Header from '../header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css'

// eslint-disable-next-line react/prop-types
const headerName = React.createContext();
export default function Layout({ children, name, sidebar }) {
    return (
        <div>
            <headerName.Provider value={name}>
                <Header />
            </headerName.Provider>

            {sidebar ? (
                <Container fluid>
                    <Row>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product">Product</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/orders">Order</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category">Category</NavLink>
                                </li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft: 'auto', paddingTop: '80px' }}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            ) : (
                children
            )}
        </div>
    );
}
export { headerName };
