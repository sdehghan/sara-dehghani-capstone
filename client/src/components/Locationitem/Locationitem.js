import React from 'react'
import './Locationitem.scss'


class Locationitem extends React.Component {

    setReminder = (event) => {
        event.preventDefault()
        this.props.handleOpenModal();
        this.props.getName(this.props.data.name)
    }

    deleteHandler = (event) => {
        event.preventDefault()
        this.props.deleteItem(this.props.data.name)
    }
    deleteReminder=(event)=>{
        event.preventDefault()
        this.props.removeReminder(this.props.data.name)
    }

    render() {
        return (
            <section className="item">
                <div className="item__img">
                    <img className="item__photo" src={this.props.data.image} alt="imageone"></img>
                </div>
                <div className="item__box">
                    <div><span className="item__title">Name:</span><span className="item__text">{this.props.data.name}</span></div><br></br>
                    <div><span className="item__title">Address:</span><span className="item__text">{this.props.data.address}</span></div><br></br>
                    <div><span className="item__title">Phone:</span><span className="item__text">{this.props.data.phone}</span></div><br></br>
                    <div><span className="item__title">Website:</span><a className="item__text" href={this.props.data.website} target="_blank" rel="noopener noreferrer" >{this.props.data.name}</a></div><br></br>
                    <button className="item__button-delete" onClick={this.deleteHandler}>DELETE</button>
                </div>
                <section className="item__box-two">
                    <div><span className="item__title">Reminder:</span><span className="item__text">{this.props.data.reminder}</span>
                    </div><br></br>
                    <div><span className="item__title">Event:</span><span className="item__text">{this.props.data.event}</span></div><br></br>
                    <div className="item__allbutton">
                    <button className="item__button-small " onClick={this.setReminder}>SET</button>
                    <button className="item__button-small " onClick={this.deleteReminder}>REMOVE</button>
                    </div>
                </section>
                  
                </section>
        )
    }
}
export default Locationitem;