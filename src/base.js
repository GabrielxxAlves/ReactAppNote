const config = {
    apiKey: "AIzaSyDe3A-VKB1Bfsxlre1M0TKrlDT89s761nk",
    authDomain: "app-appointment-1ff65.firebaseapp.com",
    databaseURL: "https://app-appointment-1ff65.firebaseio.com",
    projectId: "app-appointment-1ff65",
    storageBucket: "app-appointment-1ff65.appspot.com",
    messagingSenderId: "17248643620"
  };

  const Rebase = require('re-base')
  const firebase = require('firebase/app')
  require('firebase/database')

  const app = firebase.initializeApp(config)
  const base = Rebase.createClass(app.database())

  export default base