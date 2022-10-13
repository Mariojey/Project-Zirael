import styles from './Home.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import Globals from '../../modules/Globals'


import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import NavBar from './NavBar';

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
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <h1>Welcome Home!</h1>
            <button onClick={logout}>LOG OUT</button>
        </div>
    );
}

export default Home;