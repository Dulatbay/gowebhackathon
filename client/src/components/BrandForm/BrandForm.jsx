import React, {useContext, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons";
import styles from "./brand-form.module.css";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import {Context} from "../../index";
import BrandService from "../../services/BrandService";

export const BrandForm = () => {
    const {store} = useContext(Context)
    const [name, setName] = useState("");
    const [image, setImage] = useState();
    const [description, setDescription] = useState("");
    const [addresses, setAddresses] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!name.trim().length || !image?.length || !description.trim().length || !addresses.length)
            toast.error("Заполните все поля")

        formData.append('name', name.trim());
        formData.append('description', description)
        formData.append('authors', store.user.id);
        formData.append('image', image);
        for (let i = 0; i < addresses.length; i++) {
            formData.append('addresses', addresses[i]);
        }
        BrandService.fetchCreate(formData).then(res => {
            if (res.status === 200) {
                console.log("OK")
                toast.info("Вы успешно подали заявку на брэнд")
            } else {
                toast.error(res.data.message)
            }
        }).catch(e => {
            toast.error(e.message)
        });
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, ""]);
        console.log(addresses);

    };
    const handleDeleteAddress = () => {
        setAddresses(addresses.slice(0, -1));
    };

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };
    const handleDescChange = (e) => {
        setDescription(e)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter brand name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="images">
                <Form.Label>Картинка</Form.Label>
                <Form.Control type="file" onChange={event => setImage(event.target.files)} accept=".jpg, .jpeg, .png"/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Контент</Form.Label>
                <ReactQuill value={description} onChange={handleDescChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Addresses</Form.Label>
                {addresses.map((address, index) => (
                    <Form.Control
                        key={index}
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                    />
                ))}
                <Button variant="success" onClick={handleAddAddress}>
                    <PlusCircle/> Add address
                </Button>
                <Button variant="outline-danger" onClick={handleDeleteAddress}>
                    <PlusCircle/> Delete address
                </Button>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

