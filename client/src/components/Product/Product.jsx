import React from "react";
import {Container, Row, Col, Image, Card} from "react-bootstrap";

const Product = ({product}) => {
    const {title, content, price, images} = product;

    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={6} lg={4}>
                    <Image src={images.length && images[0]} thumbnail/>
                </Col>
                <Col xs={12} md={6} lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{content}</Card.Text>
                            <Card.Text>Price: ${price}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;
