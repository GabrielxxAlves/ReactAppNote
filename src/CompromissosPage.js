import React, {Component} from 'react'
import { Divider, Grid, Segment, List, Icon, Accordion, Header, Button, Popup, Image, Label } from 'semantic-ui-react'

const GetData = require('./components/database/GetDatabase')
const database = require('./components/database/database')

class ListMeusCompromissos extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      compromisso: this.props.compromisso
    }
  }
  render() {
    return(
      <List divided relaxed>
      <List.Item>
        <List.Icon name='travel' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>
            {this.state.compromisso.nomeCompromisso} - {this.state.compromisso.data} - {this.state.compromisso.hora}  
          </List.Header>
          <List.Description>Tipo: {this.state.compromisso.tipoCompromisso}</List.Description>
          <List.Description>Local: {this.state.compromisso.local}</List.Description>
          <List.Description>Descrição: {this.state.compromisso.descricao}</List.Description>
          
          {this.props.compromisso.participantes && 
            <Popup trigger={  <List.Description> <b>Participantes</b> <Icon name='user circle outline' /></List.Description>} flowing hoverable>
            <Grid centered divided columns={this.state.compromisso.participantes.length}>
              {
                this.state.compromisso.participantes.map((item,index) => {
                  return Object.keys(item).map( key => {
                         return <Grid.Column textAlign='center' key={index}>
                          <Header> <Image src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' avatar /></Header>
                          <p>
                            <b>{item[key].nome + ' ' + item[key].sobrenome}</b>
                          </p>
                          {item[key].status === 'aceito' && <p> {item[key].status} <Icon name='checkmark' color='green' /> </p> }
                          {item[key].status === 'pentende' && <p> {item[key].status} <Icon name='exclamation' color='yellow' /> </p> }
                          {item[key].status === 'recusado' && <p> {item[key].status} <Icon name='times' color='red' /> </p> } 
                        </Grid.Column>
                      
                      })    
                    })
                 }
              </Grid>
          </Popup>
          }
        </List.Content>
      </List.Item>
    </List>
    )
  }
}

class ListCompromissosPendentes extends Component {
  constructor(props) {
    super(props)

     this.state = { activeIndex: undefined, compromissoPendentes: this.props.compromissoPendentes }

     this.aceitaCompromisso = this.aceitaCompromisso.bind(this)
     this.recusadoCompromisso = this.recusadoCompromisso.bind(this)
  }
  
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  
  aceitaCompromisso() {
    const objData = {
      compromissoUid:this.refs.compromissoUid.textContent,
      criadoUid: this.refs.criadoUid.textContent,
      nomeCompromisso: this.state.compromissoPendentes.nomeCompromisso,
      nomeCriador: this.state.compromissoPendentes.nomeCriador,
      tipoCompromisso: this.state.compromissoPendentes.tipoCompromisso,
      descricaoCompromisso:this.state.compromissoPendentes.descricao,
      localCompromisso: this.state.compromissoPendentes.local,
      dataCompromisso: this.state.compromissoPendentes.data, 
      horaCompromisso: this.state.compromissoPendentes.hora, 
      status: 'aceito'
    }
    database.aceitoOrRecusado(objData)

    window.location.reload()
  }

  recusadoCompromisso() {
    const objData = {
      compromissoUid:this.refs.compromissoUid.textContent,
      criadoUid: this.refs.criadoUid.textContent,
      status: 'recusado'
    }
    database.aceitoOrRecusado(objData)

    window.location.reload()
  }

  render() {
    const { activeIndex } = this.state
    return(
      <Accordion fluid styled>
      <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
        <Icon name='dropdown' />
        {this.state.compromissoPendentes.nomeCompromisso}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <p> Criador: {this.state.compromissoPendentes.nomeCriador}</p>
        <p> Tipo do compromisso : {this.state.compromissoPendentes.tipoCompromisso}</p>
        <p> Descrição : {this.state.compromissoPendentes.descricao}</p>
        <p> Local: {this.state.compromissoPendentes.local}</p>
        <p> Data: {this.state.compromissoPendentes.data}   Hora: {this.state.compromissoPendentes.hora}</p>
        <p hidden ref='compromissoUid'>{this.state.compromissoPendentes.compromissoUid}</p>
        <p hidden ref='criadoUid'>{this.state.compromissoPendentes.criadoUid}</p>
        <div className="div_btn_compromissoPendentes">
        <Button inverted color='green' size='mini' fluid onClick={this.aceitaCompromisso}>Aceitar</Button>
        <Button inverted color='red' size='mini' fluid  onClick={this.recusadoCompromisso}>Recusar</Button>
        </div>
      </Accordion.Content>
    </Accordion>
    )
  }
}


class CompromissosPage extends Component {
  constructor() {
    super()

    this.state = {
      compromissos: undefined,
      compromissoPendentes: undefined,
      isVerifyCompromissos: false,
      isVerifyCompromissosPendentes: false,
      loadingMeusCompromissos: true,
      loadingMeusCompromissosPendentes: true
    }
  }
  componentDidMount() {
    GetData.GetMeusCompromissos()
    .then(res => {
      if(res.length !== 0 ) {
        this.setState({compromissos: res, isVerifyCompromissos: true, loadingMeusCompromissos: false})
      } else {
        this.setState({ loadingMeusCompromissos: false})
      }
    })
    
    GetData.GetCompromissosPendentes()
    .then(res => {
      if(res.length !== 0) {
        this.setState({compromissoPendentes: res, isVerifyCompromissosPendentes: true, loadingMeusCompromissosPendentes: false})
      } else {
        this.setState({loadingMeusCompromissosPendentes: false})
      }
    })
  }
  render() {
      return (
          <Segment placeholder>
            <Grid columns={2} >
              <Divider vertical>Or</Divider>
                <Grid.Row verticalAlign='middle'>
                  <Grid.Column>
                  <Segment placeholder loading={this.state.loadingMeusCompromissos}>
                    <Header textAlign='center'>
                      Meus Compromissos
                    </Header>
                    {this.state.isVerifyCompromissos ?
                        this.state.compromissos.map((element, index) => {
                          return <ListMeusCompromissos compromisso={element} key={index}/>
                        })
                       : <Label>Nenhum Compromisso</Label> }
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                  <Segment placeholder loading={this.state.loadingMeusCompromissosPendentes}>
                    <Header textAlign='center'>
                      Compromissos Pendentes
                    </Header>
                      {this.state.isVerifyCompromissosPendentes ? 
                        this.state.compromissoPendentes.map((item, index) => {
                          return <ListCompromissosPendentes compromissoPendentes={item} key={index}/>
                        })
                        : <Label>Nenhum Compromisso Pendente</Label> }
                      </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
  }
}

export default CompromissosPage