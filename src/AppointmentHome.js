import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
 

import AddAmigosPage from './AddAmigosPage'
import AddCompromissosPage from './AddCompromissosPage'
import CompromissosPage from './CompromissosPage'

class AppointmentHome extends Component {
    state = { activeItem: 'add amigos' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
        render(){   
        const { activeItem } = this.state
        return (
            <div>
                <div>
                <Menu pointing secondary size='small' widths={3}>
                    <Menu.Item 
                        name='add amigos'
                        active={activeItem === 'add amigos'}
                        onClick={this.handleItemClick}
                        />
                    <Menu.Item
                        name='add compromissos'
                        active={activeItem === 'add compromissos'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='compromissos'
                        active={activeItem === 'compromissos'}
                        onClick={this.handleItemClick}
                    />
                    </Menu>
                 </div>
                 {this.state.activeItem === 'add amigos' ? <AddAmigosPage/> : null }
                 {this.state.activeItem === 'add compromissos' ? <AddCompromissosPage/> : null }
                 {this.state.activeItem === 'compromissos' ? <CompromissosPage/> : null }
                 
            </div>
        )
    }
}

export default AppointmentHome