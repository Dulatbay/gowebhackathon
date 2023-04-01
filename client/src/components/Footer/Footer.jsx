import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5" >
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
                            felis risus. Donec tincidunt magna sed nisi rhoncus, at lacinia
                            nulla venenatis. Suspendisse potenti.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Useful Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#">Link 1</a>
                            </li>
                            <li>
                                <a href="#">Link 2</a>
                            </li>
                            <li>
                                <a href="#">Link 3</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <i className="bi bi-geo-alt"></i> Address: Kazakstan, Astana city, 101001
                            </li>
                            <li>
                                <i className="bi bi-telephone"></i> Phone: +7 (707) 10-38 007
                            </li>
                            <li>
                                <i className="bi bi-envelope"></i> Email: adulatbai@bk.ru
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <p className="text-center">&copy; {new Date().getFullYear()} EcoLifeStyle Inc.</p>
            </Container>
        </footer>
    );
};
