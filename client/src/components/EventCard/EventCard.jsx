import {useEffect, useState} from 'react';
import {Card, Button, ListGroup, ListGroupItem, Form} from 'react-bootstrap';
import {FaHeart, FaBookmark, FaComment, FaShare} from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import {useNavigate, useParams} from "react-router-dom";
import EventService from "../../services/EventService";
import {Loader} from "../Loader/Loader";
import {API_URL} from "../../http";
import styles from './event-card.module.css'

const EventCard = () => {
    const [comment, setComment] = useState('');
    const [event, setEvent] = useState(null);
    const [showComment, setShowComment] = useState(0);

    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(() => {
        async function fetchEvent() {
            const response = await EventService.fetchById(id);
            if (!response.data) navigate('/not_found');
            const eventData = response.data;
            setEvent(eventData);
        }

        fetchEvent();
    }, []);

    const commentClick = () => {
        setShowComment(!showComment);
    }


    const subscribe = (event) =>{

    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // code to submit comment
    };


    if (!event) return <Loader/>;
    return (
        <div className={styles.card}>
            <Card className={`my-3`}>
                <Card.Header>
                    <Card.Header>{event.authors[0]?.username}</Card.Header>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {new Date(event.eventAt).toLocaleDateString('ru-RU', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            min: 'numeric',
                            hour: 'numeric',
                        })}
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text dangerouslySetInnerHTML={{__html: event.content}}/>
                </Card.Body>
                {event.images.length ? (
                    <Card.Img variant="top" src={`${API_URL}/api/static/${event.images[0]}`} alt={event.title}/>
                ) : ''

                }
                <ListGroup className="list-group-flush flex-row justify-content-around">
                    <ListGroupItem>
                        <FaHeart/> {event.likes.length}
                    </ListGroupItem>
                    <ListGroupItem>
                        <FaComment/> {event.comments.length}
                    </ListGroupItem>
                    <ListGroupItem>
                        <FaBookmark/> {event.saves.length}
                    </ListGroupItem>
                </ListGroup>
                {
                    showComment ?
                        <Card.Body>
                            <Form onSubmit={handleCommentSubmit}>
                                <Form.Group>
                                    <Form.Label>Leave a comment:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                        :
                        ''
                }
                <div className={`mt-3 mb-3 ${styles.footer}`}>
                    <Card.Subtitle className="mb-2 text-muted">Создано: {' '}
                        {new Date(event.createdAt).toLocaleDateString('ru-RU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </Card.Subtitle>
                </div>
            </Card>
            <div className={styles.buttons}>
            <Button variant={"outline-secondary"}
                    size={"sm"}
                    onClick={()=>{navigate(-1)}}
                    >Назад</Button>
                <Button variant={"primary"}
                        size={"sm"}
                        onClick={subscribe}
                >Подписаться</Button>

            </div>
        </div>

    );
};

export default EventCard;
