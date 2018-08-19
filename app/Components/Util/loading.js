import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { Notification, NotificationOpen } from 'react-native-firebase';


export default class Loading extends React.Component {


  static navigationOptions = {
    header: null
  }

    componentDidMount() {

      //because loading is entry point for application I decided to do notification
      //check up here - it works :)
      firebase.notifications().getInitialNotification()
      .then((notificationOpen : NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification : Notification = notificationOpen.notification;  
          const data = notificationOpen.data;

          console.log("Opened with notification "+ action + " ||| " + notification.data)
          console.log("Opened data: " + data)

        }
      });

        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
      }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})