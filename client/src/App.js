import React from 'react';
import Locationpage from './components/Locationpage/Locationpage'
import Search from './components/Search/Search'
import Login from './components/Login/Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Allfavourits from './components/Allfavourits/Allfavourits';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch >
          <Route path="/" exact component={Login}></Route>
          <Route path="/search" exact component={Search}></Route>
          <Route path="/location" exact component={Allfavourits}></Route>
          <Route exact path="/location/:category" component={Locationpage} />
        </Switch>
      </BrowserRouter>

    );
  }
}
export default App;
