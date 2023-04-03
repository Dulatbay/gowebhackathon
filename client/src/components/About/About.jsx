import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import ecoImage from "../../images/eco.jpg";
import "./styles.css";

export const About = () => {
    return (
        <section id="about-us" className="center-container">
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>О нас</h2>
                        <p>
                            Мы - команда энтузиастов, которые заботятся о сохранении нашей
                            планеты для будущих поколений. Наша миссия - улучшение экологии
                            нашего города и повышение осведомленности об экологических
                            проблемах.
                        </p>
                        <p>
                            Мы проводим различные мероприятия и акции, чтобы привлечь
                            внимание к проблемам загрязнения окружающей среды и популяризации
                            экологических решений. Присоединяйтесь к нам и вместе мы сможем
                            сделать наш город чище и здоровее для всех!
                        </p>
                    </Col>
                    <Col md={6}>
                        <Image src={ecoImage} alt="Экологическое изображение" fluid />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

