import React, {useCallback} from "react";
import {Button} from "antd";
import axios from "axios";
import {useNavigate} from "react-router";

export const HomePage: React.FC = () => {
    let navigate = useNavigate();

    const handleCreateClass = useCallback(() => {
        axios.get('http://localhost:3001/getClass').then((res)=>{
            navigate(`/class/${res.data.classId}`);
        })
    },[navigate]);

    return (
        <>
            <Button onClick={handleCreateClass}>Создать класс</Button>
        </>
    );
}