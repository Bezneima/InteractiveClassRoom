import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import './App.css';
import {ClassPage, HomePage} from "./Components/Pages";
import {useSocket} from "./Hooks/useSocket";
import {DashBoard} from "./Components/Common/DashBoard/DashBoard";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    const socket = useSocket(setIsConnected);
    return (
        isConnected ? (<Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/dashboard' element={<DashBoard />}/>
            <Route path="/class/:classId" element={<ClassPage socket={socket}/>}/>
            <Route element={<div>Упс ничего не найдено 404</div>}/>
        </Routes>) : (<>Загружаюсь </>)
    )
}

export default App;
