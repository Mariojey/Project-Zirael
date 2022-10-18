import styles from './Footer.module.css'
function Footer(props) {
    return (
        <div className={styles.mainContainer}>
            <p>Copyright © 2022, 
                <span><a href="https://zongi.dev/" rel="noreferrer" target="_blank"> Sebastian Golba </a></span>
                & 
                <span><a href="https://github.com/Mariojey" rel="noreferrer" target="_blank"> Mariusz Jacek</a></span>
                
            </p>
        </div>
    );
}

export default Footer;