import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogService from "../../services/BlogService";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import styles from './blog-form.module.css'
import {toast, ToastContainer} from "react-toastify";

const BlogForm = () => {
        const [content, setContent] = useState('');
        const [images, setImages] = useState([]);
        const [title, setTitle] = useState('');
        const [tags, setTags] = useState('');
        const [imagesUrl, setImagesUrl] = useState([]);
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

        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            if(!store.user.isAcitivated){
                toast.error("Активируйте аккаунт")
                return;
            }
            if(!title.trim().length || !content.trim().length){
                toast.error("Заполните важные поля")
                return;
            }
            formData.append('title', title);
            formData.append('content', content);
            formData.append('authors', store.user.id);
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
            formData.append('tags', tags);
            await BlogService.fetchCreate(formData).then(res => {
                if (res.status === 200) {
                    console.log("OK")
                } else {
                    console.log(res)
                }
            }).catch(e =>
                toast.error(e.message)
            );
        };

        return (
            <>
                <ToastContainer position={"bottom-right"}/>
                <Form onSubmit={handleSubmit} className={styles.form}>
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
                        <Form.Control type="text" placeholder="Введите через пробел тэги..." value={tags}
                                      onChange={handleTagsChange}/>
                    </Form.Group>
                    {images.length > 0 && (
                        <Form.Group>
                            {
                                imagesUrl.map((image, index) => <img key={index} src={image} alt={`Blog image ${index}`}
                                                                     width="100"/>)
                            }
                        </Form.Group>
                    )}
                    <Button variant="primary" type="submit" className={"mt-5 w-50 m-auto"}>
                        Отправить
                    </Button>
                </Form>
            </>

        );
    }
;

export default BlogForm;
