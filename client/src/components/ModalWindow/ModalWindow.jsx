import {Button, Modal} from "react-bootstrap";

export const ModalWindow = ({show, handleClose, title, text}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Понятно
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}