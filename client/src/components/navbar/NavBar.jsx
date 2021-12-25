import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../action/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.png'
import {API_URL} from "../../config";



const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    
    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if(searchTimeout !== false){
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== ''){
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            },500, e.target.value))
        }else{
            dispatch(getFiles(currentDir))
        }

    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className='navbar__logo'/>
                <div className='navbar__header'><Link to="/" className='a-link' >MERN CLOUD</Link></div>
                {isAuth && <input
                    value={searchName}
                    onChange={(e) => searchChangeHandler(e)}
                    type='test'
                    className='navbar__search'
                    placeholder='Название файла...'
                />}
                {!isAuth && <div className='navbar__login'> <Link to="/login" className='a-link' >Войти</Link></div>}
                {!isAuth && <div className='navbar__registration'><Link to="/registration" className='a-link'>Регистрация</Link></div>}
                {isAuth && <div className='navbar__login' onClick={() => dispatch(logout())}>Выход</div>}
                {isAuth && <NavLink to='/profile'><img src={avatar} alt="" style={{width: '40px', height: '40px', borderRadius:'50%'}} /></NavLink>}
            </div>
        </div>
    );
};

export default NavBar;