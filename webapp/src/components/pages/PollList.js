import styles from './PollList.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Globals from '../../modules/Globals'


import NavBar from './NavBar';
import Footer from './Footer';
import Poll from '../reusables/Poll';

function PollList(props) {
    const navigation = useNavigate();

    const [pollList, setPollList] = useState([]);
    const tokenData = tokenHandler.getTokenData();
    const [accountData, setAccountData] = useState(null);
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

        fetch(`${Globals.apiUrl}/polls/list`,
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
    
    if(pollList.length === 0) {
        return (
            <>
            <div className={styles.mainContainer}>
                <NavBar nav={navigation} />
                <div className={styles.noPolls}>
                    <h1>Nie znaleziono żadnych ankiet</h1>
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
            {pollList.map(pollData => {
                return <Poll 
                    lighter
                    accountData={accountData}
                    data={pollData}
                />
            })}
            
        </div>
        <Footer />
        </>
    );
}

export default PollList;