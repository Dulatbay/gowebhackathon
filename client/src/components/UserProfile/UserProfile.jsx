import {useContext, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {PencilSquare} from "react-bootstrap-icons";
import {Context} from "../../index";
import UserService from "../../services/UserService";
import {toast, ToastContainer} from "react-toastify";
import {BrandForm} from "../BrandForm/BrandForm";

export const UserProfile = () => {
    const {user} = useContext(Context).store
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingBrand, setAddingBrand] = useState(false);
    const [username, setUsername] = useState(user?.username && '');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEditClick = () => {
        if (user.isActivated)
            setIsEditing(true);
        else
            toast.error("Сначала активируйте аккаунт")
    };

    const handleBrandAddClick = () => {
        if (user.isActivated)
            setAddingBrand(true);
        else
            toast.error("Сначала активируйте аккаунт")
    }


    const handleSaveClick = () => {
        if (!username.trim().length)
            toast.error("Заполните все поля")
        UserService.updateUsername(username, user.id).then(res => {
            if (res.status === 200) {
                toast.success("Вы успешно изменили ник")
                return;
            }
            toast.error(res?.data?.message ? res?.data?.message : "Ошибка при валидации")
        }).catch(error => {
            toast.error(error?.data?.message ? error?.data?.message : "Ошибка при валидации")
        });
        setIsEditing(false);
    };


    return (
        <>
            <ToastContainer position={"bottom-right"}/>
            <div className="d-flex flex-column align-items-center">
                <h3 className="mt-3">{user.email}</h3>
                {isEditing ? (
                    <Form className="mt-3">
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <div className="d-flex align-items-center mt-3">
                        <Button variant="link" onClick={handleEditClick}>
                            <PencilSquare/>
                        </Button>
                    </div>
                )}
                {isEditing && (
                    <Button className="mt-3" onClick={handleSaveClick}>
                        Save
                    </Button>
                )}

                <h2>Подать заявку на бренд</h2>
                {isAddingBrand ? (
                    <BrandForm />
                ) : (
                    <div className="d-flex align-items-center mt-3">
                        <Button variant="link" onClick={handleBrandAddClick}>
                            <PencilSquare/>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
