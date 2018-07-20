import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'

import firebase from 'react-native-firebase'

export default class Main extends React.Component {
  
    state = { currentUser: null };

    goPlaces = () => {
        console.log('inside')
        this.props.navigation.navigate('SignUp');
    }

    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
  }
render() {
    const { currentUser } = this.state
return (
    <View  style={styles.container}>
        <View style={styles.item}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
      </View>

       <View style={styles.item}>
        <Button 
            title='Some fun'
            onPress={this.goPlaces}
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
  item:{
      marginBottom: 10,
      backgroundColor: '#F33222'
  }
})