import styles from './Poll.module.css'
function Poll(props) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.heading}>
                <div className={styles.title}>
                    <h2>Title</h2>
                    <div className={styles.user}>
                        <div className={styles.userLogo}>
                            <p>U</p>
                        </div>
                        <p>Username</p>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore quia ut laudantium sed perferendis omnis praesentium nihil facilis cupiditate excepturi nemo placeat fuga ab, ea, doloremque quam, deleniti neque accusantium.</p>
                </div>
            </div>
            <div className={styles.options}>

            </div>
            <div className={styles.footer}>

            </div>
        </div>
    );
}

export default Poll;