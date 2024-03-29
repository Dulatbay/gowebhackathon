import React, {memo, useContext, useEffect, useState} from 'react';
import styles from './main.module.css';
import {HomeCategories} from "../HomeComponents/HomeCategories/HomeCategories";
import {CircleCard} from "../CircleCard/CircleCard";
import HomeBlogs from "../HomeComponents/HomeBlogs/HomeBlogs";
import {CardSwiper} from "../Swiper/CardSwiper";
import CategoryService from "../../services/CategoryService";
import BlogService from "../../services/BlogService";
import {API_URL} from "../../http";
import {Footer} from "../Footer/Footer";
import {toast, ToastContainer} from "react-toastify";
import {Context} from "../../index";

const Main = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const {store} = useContext(Context)
    const getAllCategories = () => {
        CategoryService.fetchAll().then(r => {
            setCategories(r.data)
        });
    }

    const getTopBlogs = () => {
        BlogService.fetchWithParam(1, 5, '-createdAt').then(r => {
            console.log(r);
            setBlogs(r.data.blogs)
        });
    }

    const getCardsByCategories = (categories) =>
        categories.map(category => <CircleCard image={`${API_URL}/static/${category.image}`}
                                               title={category.name}/>)


    useEffect(() => {
        if (store.isAuth && !store.user.isActivated) {
            toast.warning(`На вашу почту ${store.user.email} было выслано ссылка на активацию. Пожалуйста потвердите аккаунт.`)
        }
        getAllCategories()
        getTopBlogs()
    }, [])


    return (
        <>
            <ToastContainer position={"bottom-right"}/>
            <div className={styles.main}>
                <div className={styles.bg}>
                    <div className={styles.text}>
                        <div>Eco.</div>
                        <div>Life.</div>
                        <div>Style.</div>
                    </div>
                    <p></p>
                </div>
                <main>
                    <div className={styles.wrapper}>
                        <HomeCategories>
                            <CardSwiper cards={getCardsByCategories(categories)}/>
                        </HomeCategories>
                        <HomeBlogs blogs={blogs}/>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default Main;
