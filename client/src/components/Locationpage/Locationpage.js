import React from 'react'
import Locationitem from '../Locationitem/Locationitem'
import './Locationpage.scss'
import axios from 'axios'
import Header from '../Header/Header';
import ReactModal from 'react-modal';
import Date from '../Datepicker/Datepicker'


class Locationpage extends React.Component{
    
  state={
    list:[],
    url:"/",
    showModal:false
  }
    componentDidMount(){
      axios.get('http://localhost:8080/location')
      .then(response=> {
       let list=response.data.filter(item =>item.category==this.props.match.params.category)
        this.setState({list:list ,url:this.props.match.url})
      })
    }
   componentDidUpdate(){
 
     if(this.state.url!=this.props.match.url){
      axios.get('http://localhost:8080/location')
      .then(response=> {
       let list=response.data.filter(item =>item.category==this.props.match.params.category)
        this.setState({list:list ,url:this.props.match.url})
      })
     }
   }

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
         })
       }).catch(err=>console.log(err))
      
    }

    // setInterval(() => {
    //   this.state.list.map(item=>{
    //     if(item.reminder){
    //       axios.get('http//localhost:8080/reminder')
    //       .then(response=>console.log(response.data))
    //       .catch(err=>console.log(err))
    //     }
    //   })
      
    // }, 3000);
    render(){
      console.log(this.obj)
        return(
          <>
          <Header addLocation={this.addLocation}></Header>
          <section className="section-right">
          {this.state.list ? this.state.list.map(item =>{return <Locationitem handleOpenModal={this.handleOpenModal} getName={this.getName} key={item.id} data={item}></Locationitem>}):null}
          </section>

          <ReactModal 
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  className="reminder-modal"
                  overlayClassName = "reminder-overlay"
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
                  <button className="reminder-button" onClick={this.handleCloseModal}>Save</button>
                  </form>
            </ReactModal>
          </>
        )
    }
  }
  
export default Locationpage;
