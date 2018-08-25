import React from 'react'
import { StyleSheet, Platform, ScrollView, Text, View, Button,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert } from 'react-native'

import firebase from 'react-native-firebase'

import { NavigationActions } from 'react-navigation';

import { Notification, NotificationOpen } from 'react-native-firebase';

import WebView from '../Web/webview.js';
//firestore example 

const { width, height } = Dimensions.get('window');




export default class Main extends React.Component<{}> {
  
    //pasek opcji
    //dodatkowo android wymaga zeby zresetowac stack, aby 
    //na backbutton nie wracal do poprzedniego widoku
    static navigationOptions = {
      title: 'MAIN',
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }

   

    //a co z this??
    state = { 
      currentUser: null,
      someNotif: '',
      someNotif1: '',
      registrationToken: ''
    };

    //firestore
    constructor() {
      super();
      this.ref = firebase.firestore().collection('test');
      this.unsubscribe = null;
      this.state = {
        tests: [],
        loading: true,
      };

      
    }
    //firestore

    goPlaces = () => {
        console.log('inside')
        this.props.navigation.navigate('SignUp');
    }

    componentDidMount(){
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      this.setState({
          registrationToken: firebase.messaging().getToken()
      })
      //firestore what is a snapshot ??
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

      // this.topic = firebase.messaging().subscribeToTopic("'*'");

      //android doesn't take it when app is in FG or BG
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;

        console.log("Forground / background trigerred by " + action + " |||| " + notification)


    });

    //this triggers from CLOSED/BACKGROUND
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
          console.log(message)
          console.log("MESSAGE: " + message.body)
          this.setState({
            message: message.body
          })
      });
  



    }

    //firestore
    componentWillUnmount() {
      this.unsubscribe();

      //notification - does it close Listener? because it looks weird
      this.notificationOpenedListener();
      this.notificationDisplayedListener();
      //unsubscribe
    //  this.topic();

      this.messageListener();
    }


    //firestore
    onCollectionUpdate = (querySnapshot) => {
      const tests = [];
      querySnapshot.forEach((doc) => {
        const { name, surname } = doc.data();
        tests.push({
          key: doc.id, // Document ID
          doc, // DocumentSnapshot
          name,
          surname
        });
      });
      this.setState({
        tests,
        loading: false,
     });
    }

    //firestore button to add data to snapshot
    addRandomPost = (state) => {
      this.ref.add({
        name: 'Added name',
        surname: 'Added surnamename',
        registrationToken: state.registrationToken._55
        });
    }

    addItem = () => {
      this.props.navigation.navigate('Create', {key: this.state.registrationToken._55});
    }

    deleteRandomPost = (key) => {

      Alert.alert(

        // This is Alert Dialog Title
        'Alert Dialog Title',
    
        // This is Alert Dialog Message. 
        'Alert Dialog Message',
        [
          // First Text Button in Alert Dialog.
          {text: 'Delete', onPress: () => 
              this.ref.doc(key).delete().then(() => {
                console.log("GREAT SUCCESS")
              }).catch(err => {
                console.log('not so much ' + err);
              })
          },
    
          // Second Cancel Button in Alert Dialog.
          {text: 'No, cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
    
          // Third OK Button in Alert Dialog          
        ]

      )

      
    }   

    editPost = (item) => {

      //dodając item powoduje, że w navigation.state.params przyjmują one tę wartość obiektu
      this.props.navigation.navigate('Edit', item);
    }

  render(){

    //firestore
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    //to destrukturyzacja obiektu (stanu), wyciaga currentUser'a
    const { currentUser } = this.state;
        return (
            <View style={styles.container}>
              
              <View style={styles.item}>
                <Text style={{flex:1}}>
                  Hi {currentUser && currentUser.email}!
                </Text>
              </View>

              {/* <View style={styles.item}>
                <Button 
                    title='Some fun'
                    onPress={this.goPlaces}
                />
              </View> */}
              
              {/* //firestore */}
              
              <View style={styles.item}>
               <Button title="Admob" onPress={() => this.props.navigation.navigate('Banner')} />
              </View>

              <View style={styles.item}>
               <Button title="Storage" onPress={() => this.props.navigation.navigate('Storage')} />
              </View>

              <View style={styles.item}>
               <Button title="Add random" onPress={() => this.addRandomPost(this.state)} />
              </View>

              <View style={styles.item}>
               <Button title="Add item" onPress={() => this.addItem()} />
              </View>

              <View style={{flex: 9, width: '100%'}}>
                      <FlatList
                        containerStyle={{width: '100%'}}
                        data={this.state.tests}
                        contentContainerStyle={{marginVertical: 10, marginHorizontal: 5}}
                        renderItem={({ item }) => <Test test={item} del={this.deleteRandomPost} edit={this.editPost}/>  }
                      />
              </View>

              <View style={{flex: 3, width: '100%'}}>
                  <WebView></WebView>
              </View>
            </View>
              
            );
  }
}

//wat does ({post}) mean? what kind of argument is this?
const Test = ({test, del, edit}) => {

  return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
        <Text style={styles.firstCol}>{test.name}</Text>
        <Text style={styles.secondCol}>{test.surname}</Text>
        <Button
            style={styles.thirdCol}
            onPress={() => del(test.key)}
            title="Delete"
            color="#841584"
          />
        <Button
            style={styles.fourthCol}
            onPress={() => edit(test)}
            title="Edit"
            color="#041584"
          />
      </View>
  ); 
}

const styles = StyleSheet.create({
  firstCol: {
    width: '30%' 
  },
  secondCol: {
    width: '30%' 
  },
  thirdCol: {
    width: '20%' 
  },
  fourthCol: {
    width: '20%' 
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item:{
      marginBottom: 10,
      marginTop: 10,
      flex: 1
      // backgroundColor: '#F33222'
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  title: {
    flex: 4,
  },
  likesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    width,
    height: Platform.OS === 'ios' ? 70 : 50,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  }
})