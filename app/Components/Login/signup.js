import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import firebase from 'react-native-firebase';


import { GoogleSignin, GoogleSigninButton, statusCodes  } from 'react-native-google-signin';


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



    handleGoogleSignUp = () => {
      // Somewhere in your code
        signIn = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
          } catch (error) {
            console.log('Some error in Google signing')
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
      };
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

        <View>
          <GoogleSigninButton
            style={{ width: 48, height: 48 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.handleGoogleSignUp}
          />
        </View>

        {/* division line, love this simplicity :)*/}
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            width: '50%',
            alignSelf: 'center',
            marginBottom: 10,
            marginTop: 10
          }}
        />

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