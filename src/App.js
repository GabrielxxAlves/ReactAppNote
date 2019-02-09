import React, { Component } from 'react';
import HeaderHome from './header'

class App extends Component {

  render() {
    return (
      <div>
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
          <div className='footer'>
              <p>© 2019 Copyright</p>
          </div>
      </div>
    );
  }
}

export default App;
