import React from 'react'
import logo from '../../assets/Free_Sample_By_Wix.jpeg'
import './Header.scss'
import Burgermenu from '../Burgermenu/Burgermenu'
import { NavLink } from 'react-router-dom'


class Header extends React.Component{

    submitHandler=(event)=>{
     event.preventDefault();
     let name=event.target.name.value;
     this.props.addLocation(name)
    }
    

    render(){

        return(
            <div className="header">
               <Burgermenu/>
               <img src={logo} className="header__logo" alt="logo"/>
               <div className="header__linkbox">
               <NavLink className="header__link" to="/">Home</NavLink>
               </div>
               <button className="header__button">user</button>
            </div>
        )
    }
}
export default Header;