import React, { Component } from 'react'
import { Button, Icon, Modal, Form, Message,Header } from 'semantic-ui-react'
const FirebaseApp = require('../auth')


const FunctionIntern = require('./FunctionIntern')

const MessageError = (props) => <Message size='mini' error header='Ops!!!' content={props.messageErr.content}/>

 class ModalSignUp extends Component {

   constructor(props) {
     super(props)
     
     this.state = { modalOpen: false, openModalSucess: false ,disabledButton: false, disabledButtonCancelar: false,
                  errorCampoNome: false, errorCampoSobrenome: false, errorCampoEmail: false, errorCampoSenha: false, errorCampoConfSenha: false,  
                  messageErro: false, messageContent: '', isLoading: false }    
  
     this.handleSave = this.handleSave.bind(this)
     this.handleChange = this.handleChange.bind(this)
   }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = () => {
    FunctionIntern.TextPattern()
    if(this.refs.nome.value !== '') {
      this.setState({disabledButton: false, errorCampoNome: false, messageErro: false })
    } 
    if(this.refs.sobrenome.value !== '') {
      this.setState({disabledButton: false, errorCampoSobrenome: false,  messageErro: false})
    } 
    if(this.refs.email.value !== '') {
      this.setState({disabledButton: false, errorCampoEmail: false,  messageErro: false})
    } 
    if(this.refs.senha.value !== '') {
      this.setState({disabledButton: false, errorCampoSenha: false,  messageErro: false})
    } 
    if(this.refs.confSenha.value !== '') {
      this.setState({disabledButton: false, errorCampoConfSenha: false,  messageErro: false})
    } 
  }

  handleSave() {
    const user = {
      nome: this.refs.nome.value,
      sobrenome: this.refs.sobrenome.value,
      email: this.refs.email.value,
      senha: this.refs.senha.value,
      confSenha: this.refs.confSenha.value
    }

      if(user.nome === '') {
        this.setState({disabledButton: true, errorCampoNome: true, messageErro: true, messageContent: 'Preencha campo nome'})
        return
      }
      if(user.sobrenome === '') {
        this.setState({disabledButton: true, errorCampoSobrenome: true, messageErro: true, messageContent: 'Preencha campo sobrenome'})
        return
      }
      if(user.email === '') {
        this.setState({disabledButton: true, errorCampoEmail: true, messageErro: true, messageContent: 'Preencha campo e-mail'})
        return
      }
      if(this.refs.email.validationMessage !== '') {
        this.setState({disabledButton: true, errorCampoEmail: true, messageErro: true, messageContent: this.refs.email.validationMessage})
        return
      }
      if(user.senha === '') {
        this.setState({disabledButton: true, errorCampoSenha: true, messageErro: true, messageContent: 'Preencha campo senha'})
        return
      }
      if(user.confSenha === '') {
        this.setState({disabledButton: true, errorCampoConfSenha: true, messageErro: true, messageContent: 'Preencha campo confirmação de senha'})
        return
      }
      if(user.senha !== user.confSenha) {
        this.setState({disabledButton: true, errorCampoSenha: true, errorCampoConfSenha: true, messageErro: true, messageContent: 'Suas senhas estão diferentes'})
        return
      }

      this.setState({disabledButton: true, disabledButtonCancelar: true, isLoading: true})
      console.log(user)
      FirebaseApp.createUser(user.nome, user.sobrenome,user.email,user.senha).then(res => {
          console.log(res)
          if(res.code === 'auth/weak-password') {
            this.setState({errorCampoSenha: true, errorCampoConfSenha: true, messageErro: true, messageContent: 'A senha deve conter mais de 6 dígitos'})
            this.setState({isLoading: false})
            return
          }
          if(res) {
            this.setState({ openModalSucess:true})
          }
      })
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Sign up</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}  
        size='mini' 
        closeIcon>
        <Modal.Header>Sign up</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSave} loading={this.state.isLoading} >
            <Form.Field required error={this.state.errorCampoNome}>
              <label>Nome</label>
              <input type='text' autoFocus id='nome' placeholder='Nome' ref='nome' onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required error={this.state.errorCampoSobrenome}>
              <label>Sobrenome</label>
              <input placeholder='Sobrenome' id='sobrenome' ref='sobrenome' onKeyPress={this.handleChange} />
            </Form.Field>
            <Form.Field required error={this.state.errorCampoEmail}>
              <label>E-mail</label>
              <div className="ui left icon input">
                <input  type='email' placeholder="E-mail" ref='email' onKeyPress={this.handleChange} /> 
                <Icon name='at' />
             </div>
            </Form.Field>
            <Form.Field required error={this.state.errorCampoSenha}>
              <label>Senha</label>
              <input type='password' placeholder='Senha' ref='senha' onKeyPress={this.handleChange}/>
            </Form.Field>
            <Form.Field required error={this.state.errorCampoConfSenha}>
              <label>Confirme sua senha</label>
              <input type='password' placeholder='Confirme sua senha' ref='confSenha' onKeyPress={this.handleChange}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        { this.state.messageErro === true ? <MessageError messageErr={{content: this.state.messageContent}}/> : null }
        <Modal.Actions>
          <Button color='red' size='tiny' onClick={this.handleClose}  disabled={this.state.disabledButtonCancelar} inverted>
            <Icon name='times' /> Cancelar
          </Button>
          <Modal basic size='small'
           open={this.state.openModalSucess}          
           onClose={this.handleClose}
           trigger={
            <Button color='green' size='tiny' onClick={this.handleSave} inverted disabled={this.state.disabledButton} id='btn_terminei'>
              <Icon name='checkmark' /> Terminei
            </Button>
            } >
          <Header icon='thumbs up outline' content='Parabéns novo integrante :)' />
          <Modal.Content>
            <p>
              Seu cadastro foi salvo com sucesso. Já pode fazer login
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleClose}>
              <Icon name='checkmark' /> Ok
            </Button>
          </Modal.Actions>
        </Modal>
        
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalSignUp