import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './app/Components/Util/loading.js'
import SignUp from './app/Components/Login/signup.js'
import Login from './app/Components/Login/login.js'
import Main from './app/Components/Main/main.js'
// create our app's navigation stack
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App