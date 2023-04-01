import styles from './square-card.module.css'
import React from "react";

export function SquareCard() {
    return (
        <>
            <div className={styles.card}>
                <img src="../../images/img1.jpg" alt="Card image"/>
                <div className={styles.cardContent}>
                    <h3>Заголовок карточки</h3>
                    <p>Описание карточки</p>
                </div>
            </div>
        </>
    )
}