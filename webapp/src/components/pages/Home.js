import styles from './Home.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import Globals from '../../modules/Globals'

import phone from '../../media/phone-1.png'

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

function Home(props) {
    const navigation = useNavigate();

    function logout() {
        tokenHandler.clearTokenData();
        navigation("/login");
    }

    function verifyCredentials() {
        tokenHandler.verifyCredentials()
        .then(data => {
            if(data.status !== "OK")
            {
                navigation("/login")
            }
        })
    }

    useEffect(() => {
        verifyCredentials();
    }, []);
    
    return (
        <>
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <div className={styles.content}>
                <div className={styles.pageContent}>
                    <h1>Poznaj „Jaskółkę”</h1>
                    <p>
                        Dzięki tej aplikacji możesz przeprowadzac ankiety i referenda w celu pozyskania opinii społeczności na różne tematy. 
                        Jaskółka zapewnia dostęp do danyh statystycznych dla każdej z ankiet. 
                        Twórz własne ankiety oraz udzielaj się w tych już istniejących. 
                        Dzięki aplikacji mobilnej możesz to robić z każdego miejsca na świecie!
                    </p>
                    <div className={styles.spacer}></div>
                    <h1>Wczesny dotęp</h1>
                    <p>
                        Jaskółka jest na etapie aktywnego rozwoju i obecnie jest w fazie wczesnego dostępu. 
                        W przyszłości pojawią się tutaj rozbudowane funkcje dla lokalnych samorządów oraz zwykłych użytkowników. 
                        Zachęcamy do testowania aplikacji i dzielenia się nią z innymi!
                    </p>
                </div>
                <div className={styles.phone}>
                    <img src={phone} alt="phone" />
                </div>
            </div> 
        </div>
        <Footer />
        </>
    );
}

export default Home;