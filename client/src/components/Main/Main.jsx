import React, {memo, useEffect, useState} from 'react';
import styles from './main.module.css';
import {HomeCategories} from "../HomeComponents/HomeCategories/HomeCategories";
import {CircleCard} from "../CircleCard/CircleCard";
import HomeBlogs from "../HomeComponents/HomeBlogs/HomeBlogs";
import {CardSwiper} from "../Swiper/CardSwiper";
import CategoryService from "../../services/CategoryService";
import BlogService from "../../services/BlogService";
import {API_URL} from "../../http";

const Main = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const getAllCategories = () => {
        CategoryService.fetchAll().then(r => {
            setCategories(r.data)
        });
    }

    const getTopBlogs = () => {
        BlogService.fetchAll().then(r => {
            setBlogs(r.data)
        });
    }

    const getCardsByCategories = (categories) =>
        categories.map(category => <CircleCard image={`${API_URL}/static/${category.image}`}
                                               title={category.name}/>)


    useEffect(() => {
        getAllCategories()
        getTopBlogs()
    }, [])


    return (
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
    );
}

export default Main;
