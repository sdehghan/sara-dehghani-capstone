import React from 'react'
import Locationsearch from '../Locationsearch/Locationsearch'
import './Search.scss'
import axios from 'axios'
import ReactModal from 'react-modal';
import Header from '../Header/Header';

class Search extends React.Component{
  
  state={
    loc:[],
    showModal: false,
    modalData:null,
    staticLoc:[],
  }

  componentDidMount(){
    ReactModal.setAppElement('body');
    axios.get(`http://localhost:8080/`)
    .then(response=>{
       this.setState({loc:response.data,staticLoc:response.data})})
       .catch(err=>console.log('could not find data',err))
  
    }
 
  saveLocation=(name)=>{
   
    let obj={name:name}
    axios.post('http://localhost:8080/location',obj)
      .then(response=>
      {console.log(response.data)
       this.setState({showModal:!this.state.showModal,modalData:"Your location is saved"})
      }
      )
      .catch(err=>{
        this.setState({showModal:!this.state.showModal,modalData:"You already saved this location"})
      })
  }

  submitHandler=(event)=>{
    event.preventDefault();
     const name=event.target.name.value
     let newLoc =this.state.loc.filter(loc=>loc.name.toLowerCase()==name.toLowerCase())
     this.setState({loc:newLoc})
    
  }
  handleCloseModal=(event)=>{
    event.preventDefault();
    this.setState({loc:this.state.staticLoc,showModal:!this.state.showModal})
  }

  render(){
      return(
        <>
        <Header></Header>
        <form onSubmit={this.submitHandler}>
         <input name="name" className="search-input" placeholder="Input your location name"></input>
         <button className="search-submit" type="submit">Search</button>
        </form>
         <section className="section-right">
           {this.state.loc ? this.state.loc.map(item =>{return <Locationsearch key={item.id}  saveLocation={this.saveLocation} data={item}></Locationsearch>}):null}
         </section>
         <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           className="modal"
           overlayClassName = "overlay"
           >
           <p className="modal-text">{this.state.modalData} </p>
           <button className="modal-button" onClick={this.handleCloseModal}>Ok</button>
        </ReactModal>
        </>
      )
  }
}

export default Search;









