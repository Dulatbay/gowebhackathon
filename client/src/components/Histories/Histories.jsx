import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

export const Histories = () => {
    const [history, setHistory] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
            // setHistory(response.data);
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        //create
        //     setHistory([...history, response.data]);
        //     setContent('');
    };

    const onDelete = (id) => {
        // axios.delete(`/api/history/${id}`).then(() => {
        //     setHistory(history.filter((h) => h._id !== id));
        // });
    };

    return (
        <div>
            <h1>Истории</h1>
            <div className="mb-3">
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="content">
                        <Form.Control
                            as="textarea"
                            placeholder="Напишите историю"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Опубликовать
                    </Button>
                </Form>
            </div>
            {history.map((h) => (
                <Card key={h._id} className="mb-3">
                    <Card.Body>
                        <Card.Title>История от {h.author.username}</Card.Title>
                        <Card.Text>{h.content}</Card.Text>
                        {h.images.length > 0 &&
                            h.images.map((img) => <Card.Img key={img} src={img} />)}
                        <div className="mt-3">
                            <Button variant="outline-secondary" size="sm">
                                {h.likes.length} лайков
                            </Button>{' '}
                            <Button variant="outline-secondary" size="sm">
                                {h.comments.length} комментариев
                            </Button>{' '}
                            <Button variant="outline-secondary" size="sm">
                                {h.saves.length} сохранений
                            </Button>
                        </div>
                        <div className="mt-3">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(h._id)}
                            >
                                Удалить
                            </Button>{' '}
                            <Link to={`/history/${h._id}`}>
                                <Button variant="primary" size="sm">
                                    Просмотреть
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

;
