import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'


class MenuAppointment extends Component {
    state = { activeItem: 'add amigo' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render(){   
        const { activeItem } = this.state
        return (
            <div>
                <Menu pointing secondary size='small' widths={4}>
                    <Menu.Item 
                        name='add amigo'
                        active={activeItem === 'add amigo'}
                        onClick={this.handleItemClick}
                        />
                    <Menu.Item
                        name='compromissos'
                        active={activeItem === 'compromissos'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='add'
                        active={activeItem === 'add'}
                        onClick={this.handleItemClick}
                     />
                    <Menu.Item
                        name='configuração'
                        active={activeItem === 'configuração'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </div>
        )
    }
}

class AppointmentHome extends Component {
    render(){   
        return (
            <div>
                <MenuAppointment/>
                <div className='embreve'>
                <h1>BEM-VINDO, BICHO</h1>
                <br/>
                <h3>Aguardem a outra versão</h3>
                </div>
            </div>
        )
    }
}

export default AppointmentHome