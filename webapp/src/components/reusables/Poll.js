import { useEffect, useState } from 'react';
import styles from './Poll.module.css'
import * as tokenHandler from '../../modules/TokenHandler'
import Globals from '../../modules/Globals'

import PollStatistics from './PollStatistics';
import PopupModal from './PopupModal';

import statsIcon from '../../media/stats-icon.png'
import trashIcon from '../../media/trash-icon.png'
import { toast } from 'react-toastify';


function Poll(props) {
    const data = props.data

    console.log(props.accountData)


    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState({user: false, uservote: false, votecount: false});
    const [optionSelected, setOptionSelected] = useState(-1);
    const [userName, setUserName] = useState("Username");
    const [profileColor, setProfileColor] = useState("aqua");
    const [voteStats, setVoteStats] = useState({});
    const [popupStats, setPopupStats] = useState(false);
    const [popupModal, setPopupModal] = useState(false);

    function handlePopup() {
        setPopupStats(p=>!p)
    }

    function handleModal() {
        setPopupModal(p=>!p)
    }

    const tokenData = tokenHandler.getTokenData();
    useEffect(() => {
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
            if(res.status === "OK") {
                setVoteStats(res.statistics)
            }
            setLoading(prevState => ({...prevState, votecount: true}))
        })
    }, [])

    function deletePoll() {
        const loginalert = toast.loading("Usuwanie...", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })

        fetch(`${Globals.apiUrl}/polls/delete`,
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

                toast.update(loginalert, { 
                    render: "Sukces!", 
                    type: "success", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
                setDeleted(true)
            }
            else {
                toast.update(loginalert, { 
                    render: "Niepowodzenie!", 
                    type: "error", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
            }
        })  
    }

    function unvote() {
        const loginalert = toast.loading("Logowanie...", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })

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

                toast.update(loginalert, { 
                    render: "Sukces!", 
                    type: "success", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
                setVoteStats(prevState => {
                    var temp = prevState;
                    if(temp.byOption === undefined) {
                        setOptionSelected(-1)
                        return temp
                    }
                    
                    if(optionSelected !== -1) {
                        temp.byOption[optionSelected] -= 1
                        temp.total -=1
                    }
                    setOptionSelected(-1)

                    return temp
                })

                
            }
            else {
                toast.update(loginalert, { 
                    render: "Niepowodzenie!", 
                    type: "error", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
            }
        })
    }

    function vote(id) {
        const tokenData = tokenHandler.getTokenData();

        if(id === optionSelected) {
            unvote()
            return;
        }

        const loginalert = toast.loading("Logowanie...", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })

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
                toast.update(loginalert, { 
                    render: "Sukces!", 
                    type: "success", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
                setVoteStats(prevState => {
                    var temp = prevState;
                    if(temp.total === undefined) {
                        setOptionSelected(id)
                        return temp
                    }
                    
                    if(optionSelected !== -1) {
                        temp.byOption[optionSelected] -= 1
                        temp.total -=1
                    }
                    temp.byOption[id] += 1
                    temp.total +=1

                    setOptionSelected(id)

                    return temp
                })

                
            }
            else {
                toast.update(loginalert, { 
                    render: "Niepowodzenie!", 
                    type: "error", 
                    isLoading: false,
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",  
                });
            }
        })
    }

    if(deleted) {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.loading}>
                    <h2>Ankieta usunięta</h2>
                </div>
            </div>
        )
    }
    else
    return (
        <div className={styles.mainContainer}>
        {loading.user && loading.uservote && loading.votecount ? (
        <>
            {popupStats && <PollStatistics title={data.title} options={data.options} closePopup={handlePopup} pollid={data._id} />}
            {popupModal && <PopupModal onClose={handleModal} onConfirm={deletePoll} title="Czy chcesz usunąć ankietę?" />}
            <div className={styles.heading}>
                <div className={styles.title}>
                    <h2>{data.title}</h2>
                    <div className={styles.user}>
                        <div style={{'--pColor': profileColor}} className={styles.userLogo}>
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
                                    {voteStats.total !== undefined && optionSelected !== -1 ? (
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
                {voteStats.total !== undefined ? (
                    <p className={styles.voteCount}>{`Głosów: ${voteStats.total}`}</p>
                ) : (
                    <br></br>
                )}
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
                    {data.resultsPublic ? "" : "Statistics for this poll are hidden"}
                </p>
                <div className={styles.buttons}>
                    {voteStats.total !== undefined && (
                        <div onClick={handlePopup} className={styles.button}>
                            <img src={statsIcon} alt="stats" />
                        </div>
                    )}
                    
                    {props.accountData !== null && (data.author === props.accountData.id || props.accountData.isAdmin) && (
                        <div onClick={handleModal} className={styles.button}>
                            <img src={trashIcon} alt="delete" />
                        </div>
                    )}
                    
                </div>
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