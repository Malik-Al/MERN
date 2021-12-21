import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";



const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()


    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className='navbar__logo'/>
                <div className='navbar__header'>MERN CLOUD</div>
                {!isAuth && <div className='navbar__login'> <Link to="/login" className='a-link' >Войти</Link></div>}
                {!isAuth && <div className='navbar__registration'><Link to="/registration" className='a-link'>Регистрация</Link></div>}
                {isAuth && <div className='navbar__login' onClick={() => dispatch(logout())}>Выход</div>}
            </div>
        </div>
    );
};

export default NavBar;