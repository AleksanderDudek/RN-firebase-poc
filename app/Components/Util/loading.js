import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';

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

      if(data)
      {console.log("Opened with notification "+ action + " ||| " + notification.data)
      console.log("Opened data: " + data)}

        }
      });

      //both notifications here are triggered when i send them, 
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {

      console.log("NOTIF123: " + notification.body)

      this.setState({
        someNotif: notification.body
      })
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        console.log("NOTIF1231: " + notification.body)

        this.setState({
          someNotif1: notification.body
        })
    });

    //this does not work (perhaps the data type contains notification?)
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required\
        console.log("MESSAGE: " + message.body)
        this.setState({
          message: message.body
        })
    });


        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
      }

  componentWillUnmount() {
    this.unsubscribe();

      //notification - does it close Listener? because it looks weird
      this.notificationOpenedListener();
      this.notificationDisplayedListener();
      this.initNotify();
      //unsubscribe
    //  this.topic();

      this.messageListener();
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