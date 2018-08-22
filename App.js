import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
// import the different screens
import Loading from './app/Components/Util/loading.js'
import SignUp from './app/Components/Login/signup.js'
import Login from './app/Components/Login/login.js'
import Main from './app/Components/Main/main.js'
import Create from './app/Components/Create/create.js'
import Edit from './app/Components/Edit/edit.js'

// create our app's navigation stack
const App = StackNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login:Login,
    Main: Main,
    Create: Create,
    Edit: Edit
  },
  {
    initialRouteName: 'Loading'
  }
)

const Drawer = DrawerNavigator({
  Stack: App,
  SignUp: SignUp,
  Main: Main
})

export default Drawer;