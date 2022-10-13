import styles from './PollList.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Globals from '../../modules/Globals'


import NavBar from './NavBar';
import Poll from '../reusables/Poll';

function PollList(props) {
    const navigation = useNavigate();

    const [pollList, setPollList] = useState([]);

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

        fetch(`${Globals.apiUrl}/polls/listall`)
        .then(response => response.json())
        .then(res => {
            setPollList(res)
        })
    }, []);
    
    return (
        
        <div className={styles.mainContainer}>
            <NavBar nav={navigation} />

            {pollList.map(pollData => {
                return <Poll data={pollData}/>
            })}
            
        </div>
    );
}

export default PollList;