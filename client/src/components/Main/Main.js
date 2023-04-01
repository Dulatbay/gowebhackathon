import React from 'react';
import styles from './main.module.css';
import {Categories} from "../Categories/Categories";

const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.bg}>
                <div>
                    <div>Eco.</div>
                    <div>Life.</div>
                    <div>Style.</div>
                </div>
            </div>
            <main>
                <div className={styles.wrapper}>
                    <Categories/>
                </div>
            </main>
        </div>
    );
}

export default Main;
