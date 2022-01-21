import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Model(props) {
    const { show, handleClose, title, children, size, button } =props
    console.log(props);
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
                                onClick={ item.onclick}>
                                {item.label}
                            </Button>
                        ))
                    ) : (
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Model;
