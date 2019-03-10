import firebaseApp from './firebase'
const auth = firebaseApp.auth()
const database = firebaseApp.database()

const isAuth = async(email,senha) => {
    try {
        await auth.signInWithEmailAndPassword(email,senha)
        return true
    }
    catch(error) {
        // error
        return false
    }
}

const signOut = () => {
    auth.signOut()
}

const onAuthStateChanged = () => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
             console.log('usuario', user)       
          // ...
        } else {
          console.log('Login nao conectado')
        }
      });
}

const isVerifyUser = () => {
    if(localStorage.getItem('user')) {
        return true
    }
    return false
}

const createUser = async(nome, sobrenome ,email,senha) => {
    try {
        
        await auth.createUserWithEmailAndPassword(email, senha)
        const uid = auth.currentUser.uid
        await database.ref('users/'+ uid).set({
            uid: uid,
            nome: nome,
            sobrenome: sobrenome,
            email: email
        })
        return true
    }
    catch(error) {
        return error
    }
}

const uidUsers = () => {
    return auth.currentUser.uid
}

const readDatabase = async(uid) => {
    return await database.ref('/users/' + uid).once('value')
}


export {isAuth, isVerifyUser, signOut, onAuthStateChanged,createUser, uidUsers, readDatabase, auth}