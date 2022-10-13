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
                <div className={styles.option}>
                    <p>Option A</p>
                </div>
                <div className={styles.option}>
                    <p>Option B</p>
                </div>
                <div className={styles.option}>
                    <p>Option C</p>
                </div>
                <div className={styles.option}>
                    <p>Option D</p>
                </div>
            </div>
            <hr></hr>
            <div className={styles.footer}>
                <p>Tags:</p>
                <div className={styles.tags}>
                    <p>Tag1</p>
                    <p>TagTheSecond</p>
                    <p>Tag3</p>
                </div>
                <p className={styles.statistic}>Statistics for this poll are hidden</p>
            </div>
        </div>
    );
}

export default Poll;