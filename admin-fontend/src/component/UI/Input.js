import React from 'react';
import { Form } from 'react-bootstrap';

function Input({ name, type, placeholder, value, onChange, label }) {
    let state;
    switch (type) {
        case 'select':
            state = (
                <div>
                    <Form.Group className="mb-3">
                        {label && <Form.Label>{name}</Form.Label>}
                        <Form.Control
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            label={label}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                </div>
            );
            break;
        default:
            state = (
                <div>
                    <Form.Group className="mb-3">
                        {label && <Form.Label>{name}</Form.Label>}
                        <Form.Control
                            type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            label={label}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                </div>
            );
    }
    return state;
}

export default Input;
