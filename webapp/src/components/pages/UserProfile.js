import styles from './UserProfile.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Globals from '../../modules/Globals'


import NavBar from './NavBar';
import Footer from './Footer';
import Poll from '../reusables/Poll';

function UserProfile(props) {
    const navigation = useNavigate();
    const tokenData = tokenHandler.getTokenData();
    
    const [accountData, setAccountData] = useState(null);
    const [pollList, setPollList] = useState([]);
    function verifyCredentials() {
        tokenHandler.verifyCredentials()
        .then(data => {
            if(data.status !== "OK")
            {
                navigation("/login")
            }
        })
    }

    function genderName(gender) {
        if(gender === "male") return "Mężczyzna"
        if(gender === "female") return "Kobieta"
        if(gender === "other") return "Inna"
        if(gender === "hidden") return "Nieznana"
        return "-"
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

        fetch(`${Globals.apiUrl}/polls/mypolls`,
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
                setPollList(res.polls)
            }
        })
    }, []);

    if(accountData === null) {
        return (
            <>
            <div className={styles.mainContainer}>
                <NavBar nav={navigation} />
                <div className={styles.loading}>
                    <div className={styles.loader} />
                </div>
                
                
            </div>
            <Footer />
            </>
        )
    }
    
    return (
        <>
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />
            <div className={styles.profileContainer}>
                <div style={{'--pColor': accountData.profileColor ?? "red"}} className={styles.logoBanner}>
                    <div className={styles.banner}>

                    </div>
                    <div className={styles.logo}>
                        <p>{accountData.name[0] ?? "U"}</p>
                    </div>
                    <p className={styles.userName}>{accountData.name ?? "USERNAME"}</p>
                </div>
                <div className={styles.infoBanner}>
                    <p className={styles.sectionTitle}>Informacje o koncie</p>
                    <hr></hr>
                    <div className={styles.userData}>
                        <div className={styles.column}>
                            <p>Wiek: {accountData.age ?? "-"}</p>
                            <p>Płeć: {genderName(accountData.gender)}</p>
                            <p>Miasto: {accountData.city  ?? "-"}</p>
                        </div>
                        <div className={styles.column}>
                            <p>Ankiety: {pollList.length}</p>
                            <p>Typ konta: {accountData.isAdmin ? "Administrator" : "Użytkownik"}</p>
                            <p>Zarejestrowano: {new Date(accountData.timestamp).toLocaleDateString()  ?? "-"}</p>
                        </div>
                    </div>

                    <p className={styles.sectionTitle}>Twoje ankiety:</p>
                    <hr></hr>
                    <div className={styles.userPolls}>
                    
                    {pollList.length === 0 && (
                        <div className={styles.noPolls}>
                            <h1>Nie znaleziono żadnych ankiet</h1>
                        </div>
                    )}
                    {pollList.length > 0 && pollList.map(pollData => {
                        return <Poll 
                            accountData={accountData}
                            data={pollData}
                        />
                    })}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default UserProfile;