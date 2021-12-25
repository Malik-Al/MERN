import React, {useEffect} from 'react';
import NavBar from "./navbar/NavBar";
import './app.css'
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../action/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <>
            <Router>
                <div className='app'>
                    <NavBar/>
                    <div className="wrap">
                        {!isAuth ?
                            <Routes>
                                <Route path='/registration' element={<Registration/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='*' element={<Navigate replace to='/login'/>}/>
                            </Routes>
                            :
                            <Routes>
                                <Route exact path='/' element={<Disk/>}/>
                                <Route exact path='/profile' element={<Profile/>}/>
                                <Route path='*' element={<Navigate replace to='/'/>} />
                            </Routes>
                        }
                    </div>

                </div>
            </Router>
        </>


);
};

export default App;