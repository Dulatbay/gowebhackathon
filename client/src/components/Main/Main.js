import React from 'react';
import styles from './main.module.css';
import {HomeCategories} from "../HomeCategories/HomeCategories";
import {HomeBrands} from "../HomeBrands/HomeBrands";
import ItemsCarousel from "../ItemsCarousel/ItemsCarousel";

const Main = () => {
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
                    <ItemsCarousel items={[]} title={""}/>
                    <HomeCategories/>
                    <HomeBrands />
                </div>
            </main>
        </div>
    );
}

export default Main;
