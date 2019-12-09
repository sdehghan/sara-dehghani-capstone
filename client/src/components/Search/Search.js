import React from 'react'
import Locationsearch from '../Locationsearch/Locationsearch'
import './Search.scss'
import axios from 'axios'
import search from '../../assets/Icon-search.svg'
import ReactModal from 'react-modal';
import Header from '../Header/Header';

class Search extends React.Component {

  state = {
    loc: [],
    showModal: false,
    modalData: null,
    staticLoc: [],
    selected: ''
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    axios.get(`http://localhost:8080/`)
      .then(response => {
        this.setState({ loc: response.data, staticLoc: response.data })
      })
      .catch(err => console.log('could not find data', err))
  }

  saveLocation = (name) => {
    let obj = { name: name }
    axios.post('http://localhost:8080/location', obj)
      .then(response => {
        this.setState({ showModal: !this.state.showModal, modalData: "Your location is saved" })
      }
      )
      .catch(err => {
        this.setState({ showModal: !this.state.showModal, modalData: "You already saved this location" })
      })
  }
  //search by name
  submitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value
    let newLoc = this.state.loc.filter(loc => loc.name.toLowerCase().includes(name.toLowerCase()))
    this.setState({ loc: newLoc })

  }
  handleCloseModal = (event) => {
    event.preventDefault();
    this.setState({ loc: this.state.staticLoc, showModal: !this.state.showModal })
  }
  refreshList = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/`)
      .then(response => {
        this.setState({ loc: response.data, staticLoc: response.data, selected: "" })
      })
      .catch(err => console.log('could not find data', err))
  }

  changeHandler = (e) => {
    let data = this.state.staticLoc.filter(item => item.category.toLowerCase() === e.target.value.toLowerCase())
    if (e.target.value !== "") {
      this.setState({ selected: e.target.value, loc: data });
    } else if (e.target.value === "") {
      axios.get('http://localhost:8080/')
        .then(response => {
          this.setState({ loc: response.data, selected: "" })
        });
    }
  }

  render() {
    return (
      <>
        <Header></Header>
        <div className="search-box">
          <select className="favourits-search" value={this.state.selected} onChange={this.changeHandler}>
            <option value="">Select your category</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Services">Services</option>
            <option value="Kids">Kids</option>
            <option value="Groceries">Groceries</option>
          </select>

          <form className="search" onSubmit={this.submitHandler}>
            <div className="search__img-box">
              <img className="search__icon" src={search} alt="search" /><input name="name" className="search__input" placeholder="Input your location name"></input>
            </div>
            <div className="search__mobile">
              <button className="search__submit" type="submit">SEARCH</button>
              <button className="search__submit" onClick={this.refreshList}>REFRESH</button>
            </div>
          </form>
        </div>
        <section className="section-right">
          {this.state.loc ? this.state.loc.map(item => { return <Locationsearch key={item.id} saveLocation={this.saveLocation} data={item}></Locationsearch> }) : null}
        </section>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="modal"
          overlayClassName="overlay"
        >
          <p className="modal-text">{this.state.modalData} </p>
          <button className="modal-button" onClick={this.handleCloseModal}>Ok</button>
        </ReactModal>
      </>
    )
  }
}

export default Search;









