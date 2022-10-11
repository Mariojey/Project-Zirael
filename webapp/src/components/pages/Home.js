import styles from './Home.module.css'
import * as tokenHandler from '../../modules/TokenHandler';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Home(props) {
    const navigation = useNavigate();

    function verifyCredentials() {
        const data = tokenHandler.getTokenData();

        console.log(data)

        fetch("http://localhost:3001/auth/verifytoken", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: data.user, token: data.token})
        }).then(response => response.json())
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
            <h1>Welcome Home!</h1>
        </div>
    );
}

export default Home;