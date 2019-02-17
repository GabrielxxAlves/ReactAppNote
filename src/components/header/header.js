import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Feed, Dropdown } from 'semantic-ui-react'
import ModalSignUp from './modalSignUp'
const fire = require('../auth')

class UserLogado extends Component  {
    constructor(props) {
        super()
    }
    
    componentDidMount() {
      fire.onAuthStateChanged()
    }

    signOut() {
        fire.signOut()
        localStorage.removeItem('user')
        window.location.reload()
    }

    render() {
        return (  
            <Feed>
                <Feed.Event>
                    <Feed.Label>
                        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' alt='icon' />
                    </Feed.Label>
                    <Feed.Content>
                    <Dropdown trigger={<span>Olá, <strong>{this.props.user.nome} {this.props.user.sobrenome}</strong></span>}>
                        <Dropdown.Menu>
                        <Link to='/login'>
                            <Dropdown.Item text='Sign Out' icon='sign-out' onClick={this.signOut}/>
                        </Link>
                        </Dropdown.Menu>
                    </Dropdown> 
                    </Feed.Content> 
                </Feed.Event>
            </Feed>
        )
    }
}

class HeaderHome extends Component  {

    state = {
        nome: null,
        sobrenome: null,
        isActive: false
    }
    componentDidMount(){
       if(localStorage.getItem('user')){
            const userGet = JSON.parse(localStorage.getItem('user'))
            this.setState({
                nome: userGet.nome,
                sobrenome: userGet.sobrenome,
                isActive: true
            })
       }
    }
    
    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <h2 className="ui header">
                        <Link to='/'>
                            <i className="handshake outline icon" id="iconHand"></i>
                            <div className="content">Mark Appointment</div>
                        </Link>
                    </h2>
                </div>
                <div className='menu'>
                {this.state.isActive === true ? <UserLogado user={{nome: this.state.nome, sobrenome: this.state.sobrenome}}/>  :
                    <div>
                        <ModalSignUp/>
                        <Link to='/login'>
                            <button  className="ui button">Login</button>
                        </Link>
                    </div> 
                    }
                </div>
            </div>
        )
    }
}

export default HeaderHome