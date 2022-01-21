import React from 'react';
import { Form } from 'react-bootstrap';

function Ui({ name, type, placeholder, value, onChange, label }) {
    return (
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

export default Ui;
