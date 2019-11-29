import React from 'react'
import './Locationitem.scss'
import Date from '../Datepicker/Datepicker'

class Locationitem extends React.Component{

    render(){
        return(
            <section className="item">
              <div className="item__img">
               <img className="item__photo" src={this.props.data.image} alt="imageone"></img>
              </div>
              <div className="item__box">
               <div><span className="item__title">Name:</span><span className="item__text">{this.props.data.name}</span></div><br></br>
               <div><span className="item__title">Address:</span><span className="item__text">{this.props.data.address}</span></div><br></br>
               <div><span className="item__title">Phone:</span><span className="item__text">{this.props.data.phone}</span></div><br></br>
               <div><span className="item__title">Website:</span><a className="item__text" href={this.props.data.website}>{this.props.data.name}</a></div><br></br>
               <div><span className="item__title">Reminder:</span><span className="item__text">{this.props.data.reminder}</span>
               <Date></Date></div><br></br>
               <div><span className="item__title">Event:</span><span className="item__text">{this.props.data.event}</span></div><br></br>
              </div>
            </section>
        )
    }
}
export default Locationitem;