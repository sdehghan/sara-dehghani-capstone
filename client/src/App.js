import React from 'react';
import Locationpage from './components/Locationpage/Locationpage'
import Search from './components/Search/Search'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';

class  App extends React.Component {
  render(){
  return (
    <div className="App">
     <BrowserRouter>
        <Switch >
         <Route path="/" exact component={Search}></Route>
         <Route exact path="/location/:category" component={Locationpage}/>
        </Switch>
       </BrowserRouter>
    </div>
  );
}
}
export default App;
