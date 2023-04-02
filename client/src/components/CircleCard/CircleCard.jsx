import styles from './square-card.module.css'
import React from "react";
import {Button} from "react-bootstrap";

export function CircleCard({image, title}) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={image} alt="Card image"/>
            </div>
            <div className={styles.title}>
                <h3>{title}</h3>
                <Button variant={"outline-dark"}>Перейти</Button>
            </div>
        </div>
    )
}