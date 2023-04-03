import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import {toast} from "react-toastify";

export const BrandForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [addresses, setAddresses] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Действия, которые нужно выполнить при отправке формы
        console.log("Form submitted!");
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, ""]);
    };
    const handleDeleteAddress = () => {
        setAddresses([addresses.splice(0)]);
    };

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

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
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter brand description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
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
                <Button variant="outline-secondary" onClick={handleAddAddress}>
                    <PlusCircle /> Add address
                </Button>
                <Button variant="outline-secondary" onClick={handleDeleteAddress}>
                    <PlusCircle /> Delete address
                </Button>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

