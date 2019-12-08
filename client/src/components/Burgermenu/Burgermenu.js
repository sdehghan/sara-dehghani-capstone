import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import './Burgermenu.scss'
import React from 'react';


class Burgermenu extends React.Component {
  state = {
    itemOne: "Restaurants",
    itemTwo: "Services",
    itemThree: "Kids",
    itemFour: "Grocery",
  }

  render() {

    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu isOpen={false}>
        <h3 className="menu-item menu-itemchange" href="">Locations</h3>
        <Link to="/location" className="menu-item">All Favourites</Link>
        <Link to="/location/restaurants" className="menu-item">{this.state.itemOne}</Link>
        <Link to="/location/services" className="menu-item">{this.state.itemTwo}</Link>
        <Link to="/location/kids" className="menu-item" >{this.state.itemThree}</Link>
        <Link to="/location/groceries" className="menu-item" >{this.state.itemFour}</Link>
      </Menu>
    );
  }
}
export default Burgermenu;