import React from 'react';
import {Blogs} from "../../Blogs/Blogs";
import styles from '../home-style.module.css'

function HomeBlogs({blogs}) {
    return (
        <div className={styles.blogs}>
            <h4 className={styles.title}>Лучшие посты за сегодня</h4>
            <Blogs blogs={blogs} />
        </div>
    );
}

export default HomeBlogs;