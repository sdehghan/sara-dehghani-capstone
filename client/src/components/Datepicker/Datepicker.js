import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./Datepicker.scss"
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Datepicker extends React.Component {
  state = {
    // startDate: new Date()
    startDate: ""
  };
  handleSelect = (event) => {
    this.props.setDate(event);
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (

      <DatePicker
        selected={this.state.startDate}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        placeholderText="Please enter a date"
      />
    
    );
  }
}
export default Datepicker;