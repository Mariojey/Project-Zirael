import React from 'react';

import styles from './PopupModal.module.css'
function PopupModal(props) {

    function closeModal() {
        props.onClose()
    }

    function confirmModal() {
        props.onConfirm();
        closeModal();
    }

    return (
        <>
            <div onClick={closeModal} className={styles.overlay} />
            <div className={styles.mainContainer}>
                <p>{props.title}</p>
                <div className={styles.buttons}>
                    <div onClick={closeModal} style={{backgroundColor: "#666"}} className={styles.button}>ANULUJ</div>
                    <div onClick={confirmModal} className={styles.button}>USUŃ</div>
                </div>

            </div>
        </>
    );
}

export default PopupModal;