import React from 'react'
import logo from '../../assets/Free_Sample_By_Wix.jpeg'
import './Header.scss'
import Burgermenu from '../Burgermenu/Burgermenu'


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
               <button className="header__button">user</button>
            </div>
        )
    }
}
export default Header;