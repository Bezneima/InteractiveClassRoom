import React, { useEffect, useState } from 'react';
import styles from './ConferenceEnterModal.module.css'
import { Modal, Button, Input } from "antd";

interface ConferenceEnterModalProp {
    isModalOpen: boolean
    onModalClose: () => void
}

interface InputsValues {
    [name: string]: string
}

function ConferenceEnterModal({isModalOpen, onModalClose}: ConferenceEnterModalProp) {
    const [values, setValues] = useState<InputsValues>({})
    const [correctInputs, setCorrectInputs] = useState(false)
    const onInputChange = (value: string, inputName: string) => {
        setValues({...values, [inputName]: value})
    }

   useEffect(() => {
       if(values.Id && values.UserName)
           setCorrectInputs(true)
       else setCorrectInputs(false)
    }, [values])

    return (
        <div>
            <Modal
                title="Войти в конференцию"
                onCancel={onModalClose}
                visible={isModalOpen}
                centered
                footer={[
                    <Button key={1} onClick={onModalClose}>Отмена</Button>,
                    <Button key={2} type="primary" onClick={onModalClose} disabled={!correctInputs}>Войти</Button>
                ]}
            >
                <form className={styles.inputsWrapper}>
                    <Input
                        name="Id"
                        placeholder="Идентификатор конференции"
                        size="large"
                        onChange={(event) => {
                            onInputChange(event.target.value, event.target.name)}
                        }
                    />
                    <Input
                        name="UserName"
                        placeholder="Ваше имя"
                        size="large"
                        onChange={(event) => {
                        onInputChange(event.target.value, event.target.name)}
                    }
                    />
                </form>
            </Modal>
        </div>
    )
}

export default ConferenceEnterModal
