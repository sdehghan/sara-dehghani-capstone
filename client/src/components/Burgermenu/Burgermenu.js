import { slide as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom';
import './Burgermenu.scss'
import React from 'react';


class Burgermenu extends React.Component {
    state={
        itemOne:"Resturant",
        itemTwo:"Services",
        itemThree:"Kids",
        itemFour:"Grocery",
        show:false
    }
  showSettings=(event)=>{
    event.preventDefault();
    this.setState({show:true})
  }
 

  render () {
    
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu >
       <Link to="/" onClick={ this.showSettings } name="name" className="menu-item--small" href="">Locations</Link>
        {this.state.show? <>
        <Link to="/location/resturants"className="menu-item">{this.state.itemOne}</Link><br></br>
        <Link to="/location/services"  className="menu-item">{this.state.itemTwo}</Link><br></br>
        <Link to="/location/kids"  className="menu-item" >{this.state.itemThree}</Link><br></br>
        <Link to="/location/groceries" className="menu-item" >{this.state.itemFour}</Link></>
        :null}
      </Menu>
    );
  }
}
export default Burgermenu ;