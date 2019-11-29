import React from 'react'
import Locationitem from '../Locationitem/Locationitem'
import './Locationpage.scss'
import axios from 'axios'
import Header from '../Header/Header';




class Locationpage extends React.Component{
    
  state={
    list:[]
  }
    componentDidMount(){
      axios.get('http://localhost:8080/location')
      .then(response=> {
       console.log(response.data, this.props.match.params.category)
       let list=response.data.filter(item =>item.category==this.props.match.params.category)
        this.setState({list:list})
      })
    }
    render(){
        return(
          <>
          <Header addLocation={this.addLocation}></Header>
          <section className="section-right">
          {this.state.list ? this.state.list.map(item =>{return <Locationitem key={item.id} data={item}></Locationitem>}):null}
          </section>
          </>
        )
    }
  }
  
export default Locationpage;
