import axios from 'axios'

const GetAddFriends = async() => {
    const uid = JSON.parse(localStorage.getItem('user')).uid
    const url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${uid}"`

    let arrayFriends = []
    let friends = undefined
    let friend = null
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            if(get.data[key].addFriends) {
                friends = get.data[key].addFriends  
            }
            return true
        })
      
        if(friends) {
            Object.keys(friends).map( key => { 
                friend = { uid: friends[key].uid, nome: friends[key].nome, sobrenome: friends[key].sobrenome }
                arrayFriends.push(friend)
                return true
            })  
           
        }
    })
    return arrayFriends
}

const GetFriends = async() => {
    const uid = JSON.parse(localStorage.getItem('user')).uid
    const url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${uid}"`

    let arrayFriends = []
    let friends = undefined
    let friend = null
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            if(get.data[key].friends) {
                friends = get.data[key].friends  
            }
            return true
        })
    
        if(friends) {
            Object.keys(friends).map( key => { 
                friend = { key: friends[key].uid, text: friends[key].nome, value: friends[key].uid }
                arrayFriends.push(friend)
                return true
            })  
           
        }
    })
    return arrayFriends
 
}


const GetMeusCompromissos = async() => {
    const uid = JSON.parse(localStorage.getItem('user')).uid
    const url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${uid}"`
    
    let arrayCompromissos = []
    let compromissos = undefined
    let objCompromisso = null
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            if(get.data[key].compromissos) {
                compromissos = get.data[key].compromissos
            }
            return true
        })

        if(compromissos) {
            Object.keys(compromissos).map( key => { 
                objCompromisso = { 
                    nomeCompromisso: compromissos[key].nomeCompromisso,
                    tipoCompromisso: compromissos[key].tipoCompromisso,
                    descricao: compromissos[key].descricao,
                    local: compromissos[key].local,
                    data: compromissos[key].data,
                    hora: compromissos[key].hora,
                    participantes: compromissos[key].participantes
                }
                arrayCompromissos.push(objCompromisso)
                return true
            })  
        }
    })
    return arrayCompromissos
}

const GetCompromissosPendentes = async() => {
    const uid = JSON.parse(localStorage.getItem('user')).uid
    const url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${uid}"`

    let arrayCompromissosPendentes = []
    let compromissosPendentes = undefined
    let objCompromissoPendentes = null
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            if(get.data[key].pendCompromissos) {
                compromissosPendentes = get.data[key].pendCompromissos
            }
            return true
        })
        if(compromissosPendentes) {
            Object.keys(compromissosPendentes).map( key => { 
                objCompromissoPendentes = { 
                    compromissoUid: compromissosPendentes[key].compromissoUid,
                    nomeCompromisso: compromissosPendentes[key].nomeCompromisso,
                    tipoCompromisso: compromissosPendentes[key].tipoCompromisso,
                    descricao: compromissosPendentes[key].descricao,
                    local: compromissosPendentes[key].local,
                    data: compromissosPendentes[key].data,
                    hora: compromissosPendentes[key].hora,
                    participantes: compromissosPendentes[key].participantes,
                    criadoUid: compromissosPendentes[key].criadoUid,
                    nomeCriador:compromissosPendentes[key].nomeCriador,
                    sobrenomeCriador: compromissosPendentes[key].sobrenomeCriador
                }
                arrayCompromissosPendentes.push(objCompromissoPendentes)
                return true
            })  
        }
    })
    return arrayCompromissosPendentes
}

export { GetAddFriends, GetFriends, GetMeusCompromissos,GetCompromissosPendentes }