import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../modules/TokenHandler';



import styles from "./NavBar.module.css"
import placeholder from "../../media/link.png"
import logo from "../../media/logo.png"

function NavBar(props) {
    const navigation = useNavigate();

    function logout() {
        tokenHandler.clearTokenData();
        navigation("/login");
    }

    function goTo(path) {
        navigation(path)
    }

    return (
        <div className={styles.mainContainer}>
            <div onClick={() => goTo('/home')} className={styles.logo}>
                <img src={logo} alt="logo"></img>
                <p>ZIRAEL</p>
            </div>
            <div className={styles.navItems}>
                <div onClick={() => goTo('/home')}  className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Home</p>
                </div>
                <div onClick={() => goTo('/polls')} className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Polls</p>
                </div>
                <div onClick={() => goTo('/create')} className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Create</p>
                </div>
                <div onClick={() => goTo('/mypolls')} className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>My Polls</p>
                </div>
            </div>
            <div className={styles.userOptions}>
                <div onClick={() => goTo('/profile')} className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Profile</p>
                </div>
                <div onClick={logout} className={styles.navItem}>
                    <img src={placeholder} alt=""></img>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;