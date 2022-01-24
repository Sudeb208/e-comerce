/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { debounnce } from '../customHandler/customHandler';

function Model(props) {
    const { show, handleClose, title, children, size, button, buttonName } =
        props;
    return (
        <div>
            <Modal
                size={size}
                show={show}
                onHide={() => handleClose(true)}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    {button ? (
                        button.map((item, index) => (
                            <Button
                                key={index}
                                variant={item.color}
                                onClick={debounnce(item.onclick, 400)}>
                                {item.label}
                            </Button>
                        ))
                    ) : (
                        <Button
                            variant="primary"
                            onClick={debounnce(handleClose, 500)}>
                            {buttonName ? buttonName : 'Save Changes'}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Model;
