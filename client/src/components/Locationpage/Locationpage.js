import React from 'react'
import Locationitem from '../Locationitem/Locationitem'
import './Locationpage.scss'
import axios from 'axios'
import save from '../../assets/Icon-save.png'
import Header from '../Header/Header';
import ReactModal from 'react-modal';
import Date from '../Datepicker/Datepicker'
import { SERVER_ADDRESS } from '../../config';


class Locationpage extends React.Component {

  state = {
    list: [],
    url: "/",
    showModal: false,
    showModalTwo: false,
  }
  componentDidMount() {
    axios.get(`${SERVER_ADDRESS}/location`)
      .then(response => {
        let list = response.data.filter(item => item.category.toLowerCase() === this.props.match.params.category.toLowerCase())
        this.setState({ list: list, url: this.props.match.url })
      }).catch(err => console.log(err))
  }
  item = ""

  componentDidUpdate() {

    if (this.state.url !== this.props.match.url) {
      axios.get(`${SERVER_ADDRESS}/location`)
        .then(response => {
          this.setState({ list: response.data, url: this.props.match.url })
          let list = response.data.filter(item => item.category.toLowerCase() === this.props.match.params.category.toLowerCase())
          this.setState({ list: list, url: this.props.match.url })
        }).catch(err => console.log(err))
    }
    this.timeout = setTimeout(() => {
      this.state.list.forEach(item => {
        if (item.reminder) {
          axios.post(`${SERVER_ADDRESS}/location/${this.props.match.params.category}`, item)
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

  //for reminder popup
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
    let Event = event.target.value;
    this.obj.event = Event
  }

  //post reminder and refresh 
  reminder = () => {
    axios.post(`${SERVER_ADDRESS}/reminder`, this.obj)
      .then(response => {
        axios.get(`${SERVER_ADDRESS}/location`)
          .then(response => {
            this.setState({ list: response.data, url: this.props.match.url })
            let reminderItems = response.data.filter(item => item.category.toLowerCase() === this.props.match.params.category.toLowerCase())
            this.setState({ list: reminderItems, url: this.props.match.url })
          }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

  //delete saved item
  deleteItem = (name) => {
    let value = this.state.list.find(item => name.toLowerCase() === item.name.toLowerCase())
    let id = value.id
    axios.delete(`${SERVER_ADDRESS}/location/${id}`)
      .then(response => {
        this.setState({ list: response.data, url: this.props.match.url })
        let newList = response.data.filter(item => item.category.toLowerCase() === this.props.match.params.category.toLowerCase())
        this.setState({ list: newList, url: this.props.match.url })
      })
  }

  //removereminder
  removeReminder = (name) => {
    let value = this.state.list.find(item => name.toLowerCase() === item.name.toLowerCase())
    let id = value.id
    axios.delete(`${SERVER_ADDRESS}/reminder/${id}`)
      .then(response => {
        axios.get(`${SERVER_ADDRESS}/location`)
          .then(response => {
            this.setState({ list: response.data, url: this.props.match.url })
            let reminderItems = response.data.filter(item => item.category.toLowerCase() === this.props.match.params.category.toLowerCase())
            this.setState({ list: reminderItems, url: this.props.match.url })
          }).catch(err => console.log(err))
      })
  }

  render() {
    return (
      <>
        <Header></Header>
        <section className="section-right">
          {this.state.list.length >= 1 ? this.state.list.map(item => { return <Locationitem handleOpenModal={this.handleOpenModal} removeReminder={this.removeReminder} deleteItem={this.deleteItem} getName={this.getName} key={item.id} data={item}></Locationitem> }) :
            <div className="placeholder">
              <img className="placeholder__img" src={save} alt="save-icon"></img>
              <h2 className="placeholder__text">No location saved</h2>
            </div>}
        </section>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="reminder-modal"
          overlayClassName="reminder-overlay"
          ariaHideApp={false}>
          <form autoComplete="off" className="reminder">
            <div className="reminder-one">
              <p className="reminder-text">Reminder Date:</p>
              <Date setDate={this.setDate}></Date>
            </div>
            <div className="reminder-one">
              <p className="reminder-text">Event:</p>
              <input className="event" onChange={this.setEvent} name="name"></input>
            </div>
            <div className="reminder-allbuttons">
              <button className="reminder-button" onClick={this.saveReminder}>Save</button>
              <button className="reminder-button" onClick={this.handleCloseModal}>Cancel</button>
            </div>
          </form>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showModalTwo}
          contentLabel="Minimal Modal Example"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}>
          <p className="modal-text">You have a reminder for {this.item.name} and {this.item.event} event</p>
          <button className="modal-button" onClick={this.handleCloseModalTwo}>OK</button>
        </ReactModal>
      </>
    )
  }
}

export default Locationpage;
