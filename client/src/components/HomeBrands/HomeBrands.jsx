import styles from './home-brand.module.css'
import {Button} from "react-bootstrap";

export const HomeBrands = () => {
    return (
        <div className={styles.homeBrands}>
            <h3 className={styles.title}>Лучшие брэнды</h3>
            <div className={styles.selector}></div>
            <div className={styles.temp}></div>
            <Button>Стать брэндом!</Button>
        </div>
    )
}