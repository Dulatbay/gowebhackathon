import React from 'react';
import {BlogList} from "../../BlogList/BlogList";
import styles from '../home-style.module.css'
import BlogForm from "../../BlogForm/BlogForm";

function HomeBlogs({blogs}) {
    return (
        <div className={styles.blogs}>
            <h4 className={styles.title}>Лучшие посты за последнее время</h4>
            <BlogList blogs={blogs} />
        </div>
    );
}

export default HomeBlogs;