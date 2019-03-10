import React, {Component} from 'react'
import { Grid, Header, Icon, Search, Segment, Card, Button, Image } from 'semantic-ui-react'
import axios from 'axios'
import _ from 'lodash'

const database = require('./components/database/database')
const GetDatabase = require('./components/database/GetDatabase')


class AddFriendCard extends Component {
 constructor(props) {
    super(props)

    this.addFriends = this.addFriends.bind(this)
 }

 addFriends() {
   const friend = {
     uid: this.props.user.uid,
     nome: this.props.user.nome,
     sobrenome: this.props.user.sobrenome
   }  

   database.addFriend(friend)
   .then( res => console.log(res))
   .catch(err => console.log(err))
 }

 render() {
   return(
    <Card centered>
      <Card.Content>
        <Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' circular />
        <Card.Header>{this.props.user.title}</Card.Header>
        <Card.Meta></Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <Button inverted color='green' fluid compact onClick={this.addFriends}>
            <Icon name='user plus' /> Add
          </Button>
      </Card.Content>
    </Card>
   )
 }
}

class ApproveFriendCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friend: this.props.obj
    }
    this.approve = this.approve.bind(this)
    this.noAppove = this.noAppove.bind(this)
  }
  
  approve() {
    const friend = {
      uid: this.refs.uid.textContent,
      nome: this.refs.nome.textContent,
      sobrenome: this.refs.sobrenome.textContent
    }
    const t = database.approveFriend(friend)
    console.log(t)
  }

  noAppove() {
    const uid = this.refs.uid.textContent
    database.removeFriend(uid)
 
  }

  render() {
    return(
      <Card>
      <p hidden ref='uid'>{this.state.friend.uid}</p>
      <p hidden ref='nome'>{this.state.friend.nome}</p>
      <p hidden ref='sobrenome'>{this.state.friend.sobrenome}</p>
        <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        <Card.Header>{this.state.friend.nome}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button inverted color='green' onClick={this.approve}>
            Aprovar
          </Button>
          <Button inverted color='red' onClick={this.noAppove}>
            Recusar
          </Button>
        </div>
      </Card.Content>
    </Card>
    )
  }
}

class AddAmigosPage extends Component {
      objFriend = {
        friend: null,
        isVerify: false,
        loading: true,
        uid: null
      }
      componentWillMount() {
        this.objFriend.uid = JSON.parse(localStorage.getItem('user')).uid
        this.setState({friend: this.objFriend })
        this.resetComponent()
        GetDatabase.GetAddFriends()
        .then(res => {
          if(res.length !== 0) {
            this.objFriend.friend = res
            this.objFriend.isVerify = true
            this.objFriend.loading = false
          } else {
            this.objFriend.loading = false
          }
          this.setState({friend: this.objFriend })
        }) 
      }
      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
      handleResultSelect = (e, { result }) => this.setState({ value: result.title, result: result })
      handleSelectCardValue = () => {
        this.setState({isCard: true, valueCard: this.state.result, value: ''})
      }
      handleOnFocus = () => this.setState({isCard: false})
      handleSearchChange = (e, { value }) => {
        let usersGet = []
        axios.get('https://app-appointment-1ff65.firebaseio.com/users.json')
        .then(data => {
            Object.keys(data.data).map( key => {
                if(data.data[key].uid !==  this.objFriend.uid) {
                  let obj = {
                              title: data.data[key].nome +' '+data.data[key].sobrenome,
                              image: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
                              uid: data.data[key].uid,
                              nome: data.data[key].nome,
                              sobrenome: data.data[key].sobrenome
                            }
                  usersGet.push(obj)
                }
                return true
            })
            this.setState({ isLoading: true, value })
            setTimeout(() => {
                if (this.state.value.length < 1) return this.resetComponent()
                const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
                const isMatch = result => re.test(result.title)
                this.setState({
                  isLoading: false,
                  results: _.filter(usersGet, isMatch),
                })
            },300)
        })
      }
    
      render() {  
        const { isLoading, value, results, isCard, valueCard, friend } = this.state  
        return (
            <Segment placeholder size='small' >
            <Grid stackable columns={2}>
            <Grid.Column>
              <Segment textAlign='center' clearing >
              
                <Header icon >
                <Icon name='search' />
                    Encontre seus amigos
                </Header>
                <Search fluid aligned='center' ref='seachResult' input={{ icon: 'search', iconPosition: 'left', action:{ size:'mini', color: 'blue', content: 'Escolher', onClick: this.handleSelectCardValue}  }}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  results={results}
                  value={value}
                  onFocus={this.handleOnFocus}
                  {...this.props}
                  size='mini'
                  noResultsMessage='Não a registros'
                  placeholder='Nome'/>
                  { isCard === true && valueCard !== '' ? <AddFriendCard user={valueCard}/> : null }
                  
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment textAlign='center' loading={friend.loading}>
                { friend.isVerify ?
                    friend.friend.map((element,index) => {
                         return <ApproveFriendCard className="friendCard" obj={element} key={index} />
                      })
                  :  <Header icon> <Icon name='users' /></Header> }
              </Segment>
            </Grid.Column>
          </Grid>
            </Segment>
        )
    }
}


export default AddAmigosPage