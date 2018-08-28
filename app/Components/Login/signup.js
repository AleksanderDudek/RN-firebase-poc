import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase';




export default class SignUp extends React.Component {


    static navigationOptions = {
      header: null
    }

    state = { email: '', password: '', errorMessage: null }

    constructor(){
        super()
        GoogleSignin.configure({
          iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
        });
    }

    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))

    }



   

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.signItem}
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />

        {/* division line, love this simplicity :)*/}
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            width: '75%',
            alignSelf: 'center',
            marginBottom: 10,
            marginTop: 10
          }}
        />

        {/* google sign */}

       

        <View style={{marginTop: 10,}}>
            <Button
              title="Already have an account? Login"
              onPress={() => this.props.navigation.navigate('Login')}
            />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signItem: {
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})