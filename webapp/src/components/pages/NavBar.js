import styles from "./NavBar.module.css"
import placeholder from "../../media/link.png"

function NavBar(props) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>

            </div>
            <div className={styles.navItems}>
                <div className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Polls</p>
                </div>
                <div className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Create</p>
                </div>
                <div className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Users</p>
                </div>
            </div>
            <div className={styles.userOptions}>

            </div>
        </div>
    );
}

export default NavBar;