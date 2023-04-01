import React from 'react';
import styles from './main.module.css';
import {HomeCategories} from "../HomeCategories/HomeCategories";
import {HomeBrands} from "../HomeBrands/HomeBrands";
import ItemsCarousel from "../ItemsCarousel/ItemsCarousel";
import {SquareCard} from "../SquareCard/SqueareCard";
import {CardSwiper} from "../../Swiper/CardSwiper";

const Main = () => {
    const getCardsByCategories = () => {

    }

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
                        <CardSwiper cards={[]}/>
                    </HomeCategories>
                    {/*<HomeBrands />*/}
                </div>
            </main>
        </div>
    );
}

export default Main;
