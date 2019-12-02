import React from 'react'
import Locationitem from '../Locationitem/Locationitem'
import './Locationpage.scss'
import axios from 'axios'
import Header from '../Header/Header';
import ReactModal from 'react-modal';
import Date from '../Datepicker/Datepicker'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Locationpage extends React.Component{
    
  state={
    list:[],
    url:"/",
    showModal:false,
    showModalTwo:false,
    showToast:false,
    displayed:false,
  }
    componentDidMount(){
      axios.get('http://localhost:8080/location')
      .then(response=> {
       let list=response.data.filter(item =>item.category==this.props.match.params.category)
        this.setState({list:list ,url:this.props.match.url})
      })
 
    }
    item=""
    // notify = () => toast("Wow so easy !");
   componentDidUpdate(){
 
     if(this.state.url!=this.props.match.url){
      axios.get('http://localhost:8080/location')
      .then(response=> {
       let list=response.data.filter(item =>item.category==this.props.match.params.category)
        this.setState({list:list ,url:this.props.match.url})
     })
    }
     this.timeout=setTimeout(() => {
          this.state.list.map(item=>{
          if(item.reminder && !this.state.displayed){
          axios.post(`http://localhost:8080/location/${this.props.match.params.category}`,item)
          .then(response=>{
           if (response.data){
              this.item=item
              this.setState({showModalTwo:true ,displayed:true})
           }
          })
          .catch(err=>console.log(err))
        }
      })
    }, 10000);

   }
   //for reminder popup
   handleCloseModalTwo=(event)=>{
    event.preventDefault()
    this.setState({showModalTwo:false})
   }
    handleOpenModalTwo=()=>{
       this.setState({showModalTwo:true})
    }
  //for reminder setup
   handleCloseModal=(event)=>{
    event.preventDefault()
    this.setState({showModal:false})
   }
    handleOpenModal=()=>{
       this.setState({showModal:true})
    }

    obj={name:"",reminder:"",event:""}
    getName=(name)=>{
      this.obj.name=name
    }
    setDate=(event)=>{
      console.log(event)
      this.obj.reminder=event
    }
    changeHandler=(event)=>{
      console.log(event.target.value)
      let Event=event.target.value;
      this.obj.event=Event
      this.reminder()
    }
    
    reminder=()=>{
       axios.post('http://localhost:8080/reminder',this.obj)
       .then(response=>{
         console.log(response.data)
         axios.get('http://localhost:8080/location')
         .then(response=> {
          let reminderItems=response.data.filter(item =>item.category==this.props.match.params.category)
          console.log(reminderItems)
           this.setState({list:reminderItems ,url:this.props.match.url})
         }).catch(err=>console.log(err))
       }).catch(err=>console.log(err))
      
    }

    deleteItem=(name)=>{
       let value=this.state.list.find(item=>name == item.name)
       let id=value.id
       console.log(value)
       console.log(id)
      axios.delete(`http://localhost:8080/location/${id}`)
     .then(response=>{
        console.log(response.data)
        let newList=response.data.filter(item =>item.category==this.props.match.params.category)
           this.setState({list:newList ,url:this.props.match.url})
         })
    }
    
    render(){
        return(
          <>
          <Header addLocation={this.addLocation}></Header>
          <section className="section-right">
          {this.state.list ? this.state.list.map(item =>{return <Locationitem handleOpenModal={this.handleOpenModal} deleteItem={this.deleteItem} getName={this.getName} key={item.id} data={item}></Locationitem>}):<h2>No location saved for this category</h2>}
          </section>

          <ReactModal 
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  className="reminder-modal"
                  overlayClassName = "reminder-overlay"
                  ariaHideApp={false}
                  >
                 <form className="reminder">
                 <div className="reminder-one">
                  <p className="reminder-text">Reminder Date:</p>
                  <Date setDate={this.setDate}></Date>
                  </div>
                  <div className="reminder-one">
                  <p className="reminder-text">Event:</p>
                  <input onChange={this.changeHandler} name="name" className=""></input>
                  </div>
                  <div className="reminder-allbuttons"> 
                  <button className="reminder-button" onClick={this.handleCloseModal}>Save</button>
                  <button className="reminder-button" onClick={this.handleCloseModal}>Cancel</button>
                  </div>
                  </form>
            </ReactModal>
           
            <ReactModal 
              isOpen={this.state.showModalTwo}
              contentLabel="Minimal Modal Example"
              className="modal"
              overlayClassName = "overlay"
              ariaHideApp={false}
              >
              <p className="modal-text">You have a reminder for {this.item.name} and {this.item.event} event</p>
              <button className="modal-button" onClick={this.handleCloseModalTwo}>Ok</button>
             </ReactModal>
           
            </>
        )
    }
  }
  
export default Locationpage;
