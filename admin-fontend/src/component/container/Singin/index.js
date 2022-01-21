import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../layout';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Ui from '../../UI';
import { login } from '../../../Store/actions/auth.action';
import { Navigate } from 'react-router-dom';

export default function Signin() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [error, setError] = useState();
    const dispacth = useDispatch();
    const auth = useSelector(state => state.auth);

    const userLogin = e => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        dispacth(login(user));
    };
    if (auth.authenticate) {
        return <Navigate replace to="/" />;
    }
    return (
        <div>
            <Layout name="Sign In">
                <Container style={{ marginTop: '100px' }} className="mt-10">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userLogin}>
                                <Ui
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <Ui
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                />
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
