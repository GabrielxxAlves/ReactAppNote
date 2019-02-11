import React, { Component } from 'react';
import HeaderHome from './components/header/header'
import FooterHome from './components/footer/footer'
import Appointment from './components/appointment/appointment'
import Login from './components/login/login'
import { Switch, Route } from 'react-router-dom'
 
class App extends Component {
  render() {
    return (
      <div className='app'>
          <HeaderHome/>
          <Switch>
            <Route path='/' exact component={Appointment}/>
            <Route path='/login' component={Login}/>
          </Switch>
          <FooterHome/>
      </div>
    );
  }
}

export default App;
