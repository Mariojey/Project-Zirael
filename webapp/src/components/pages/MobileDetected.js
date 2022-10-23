import styles from './MobileDetected.module.css'

import phone from '../../media/phone-1.png'
import androidLogo from "../../media/android.png"

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Footer from './Footer';

function MobileDetected(props) {

    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <div className={styles.pageContent}>
                    <h1>Wykryto urządzenie mobilne</h1>
                    <p>
                        Aby cieszyć się większą wygodą użytku dla urządzeń mobilnych przewidziano aplikację kompatybiną z systemem android. Możesz ją pobrać klikając przycisk "pobierz" na tej stronie. 
                    </p>
                </div>
                <div className={styles.phone}>
                    {/* <img src={phone} alt="phone" /> */}
                    <a className={styles.downloadButton} rel="noreferrer" href="https://drive.google.com/file/d/1V0OgfON8y5g36bcD97onEmYaH5fiCJxo/view?usp=sharing" target="_blank">
                        <img src={androidLogo} alt="android logo"></img>
                        <p>Pobierz aplikację mobilną</p>
                    </a>
                </div>
            </div> 
        </div>
        <Footer />
        </>
    );
}

export default MobileDetected;