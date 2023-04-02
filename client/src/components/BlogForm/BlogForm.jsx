import React, {useContext, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogService from "../../services/BlogService";
import {Context} from "../../index";
import {Navigate, useNavigate} from "react-router-dom";

const BlogForm = () => {
        const [content, setContent] = useState('');
        const [images, setImages] = useState([]);
        const [title, setTitle] = useState('');
        const [tags, setTags] = useState('');
        const {store} = useContext(Context)
        const navigate = useNavigate()

        const handleContentChange = (event) => {
            setContent(event);
        };

        const handleImageChange = (event) => {
            const files = event.target.files;
            console.log(files);
            setImages(...files)
        };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTagsChange = (event) => {
            setTags(event.target.value);
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('authors', store.user.id);
            formData.append(`images`, images);
            formData.append('tags', tags.split(' '));
            await BlogService.fetchCreate(formData).then(res => {
                if (res.status === 200) {
                    console.log("OK")
                } else {
                    console.log(res)
                }
            });
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Загаловок</Form.Label>
                    <Form.Control type="text" placeholder="Введите загаловок" value={title}
                                  onChange={handleTitleChange}/>
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>Контент</Form.Label>
                    <ReactQuill value={content} onChange={handleContentChange}/>
                </Form.Group>
                <Form.Group controlId="images">
                    <Form.Label>Картинки:</Form.Label>
                    <Form.Control type="file" multiple onChange={handleImageChange}/>
                </Form.Group>
                <Form.Group controlId="tags">
                    <Form.Label>Тэги:</Form.Label>
                    <Form.Control type="text" placeholder="Введите через пробел тэги..." value={tags} onChange={handleTagsChange}/>
                </Form.Group>
                {images.length > 0 && (
                    <Form.Group>
                        {images.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Blog image ${index}`} width="100"/>
                        ))}
                    </Form.Group>
                )}
                <Button variant="primary" type="submit" className={"mt-5"}>
                    Отправить
                </Button>
            </Form>
        );
    }
;

export default BlogForm;
