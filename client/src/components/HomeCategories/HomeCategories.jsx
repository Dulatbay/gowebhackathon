import styles from './home-categories.module.css'

export const HomeCategories = () => {
    return (
        <div className={styles.categories}>
            <h3 className={styles.title}>Коллекции от EcoLifeStyle</h3>
            <div className={styles.temp}></div>
        </div>
    )
}