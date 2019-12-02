import React from 'react'
import './Locationsearch.scss'



class Locationitem extends React.Component{

    clickHandler =()=>{
     
      if (this.props.saveLocation) {
          this.props.saveLocation(this.props.data.name);
      }
    }
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
               <button className="item__button" onClick={this.clickHandler}>Save</button>
              </div>
            </section>
        )
    }
}
export default Locationitem;