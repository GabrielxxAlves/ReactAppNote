import React, { Component } from 'react';
import HeaderHome from './header/header'
import FooterHome from './footer/footer'

class App extends Component {
  render() {
    return (
      <div className='app'>
          <HeaderHome/>
          <div className='conteudo'>
            <div class="ui placeholder segment">
              <div class="ui icon header">
                <i class="handshake outline icon"></i>
                Vamos marcar aquele compromisso?
              </div>
              <div class="ui primary button">Add Compromisso</div>
            </div>
          </div>
          <FooterHome/>
      </div>
    );
  }
}

export default App;
