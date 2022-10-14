import { useEffect, useState } from 'react';
import styles from './Poll.module.css'
import * as tokenHandler from '../../modules/TokenHandler'
import Globals from '../../modules/Globals'

function Poll(props) {
    const data = props.data


    const [loading, setLoading] = useState({user: false, uservote: false, votecount: false});
    const [optionSelected, setOptionSelected] = useState(-1);
    const [userName, setUserName] = useState("Username");
    const [profileColor, setProfileColor] = useState("aqua");
    const [voteStats, setVoteStats] = useState({});

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
                console.log(res)
                setUserName(res.name);
                setProfileColor(res.profileColor)
            }
            setLoading(prevState => ({...prevState, user: true}))
        })

        fetch(`${Globals.apiUrl}/votes/getuservote`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === "OK") {
                
                setOptionSelected(res.optionid)
            }
            setLoading(prevState => ({...prevState, uservote: true}))
        })

        fetch(`${Globals.apiUrl}/votes/votecount`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id
            })
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status === "OK") {
                setVoteStats(res.statistics)
            }
            setLoading(prevState => ({...prevState, votecount: true}))
        })
    }, [])

    function unvote() {
        const tokenData = tokenHandler.getTokenData();

        fetch(`${Globals.apiUrl}/votes/unvote`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id,
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {

                if(optionSelected !== -1) {
                    voteStats.byOption[optionSelected] -= 1
                }

                setOptionSelected(-1)
            }
        })
    }

    function vote(id) {
        const tokenData = tokenHandler.getTokenData();

        if(id === optionSelected) {
            unvote()
            return;
        }

        fetch(`${Globals.apiUrl}/votes/vote`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: tokenData.user, 
                token: tokenData.token,
                pollid: data._id,
                optionid: id
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status === "OK") {

                if(optionSelected !== -1) {
                    voteStats.byOption[optionSelected] -= 1
                }

                voteStats.byOption[id] += 1
                setOptionSelected(id)
            }
        })
    }

    return (
        <div className={styles.mainContainer}>
        {loading.user && loading.uservote && loading.votecount ? (
        <>
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
                                <div 
                                    onClick={()=>vote(option.id)} 
                                    className={`${styles.option} ${option.id === optionSelected ? styles.selectedOption : ""}`}>
                                    {voteStats !== {} && optionSelected !== -1 ? (
                                    <>
                                        <div 
                                            style={{
                                                '--percent': `${Math.floor(100*voteStats.byOption[option.id]/voteStats.total)}%`
                                            }} 
                                            className={styles.progressBar} 
                                        >
                                        </div>
                                        <div 
                                            className={styles.optionLabel}
                                            style={{
                                                '--percent': `${Math.floor(100*voteStats.byOption[option.id]/voteStats.total)}%`
                                            }}     
                                        >
                                            <p>{option.name}</p>
                                            <p>{Math.floor(100*voteStats.byOption[option.id]/voteStats.total)}%</p>
                                        </div>
                                    </>
                                        
                                    ) : (
                                        <p>{option.name}</p>
                                    )}
                                    
                                    
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
        </>
        ) : (
            <div className={styles.loading} >
                <div className={styles.loader} />
            </div>   
        )}   
        </div>
    );
}

export default Poll;