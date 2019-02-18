import React, { Component } from 'react';
import HeaderHome from './components/header/header'
import FooterHome from './components/footer/footer'
import Appointment from './components/appointment/appointment'
import Login from './login'
import AppointmentHome from './AppointmentHome'
import { Switch, Route, Redirect } from 'react-router-dom'

const isVerify = require('./components/auth')

const PrivateLogin = ({ component: Component, ...rest}) => (
  <Route { ...rest }  
  render={propos =>  isVerify.isVerifyUser() ? ( <Redirect to={{ pathname: '/appointmenthome', state: { from: propos.location} }}/> ) 
 : (<Component {...propos} /> ) } />
)

const PrivateAppointmentHome = ({ component: Component, ...rest}) => (
  <Route { ...rest }  
  render={propos => isVerify.isVerifyUser() ? (<Component {...propos} /> )
: ( <Redirect to={{ pathname: '/login', state: { from: propos.location} }}/> ) 
  } />
)


class App extends Component {
  render() {
    return (
      <div className='app'>
          <HeaderHome/>
          <Switch>
            <Route path='/' exact component={Appointment}/>
            <PrivateLogin exact path='/login' component={Login}/>
            <PrivateAppointmentHome exact path='/appointmenthome' component={AppointmentHome}/>   
            <Route render={ () => <Redirect to='/login'/> }/>         
          </Switch>
          <FooterHome/>
      </div>
    );
  }
}

export default App
