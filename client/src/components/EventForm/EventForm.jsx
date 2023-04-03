import React, {useContext, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EventService from "../../services/EventService";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import styles from './event-form.module.css'
import Calendar from "react-calendar";
import {toast, ToastContainer} from "react-toastify";

const EventForm = () => {
        const [content, setContent] = useState('');
        const [images, setImages] = useState([]);
        const [title, setTitle] = useState('');
        const [tags, setTags] = useState('');
        const [address, setAddress] = useState('');
        const [imagesUrl, setImagesUrl] = useState([]);
        const [calendarValue, setCalendarValue] = useState(new Date());
        const [error, setError] = useState();
        const {store} = useContext(Context)
        const navigate = useNavigate()

        const handleContentChange = (event) => {
            setContent(event);
        };

        const handleImageChange = (event) => {
            const files = event.target.files;
            const imagesUrlArray = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagesUrl(imagesUrlArray);
            setImages(files)
        };

        const handleTitleChange = (event) => {
            setTitle(event.target.value);
        };

        const handleTagsChange = (event) => {
            setTags(event.target.value);
        };
        const handleCalendarChange = (event) => {
            if (event.getTime() <= Date.now() + 6 * 86400000) {
                setError("Чтобы люди увидели и успели подготовиться, вы должны минимум на 7 дней вперед поставить дату")
                console.log(images)
            } else setError("")
            setCalendarValue(event)
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            if (error)
                return;
            if(!store.user.isAcitivated){
                toast.error("Активируйте аккаунт")
                return;
            }
            if(!title.trim().length || !content.trim().length){
                toast.error("Заполните важные поля")
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('authors', store.user.id);
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
            formData.append('tags', tags.trim());
            formData.append('address', address);

            await EventService.fetchCreate(formData).then(res => {
                console.log(res)
                if (res.status === 200) {
                    toast.info(res?.data?.message ? res?.data?.message : "Вы успешно создали запрос на событие")
                    navigate('/events/calendar')

                } else {
                    toast.error(res?.data?.message ? res?.data?.message : "Ошибка при валидации")
                }
            }).catch(e => {
                console.log(e.response.data.message);
                toast.error(e.response.data.message)
            });
        };

        const handleAddressChange = (event) => {
            setAddress(event.target.value)
        };
        return (
            <>
                <ToastContainer position={"bottom-right"}/>
                <Form onSubmit={handleSubmit} className={styles.eventForm}>
                    <h3>Создать событие</h3>
                    <Form.Group controlId="title">
                        <Form.Label>Загаловок</Form.Label>
                        <Form.Control type="text" placeholder="Введите загаловок" value={title}
                                      onChange={handleTitleChange}/>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Выберите дату</Form.Label>
                        <Calendar onChange={handleCalendarChange} value={calendarValue}
                        />
                        {
                            error ?
                                <Alert variant="warning">
                                    {error}
                                </Alert>
                                : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Label>Контент</Form.Label>
                        <ReactQuill value={content} onChange={handleContentChange}/>
                    </Form.Group>
                    <Form.Group controlId="images">
                        <Form.Label>Картинки:</Form.Label>
                        <Form.Control type="file" multiple onChange={handleImageChange}/>
                    </Form.Group>
                    {images.length > 0 && (
                        <Form.Group>
                            {
                                imagesUrl.map((image, index) => <img key={index} src={image} alt={`Blog image ${index}`}
                                                                     width="100"/>)
                            }
                        </Form.Group>
                    )}
                    <Form.Group controlId="tags">
                        <Form.Label>Тэги:</Form.Label>
                        <Form.Control type="text" placeholder="Введите через пробел тэги..." value={tags}
                                      onChange={handleTagsChange}/>
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Адрес:</Form.Label>
                        <Form.Control type="text" placeholder="Введите адрес" value={address}
                                      onChange={handleAddressChange}/>
                    </Form.Group>


                    <Button variant="primary" type="submit" className={"mt-5"}>
                        Отправить
                    </Button>
                </Form>
            </>
        );
    }
;

export default EventForm;
