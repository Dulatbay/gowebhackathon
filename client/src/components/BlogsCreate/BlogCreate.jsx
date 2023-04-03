import BlogForm from "../BlogForm/BlogForm";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import styles from './blog-create.module.css'
export const BlogCreate = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Button onClick={() => {
                navigate(-1);
            }} variant={'outline-secondary'} className={'align-self-start'}>Назад</Button>
            <h4>Отправить заявку на пост</h4>
            <BlogForm />
        </div>
    )
}