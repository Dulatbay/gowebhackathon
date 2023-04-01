import styles from './home-categories.module.css'

export const HomeCategories = ({children}) => {
    return (
        <div className={styles.categories}>
            <h3 className={styles.title}>Коллекции от EcoLifeStyle</h3>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    )
}