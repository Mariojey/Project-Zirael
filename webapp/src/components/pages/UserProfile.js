import styles from './UserProfile.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Globals from '../../modules/Globals'


import NavBar from './NavBar';
import Poll from '../reusables/Poll';

function UserProfile(props) {
    const navigation = useNavigate();
    const tokenData = tokenHandler.getTokenData();
    
    const [accountData, setAccountData] = useState(null);

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

        fetch(`${Globals.apiUrl}/user/profiledata`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {
                console.log(res)
                setAccountData(res.accountData);
            }
        })
    }, []);

    if(accountData === null) {
        return (
            <div className={styles.mainContainer}>
                <NavBar nav={navigation} />
                <div className={styles.loading}>
                    <div className={styles.loader} />
                </div>
                
                
            </div>
        )
    }
    
    return (
        
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <div className={styles.profileContainer}>
                <div className={styles.logoBanner}>
                    
                </div>
                <div className={styles.infoBanner}>

                </div>
            </div>
        </div>
    );
}

export default UserProfile;