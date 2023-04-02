import React, {memo} from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = memo(() => {
    return (
        <footer className="bg-dark text-light py-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>О нас</h5>
                        <p>
                            Цель сайта "EcoLifestyle" - предоставить полезную информацию о том,
                            как вести экологически осознанный образ жизни и сократить
                            негативное воздействие на окружающую
                            среду.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Полезные ссылки</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a className={"default-link"} href="https://www.ecolifestyle.shop/">Партнер</a>
                            </li>
                            <li>
                                <a className={"default-link"} href="https://gowebhuck.kz/dashboard">GoWebHackaton</a>
                            </li>
                            <li>
                                <a className={"default-link"} href="https://github.com/Dulatbay/gowebhackathon">Наш лучший брэнд</a>
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
                <hr/>
                <p className="text-center">&copy; {new Date().getFullYear()} EcoLifeStyle Inc.</p>
            </Container>
        </footer>
    );
});
