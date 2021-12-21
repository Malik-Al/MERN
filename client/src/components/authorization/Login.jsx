import React, {useState} from 'react';
import './authorization.css'
import Input from "../input/Input";
import {login} from "../../action/user";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type='text' placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type='password' placeholder="Введите password..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Login;