import { useEffect, useState } from 'react';
import styles from './Poll.module.css'
import * as tokenHandler from '../../modules/TokenHandler'
import Globals from '../../modules/Globals'

function Poll(props) {
    const data = props.data

    const [userName, setUserName] = useState("Username");
    const [profileColor, setProfileColor] = useState("aqua");

    useEffect(() => {
        const tokenData = tokenHandler.getTokenData();

        fetch(`${Globals.apiUrl}/user/byid`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                id: data.author
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {
                setUserName(res.name);
                setProfileColor(res.profileColor)
            }
        })
    }, [])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.heading}>
                <div className={styles.title}>
                    <h2>{data.title}</h2>
                    <div className={styles.user}>
                        <div style={{backgroundColor: profileColor}} className={styles.userLogo}>
                            <p>{userName[0].toUpperCase()}</p>
                        </div>
                        <p>{userName}</p>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>{data.description}</p>
                </div>
            </div>
            <div className={styles.options}>
                {
                    data.options.map(option => {
                        return (
                            <div onClick={()=>console.log(option.id)} className={styles.option}>
                                <p>{option.name}</p>
                            </div>
                        )
                    })
                }
                
            </div>
            <hr></hr>
            <div className={styles.footer}>
                <p>Tags:</p>
                <div className={styles.tags}>
                    {data.tags.map(tag => {
                        return (
                            <p>{tag}</p> 
                        )
                    })}
                </div>
                <p className={styles.statistic}>
                    {data.resultsPublic ? "Statistic not implemented jet" : "Statistics for this poll are hidden"}
                </p>
            </div>
        </div>
    );
}

export default Poll;