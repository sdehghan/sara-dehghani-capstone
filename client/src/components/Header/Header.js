import React from 'react'
import logo from '../../assets/Free_Sample_By_Wix.jpeg'
import './Header.scss'
import Burgermenu from '../Burgermenu/Burgermenu'
import { NavLink, Link } from 'react-router-dom'


class Header extends React.Component {

    render() {

        return (
            <div className="header">
                <Burgermenu />
                <img src={logo} className="header__logo" alt="logo" />
                <div className="header__linkbox">
                    <NavLink className="header__link" to="/search">Home</NavLink>
                </div>
                <button className="header__button-logout"><Link className="header__button-link" to="/" >LOGOUT</Link> </button>
                <button className="header__button-user">USER</button>
            </div>
        )
    }
}
export default Header;