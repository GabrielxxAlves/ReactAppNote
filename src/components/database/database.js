import firebaseApp from '../firebase'
import axios from 'axios'

const auth = firebaseApp.auth()
const database = firebaseApp.database()

const addFriend = async(friend) => {
    try {
        const uid = auth.currentUser.uid
        const user = JSON.parse(localStorage.getItem('user'))
        await database.ref('users/'+friend.uid+'/addFriends/'+uid).set({
            uid: uid,
            nome: user.nome,
            sobrenome: user.sobrenome 
        })  
        return true
    }
    catch(err){
        return err
    }
}

const approveFriend = (friend) => {
    const uid = auth.currentUser.uid
    const user = JSON.parse(localStorage.getItem('user'))
    database.ref('users/'+uid+'/friends/'+friend.uid).set({
        uid: friend.uid,
        nome: friend.nome,
        sobrenome: friend.sobrenome 
    }) 
    database.ref('users/'+friend.uid+'/friends/'+uid).set({
        uid: uid,
        nome: user.nome,
        sobrenome: user.sobrenome 
    })   
    removeFriend(friend.uid)
    return true
}

const removeFriend = (uidFriend) => {
    const uid = auth.currentUser.uid
    database.ref('users/'+uid+'/addFriends/'+uidFriend).remove()
}

const addCompromisso = async(newCompromisso) => {
    const uid = auth.currentUser.uid
    const user = JSON.parse(localStorage.getItem('user'))
    const participantes = await preparad(newCompromisso)
    setTimeout(function () {
        const gerarChave = database.ref().push().key

        const objCompromisso = {
            compromissoUid: gerarChave,
            criadoUid: uid,
            nomeCriador: user.nome,
            sobrenomeCriador: user.sobrenome,
            nomeCompromisso: newCompromisso.nomeCompromisso,
            tipoCompromisso: newCompromisso.tipoCompromisso,
            descricao: newCompromisso.descricao,
            local: newCompromisso.local,
            data: newCompromisso.data,
            hora: newCompromisso.hora,
            participantes: participantes
        }

        database.ref('users/'+uid+'/compromissos/'+gerarChave)
            .set(objCompromisso,(err) => {
                if(err) {
                console.log(err)

                } else {
                console.log('Compromisso criado')
                }
        })  
        
        participantes.map((i) => { 
           return Object.keys(i).map(key => {
                return database.ref('users/'+i[key].uid+'/pendCompromissos/'+gerarChave)
                .set(objCompromisso,(err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('Compromisso enviado para os participantes')
                    }
                }) 
            })
        })
        
    },3000)

}

async function searchFriends (uidFriend) {
    let url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${uidFriend}"`
    let objParticipante
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            objParticipante = { [uidFriend]: { uid: uidFriend, nome: get.data[key].nome, sobrenome: get.data[key].sobrenome, status: 'pentende' }}
            return true
        })
    })
    return objParticipante
}

async function preparad(newCompromisso) {
    let arrayObjFriends = []
    newCompromisso.amigos.map(async element => {
        const t = await searchFriends(element)
        arrayObjFriends.push(t)    
    })
    return arrayObjFriends
}

const aceitoOrRecusado = (objData) => {
    const uid = auth.currentUser.uid
    if(objData.status === 'aceito') {
        database.ref('users/'+uid+'/compromissos/'+objData.compromissoUid)
        .set({
            compromissoUid: objData.compromissoUid,
            criadoUid: objData.criadoUid,
            nomeCriador: objData.nomeCriador,
            nomeCompromisso: objData.nomeCompromisso,
            tipoCompromisso: objData.tipoCompromisso,
            descricao: objData.descricaoCompromisso,
            local: objData.localCompromisso,
            data: objData.dataCompromisso,
            hora: objData.horaCompromisso
        },(err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Compromisso aceito')
            }
        })  
        
    }
    updateParticipante(uid,objData)
    removeCompromissoPendente(uid,objData)
}

const updateParticipante = async(uid, obj) =>{

    let url = `https://app-appointment-1ff65.firebaseio.com/users.json?orderBy=%22uid%22&equalTo="${obj.criadoUid}"`
    let compromissos = undefined
    await axios.get(url)
    .then(get => {
        Object.keys(get.data).map( key => { 
            compromissos = get.data[key].compromissos
            return true
        })     
    })
    Object.keys(compromissos).map( key => {
        if(key === obj.compromissoUid) {
            const part = compromissos[key].participantes
            part.map((i,index) => {
                return Object.keys(i).map(k => {
                    if(k === uid) {
                        const value = {status: obj.status}
                        database.ref('users/'+obj.criadoUid+'/compromissos/'+obj.compromissoUid+'/participantes/'+index+'/'+uid)
                            .update(value,(err) => {
                                console.log(err)
                            })
                    }
                    return true
                })
            })
        }
        return true
    })  
}

const removeCompromissoPendente = (uid, obj) => {
    database.ref('users/'+uid+'/pendCompromissos/'+obj.compromissoUid).remove()
}

export { addFriend, approveFriend, removeFriend, addCompromisso ,aceitoOrRecusado}