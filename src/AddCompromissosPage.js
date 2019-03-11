import React, {Component} from 'react'
import { Button, Icon, Header, Step, Form, Dropdown, Progress, Modal, Message} from 'semantic-ui-react'

const GetFriends = require('./components/database/GetDatabase')
const database = require('./components/database/database')
const tipoCompromisso = [ {  value: 'reuniao', text: 'Reunião' }  ]

// class ListFriends extends Component {
//     constructor(props) {
//         super(props)
        
//         this.state = {
//             friend: this.props.friend
//         }
//     }
//     render() {
//         return (
//             <List divided verticalAlign='middle'>
//                 <List.Item>
//                 <List.Content floated='right'>
//                     <Button inverted size="mini" color='green'>Add</Button>
//                 </List.Content>
//                 <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
//                 <List.Content>{this.state.friend.nome}</List.Content>
//                 </List.Item>
//             </List>
//         )
//     }
// }

class StepCompromisso extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            next: false,
            stepCompromisso: false,
            stepAmigos: false,
            stepLocal: false,
            stepTerminei: false
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if(newProps.next === 'stepCompromisso') {
            this.setState({stepCompromisso: true})
        }
        if(newProps.next === 'stepAmigos') {
            this.setState({stepAmigos: true})
        }   
        if(newProps.next === 'stepLocal') {
            this.setState({stepLocal: true})
        }   
        if(newProps.next === 'stepTerminei') {
            this.setState({stepTerminei: true})
        }   
    }

    render() {
        return(
            <Step.Group fluid>
            <Step active={this.state.stepCompromisso} completed={this.state.stepCompromisso}>
              <Icon name='handshake' />
              <Step.Content>
                <Step.Title>Compromisso</Step.Title>
              </Step.Content>
            </Step>
        
            <Step active={this.state.stepAmigos} completed={this.state.stepAmigos}>
              <Icon name='users' />
              <Step.Content>
                <Step.Title>Amigos</Step.Title>
              </Step.Content>
            </Step>
         
            <Step active={this.state.stepLocal} completed={this.state.stepLocal}>
              <Icon name='calendar alternate outline' />
              <Step.Content>
                <Step.Title>Local e Data</Step.Title>
              </Step.Content>
            </Step>

            <Step active={this.state.stepTerminei} completed={this.state.stepTerminei}>
            <Icon name='thumbs up outline' />
            <Step.Content>
              <Step.Title>Terminei</Step.Title>
            </Step.Content>
          </Step>
          </Step.Group>
        )
    }
}



class AddCompromissosPage extends Component {
    objCompromisso = {
        nomeCompromisso: undefined,
        tipoCompromisso: undefined,
        descricao: undefined,
        amigos: undefined,
        local: undefined,
        data: undefined,
        hora: undefined
    }
    constructor() {
        super()

        this.state = {
            stepCompromisso: true,
            stepAmigos: false,
            stepLocal: false,
            stepTerminei: false,
            next: false,
            friends: null,
            isVerify: false,
            progress: false,
            percentProgress:0,
            openModal: false,
            objFormField: { 
                errorForm: false,
                errorNomeCompromisso: false, 
                errorTipoCompromisso: false, 
                errorDescricaoCompromisso: false,
                errorAmigos: false,
                errorLocalCompromisso: false,
                errorDataHoraCompromisso: false
            }
        }
        this.stepCompromisso = this.stepCompromisso.bind(this)
    }

    componentDidMount() {
        GetFriends.GetFriends()
        .then(res => {
            if(res.length !== 0) {
                this.setState({friends: res, isVerify: true})
            }
        })
    }

    resetState = () => {
        this.setState({
            stepCompromisso: false,
            stepAmigos: false,
            stepLocal: false,
            stepTerminei: false
        })
    }

    resetObjFormFied = () => {
        this.setState({ 
            objFormField: { 
                errorForm: false, 
                errorNomeCompromisso: false,
                errorTipoCompromisso: false, 
                errorDescricaoCompromisso: false,
                errorAmigos: false,
                errorLocalCompromisso: false,
                errorDataHoraCompromisso: false
            }
        })
    }
    
    stepCompromisso = () => {
        if(this.refs.nomeCompromisso.value === '') {
            this.setState({ objFormField: { errorForm: true, errorNomeCompromisso: true}})
            return
        }
        if(this.refs.tipoCompromisso.state.value === '') {
            this.setState({ objFormField: { errorForm: true, errorTipoCompromisso: true}})
            return
        }
        if(this.refs.descricao.value === '') {
            this.setState({ objFormField: { errorForm: true, errorDescricaoCompromisso: true}})
            return
        }

        this.objCompromisso.nomeCompromisso = this.refs.nomeCompromisso.value
        this.objCompromisso.tipoCompromisso = this.refs.tipoCompromisso.state.value
        this.objCompromisso.descricao = this.refs.descricao.value
        
        this.resetState()
        this.setState({next: 'stepCompromisso', stepAmigos: true })
    }

    stepAmigos = () => {
        if(this.refs.dropdownAmigos.state.value.length === 0) {
            this.setState({ objFormField: { errorForm: true, errorAmigos: true}})
            return
        }

        this.objCompromisso.amigos = this.refs.dropdownAmigos.state.value

        this.resetState()
        this.setState({next: 'stepAmigos', stepLocal: true })
    }
    stepLocal = () => {
   
        if(this.refs.local.value === '') {
            this.setState({ objFormField: { errorForm: true, errorLocalCompromisso: true}})
            return
        }

        if(this.refs.dataHora.value === '') {
            this.setState({ objFormField: { errorForm: true, errorDataHoraCompromisso: true}})
            return
        }

        this.objCompromisso.local = this.refs.local.value

        let dataArray = this.refs.dataHora.value.substring(0,10).split('-')
        let data = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
        let hora = this.refs.dataHora.value.substring(11,16)

        this.objCompromisso.data = data
        this.objCompromisso.hora = hora

        this.resetState()
        this.setState({next: 'stepLocal', stepTerminei: true })
    }
    stepTerminei = () => {
        this.resetState()
        this.setState({next: 'stepTerminei', progress: true })
        let percent = 100
        setTimeout(() => {
            this.setState({percentProgress: percent })
        },3000)
        
        database.addCompromisso(this.objCompromisso)
            
        setTimeout(() => {
            this.setState({openModal: true })
        },5000)
           
    }

    refazerOrFinish = () => {
        window.location.reload()
    }

    render() {
        return (
            <div>
                <StepCompromisso next={this.state.next}/>
                { this.state.stepCompromisso &&
                <div className='divFormStep'>
                    <Form error={this.state.objFormField.errorForm}>
                        <Form.Field error={this.state.objFormField.errorNomeCompromisso}>
                            <label>Nome compromisso</label>
                            <input placeholder='Nome compromisso' ref='nomeCompromisso' onFocus={this.resetObjFormFied} />
                        </Form.Field>
                        <Form.Field  error={this.state.objFormField.errorTipoCompromisso}>
                            <label>Tipo  de compromisso</label>
                            <Dropdown placeholder='Tipo de compromisso' fluid selection options={tipoCompromisso} ref='tipoCompromisso'  onFocus={this.resetObjFormFied} />
                        </Form.Field>
                        <Form.Field  error={this.state.objFormField.errorDescricaoCompromisso}>
                            <label>Descrição</label>
                            <textarea placeholder='Descrição' rows='2' ref='descricao'  onFocus={this.resetObjFormFied}/>
                        </Form.Field>
                        <Button type='button' inverted color='green' onClick={this.stepCompromisso} >Proximo</Button>
                        <Message error
                        header='Opa, aconteceu algo de errado'
                        content='Preenchar os campo que está em vermelho.'
                        />
                    </Form>
                </div>
                }
                {this.state.stepAmigos ?
                    this.state.isVerify ? 
                    <div>
                        <div className='divListFriends'>
                        <Form error={this.state.objFormField.errorForm}>
                            <Form.Field error={this.state.objFormField.errorAmigos}>
                                <label>Selecione seus amigos</label>
                                <Dropdown placeholder='Amigos' fluid multiple selection options={this.state.friends} ref='dropdownAmigos' onFocus={this.resetObjFormFied}/>
                            </Form.Field>   
                            <br/>
                            <Button type='button' inverted color='green' onClick={this.stepAmigos}>Proximo</Button>
                            <Message error 
                            header='Opa, aconteceu algo de errado'
                            content='Escolha pelo menos um amiguinho.'
                            />
                        </Form>
                        </div>
                    </div> 
                    : <p>Não tem amigos ;(</p> : null
                }
                {this.state.stepLocal && 
                    <div className='divFormStep'>
                        <Form error={this.state.objFormField.errorForm}>
                            <Form.Field error={this.state.objFormField.errorLocalCompromisso}>
                                <label>Local</label>
                                <input placeholder='Local' ref='local' onFocus={this.resetObjFormFied} />
                            </Form.Field>
                            <Form.Field error={this.state.objFormField.errorDataHoraCompromisso}>
                                <label>Data</label>
                                <input type='datetime-local' placeholder='Data' ref='dataHora' onFocus={this.resetObjFormFied} />
                            </Form.Field>
                            <Button type='button' inverted color='green' onClick={this.stepLocal}>Proximo</Button>
                            <Message error
                            header='Opa, aconteceu algo de errado'
                            content='Preenchar os campo que está em vermelho.'
                            />
                        </Form>
                    </div>
                }
                {this.state.stepTerminei && 
                    <div className='divFormStep'>
                    <Form>
                        <Form.Field>
                            <label>Deseja realmente marcar esse compromisso? Ou, se deseja refazer as operações. Só clicar no botão "Refazer"</label>
                        </Form.Field>
                        <Button type='button' inverted color='green' onClick={this.stepTerminei} >Sim</Button>
                        <Button type='button' inverted color='red' onClick={this.refazerOrFinish}>Refazer</Button>
                    </Form>
                    </div>
                }
                {this.state.progress && 
                    <div className='divFormStep'>
                        <label>Aguarde...</label>
                        <Progress percent={this.state.percentProgress} indicating autoSuccess/>
                    </div>
                }
                <Modal
                    dimmer='blurring'
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    basic
                    size='small'
                >
                <Header icon='check' content='Deu tudo certinho' />
                <Modal.Content>
                  <h3>Seu compromisso foi salvo com sucesso!! ;)</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.refazerOrFinish} inverted>
                    <Icon name='checkmark' />Ok!
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
        )
    }
}


export default AddCompromissosPage