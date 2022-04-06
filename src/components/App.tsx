import React, { useState } from 'react';
import styles from './App.module.css';
import { Button } from 'antd';
import ConferenceEnterModal from 'components/ConferenceEnterModal/ConferenceEnterModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const onModalOpen = () => {
        setIsModalOpen(true)
    }
    const onModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={styles.App}>
            <ConferenceEnterModal isModalOpen={isModalOpen} onModalClose={onModalClose} />
        </div>
    );
}

export default App;
