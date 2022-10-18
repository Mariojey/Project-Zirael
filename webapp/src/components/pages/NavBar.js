import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../modules/TokenHandler';



import styles from "./NavBar.module.css"
import placeholder from "../../media/link.png"
import home from "../../media/home.png"
import poll from "../../media/poll.png"
import create from "../../media/create.png"
import profile from "../../media/profile.png"
import logouticon from "../../media/log-out.png"
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
            </div>
            <div className={styles.navItems}>
                <div onClick={() => goTo('/home')}  className={styles.navItem}>
                    <img src={home} alt=""></img>
                    <p>GŁÓWNA</p>
                </div>
                <div onClick={() => goTo('/polls')} className={styles.navItem}>
                    <img src={poll} alt=""></img>
                    <p>ANKIETY</p>
                </div>
                <div onClick={() => goTo('/create')} className={styles.navItem}>
                    <img src={create} alt=""></img>
                    <p>STWÓRZ</p>
                </div>
            </div>
            <div className={styles.userOptions}>
                <div onClick={() => goTo('/profile')} className={styles.navItem}>
                    <img src={profile} alt=""></img>
                    <p>PROFIL</p>
                </div>
                <div onClick={logout} className={styles.navItem}>
                    <img src={logouticon} alt=""></img>
                    <p>Wyloguj</p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;