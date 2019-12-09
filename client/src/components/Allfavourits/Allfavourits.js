import React from 'react'
import Locationitem from '../Locationitem/Locationitem'
import './Allfavourits.scss'
import save from '../../assets/Icon-save.png'
import axios from 'axios'
import Header from '../Header/Header';
import ReactModal from 'react-modal';
import Date from '../Datepicker/Datepicker'


class Allfavourits extends React.Component {

  state = {
    selected: "select category",
    staticLoc: [],
    list: [],
    showModal: false,
    showModalTwo: false,
    eventValue: ''
  }

  componentDidMount() {
    axios.get('http://localhost:8080/location')
      .then(response => {
        this.setState({ list: response.data, staticLoc: response.data })
      }).catch(err => console.log(err))
  }
  //select drop down
  changeHandler = (e) => {
    let value=e.target.value;
    this.setState({ selected: e.target.value });
    axios.get('http://localhost:8080/location')
    .then(response=>{
    if (value !== "select category") {
      let data = response.data.filter(item => item.category.toLowerCase() === value.toLowerCase())
      this.setState({ list: data });
    } else if (value === "select category") {
          this.setState({list: response.data })
        }}).catch(err => console.log(err))
    }
  
  //refresh button
  refreshList = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/location`)
      .then(response => {
        this.setState({ list: response.data, selected: "select category" })
      })
      .catch(err => console.log('could not find data', err))
  }

  //delete one item
  deleteItem = (name) => {
    let value = this.state.staticLoc.find(item => name.toLowerCase()===item.name.toLowerCase())
    let id = value.id
    axios.delete(`http://localhost:8080/location/${id}`)
      .then(response => {   
      axios.get('http://localhost:8080/location')
      .then(response => {
        if (this.state.selected === "select category") {
          this.setState({ list: response.data })
        } else{
          let newList = response.data.filter(item => item.category.toLowerCase() === this.state.selected.toLowerCase())
          this.setState({ list: newList }).catch(err => console.log(err))}
      }).catch(err => console.log(err))
  })
}
  //for reminder popup
  item = ""
  handleCloseModalTwo = (event) => {
    event.preventDefault()
    this.setState({ showModalTwo: false })
  }
  handleOpenModalTwo = () => {
    this.setState({ showModalTwo: true })
  }
  //for reminder setup
  saveReminder = (event) => {
    this.reminder();
    this.handleCloseModal(event);
  }
  handleCloseModal = (event) => {
    event.preventDefault()
    this.setState({ showModal: false })
  }
  handleOpenModal = () => {
    this.setState({ showModal: true })
  }
  //create reminder object
  obj = { name: "", reminder: "", event: "" }
  getName = (name) => {
    this.obj.name = name
  }
  setDate = (event) => {
    this.obj.reminder = event
  }
  setEvent = (event) => {
    this.obj.event = event.target.value
    this.setState({ eventValue: event.target.value })
  }

  //post reminder and refresh 
  reminder = () => {
    axios.post('http://localhost:8080/reminder', this.obj)
      .then(response => {
        axios.get('http://localhost:8080/location')
          .then(response => {
            if (this.state.selected === "select category") {
              this.setState({ list: response.data, eventValue: "" })
            } else {
              let reminderItems = response.data.filter(item => item.category.toLowerCase() === this.state.selected.toLowerCase())
              this.setState({ list: reminderItems, eventValue: "" })
            }
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

  //remove reminder
  removeReminder = (name) => {
    let value = this.state.list.find(item => name.toLowerCase() === item.name.toLowerCase())
    let id = value.id
    axios.delete(`http://localhost:8080/reminder/${id}`)
      .then(response => {
        axios.get('http://localhost:8080/location')
          .then(response => {
            if (this.state.selected === "select category") {
              this.setState({ list: response.data, eventValue: "" })
            } else {
              let reminderItems = response.data.filter(item => item.category.toLowerCase() === this.state.selected.toLowerCase())
              this.setState({ list: reminderItems, eventValue: "" })
            }
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }
  //settimeout to check for reminder
  componentDidUpdate() {
    this.timeout = setTimeout(() => {
      this.state.list.filter(item => {
        if (item.reminder) {
          axios.post(`http://localhost:8080/location/${this.props.match.params.category}`, item)
            .then(response => {
              if (response.data) {
                this.item = item
                this.setState({ showModalTwo: true })
              }
            })
            .catch(err => console.log(err))
        }
      })
    }, 10000);
  }
  render() {
    return (
      <>
        <Header></Header>
        <div className="favourits">
          <select className="favourits__dropdown" value={this.state.selected} onChange={this.changeHandler}>
            <option className="favourits__label" value="select category">Select your category</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Services">Services</option>
            <option value="Kids">Kids</option>
            <option value="Groceries">Groceries</option>
          </select>
          <button className="favourits__refresh" onClick={this.refreshList}>REFRESH</button>
        </div>
        <section className="section-right">
          {this.state.list.length >= 1 ? this.state.list.map(item => { return <Locationitem handleOpenModal={this.handleOpenModal} deleteItem={this.deleteItem} removeReminder={this.removeReminder} getName={this.getName} key={item.id} data={item}></Locationitem> }) : 
          <div className="placeholder">
          <img className="placeholder__img"src={save} alt="save-icon"></img>
          <h2 className="placeholder__text">No location saved</h2>
          </div>}
        </section>
        {/* modal to enter the date and event */}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="reminder-modal"
          overlayClassName="reminder-overlay"
          ariaHideApp={false}
        >
          <form className="reminder">
            <div className="reminder-one">
              <p className="reminder-text">Reminder Date:</p>
              <Date setDate={this.setDate}></Date>
            </div>
            <div className="reminder-one">
              <p className="reminder-text">Event:</p>
              <input className="event" onChange={this.setEvent} value={this.state.value} name="name"></input>
            </div>
            <div className="reminder-allbuttons">
              <button className="reminder-button" onClick={this.saveReminder}>Save</button>
              <button className="reminder-button" onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </form>
        </ReactModal>
        {/* modal to prompt user */}
        <ReactModal
          isOpen={this.state.showModalTwo}
          contentLabel="Minimal Modal Example"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <p className="modal-text">You have a reminder for {this.item.name} and {this.item.event} event</p>
          <button className="modal-button" onClick={this.handleCloseModalTwo}>Ok</button>
        </ReactModal>
      </>
    )
  }
}
export default Allfavourits;
