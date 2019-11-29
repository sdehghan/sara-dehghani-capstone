import React from 'react'
import Locationsearch from '../Locationsearch/Locationsearch'
import './Search.scss'
import axios from 'axios'
import Header from '../Header/Header';

class Search extends React.Component{
  
  state={
    loc:[]
  }
 
  componentDidMount(){
      axios.get(`http://localhost:8080/`)
      .then(response=>{
         this.setState({loc:response.data})
      })
    }

  saveLocation=(name)=>{

    let obj={name:name}
    axios.post('http://localhost:8080/location',obj)
        .then(response=>console.log(response.data))
    .catch(err=>console.log('could not find data',err))
  }

  submitHandler=(event)=>{
    event.preventDefault();
     const name=event.target.name.value
     let newLoc =this.state.loc.filter(loc=>loc.name==name)
     this.setState({loc:newLoc})
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
      
        </>
      )
  }
}

export default Search;









