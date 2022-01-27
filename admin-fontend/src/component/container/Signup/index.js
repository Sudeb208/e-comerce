import React, { useState } from 'react';
import Layout from '../../layout';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../../Store/actions/user.action';
import Input from '../../UI/Input';

export default function Signup() {
    const [password, setPassword] = useState('');
    const [firstName, setfristName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignup = e => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        dispatch(signup(user));
    };
    if (user.loading) {
        return <p> loading</p>;
    }
    if (user.success) {
        return <Navigate to="/sign-in" />;
    }
    if (auth.authenticate) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Layout name="Sign Up">
                <Container style={{ marginTop: '100px' }} className="mt-10">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md="6">
                                        <Input
                                            name="Frist Name"
                                            type="text"
                                            value={firstName}
                                            onChange={e => {
                                                setfristName(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            name="last Name"
                                            type="text"
                                            value={lastName}
                                            onChange={e => {
                                                setlastName(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicCheckbox">
                                    <Form.Check
                                        type="checkbox"
                                        label="Check me out"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    );
}
