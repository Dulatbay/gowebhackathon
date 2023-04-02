import React, {useContext, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogService from "../../services/BlogService";
import {Context} from "../../index";

const BlogForm = () => {
    const [content, setContent] = useState('S');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const {store} = useContext(Context)

    const handleContentChange = (event) => {
        setContent(event);
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        const imageUrls = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                imageUrls.push(reader.result);
                setImages(imageUrls);
            };
        }
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('authors', store.user.id);
        images.forEach(image => {
            formData.append(`image`, image);
        });
        await BlogService.fetchCreate(formData).then(r=>{
            console.log(r);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange}/>
            </Form.Group>

            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <ReactQuill value={content} onChange={handleContentChange}/>
            </Form.Group>
            <Form.Group controlId="images">
                <Form.Label>Images:</Form.Label>
                <Form.Control type="file" multiple onChange={handleImageChange}/>
            </Form.Group>
            {images.length > 0 && (
                <Form.Group>
                    {images.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Blog image ${index}`} width="100"/>
                    ))}
                </Form.Group>
            )}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default BlogForm;
