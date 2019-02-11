import React, { Component } from 'react'
import { Button, Icon, Modal, Input, Dropdown } from 'semantic-ui-react'

const options = [
  { key: '@.com', text: '@.com', value: '@.com' },
  { key: '@.com.br', text: '@.com.br', value: '@.com.br' },
]

  class ModalSignUp extends Component {
    render() {
      return (
        <Modal trigger={<button id='btn_sign' className="ui button">Sign up</button>} size='mini'>
          <Modal.Header>Sign up</Modal.Header>
          <Modal.Content>
                <label>Nome</label>
                <Input focus fluid placeholder='Nome' />
            <br/>
              <label>Sobrenome</label>
              <Input fluid placeholder='Sobrenome' />
            <br/>
           
              <label>E-mail</label>
              <Input fluid label={<Dropdown defaultValue='@.com' options={options} />}
              labelPosition='right' placeholder='@  E-mail'/>
            <br/>
              <label>Senha</label>
              <Input fluid placeholder='Senha' />
            <br/>
              <label>Confirme sua senha</label>
              <Input fluid placeholder='Confirme sua senha' />
            <br/>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' size='tiny' inverted>
                Cancelar
            </Button>
            <Button color='green' inverted size='tiny'>
              <Icon name='checkmark' /> Terminei
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }
  }

export default ModalSignUp