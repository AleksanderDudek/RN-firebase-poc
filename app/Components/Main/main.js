import React from 'react'
import { StyleSheet, Platform, ScrollView, Text, View, Button,
  ActivityIndicator,
  FlatList,
  Dimensions } from 'react-native'

import firebase from 'react-native-firebase'

import { NavigationActions } from 'react-navigation';

import { Notification, NotificationOpen } from 'react-native-firebase';

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
    state = { currentUser: null };

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

      //firestore what is a snapshot ??
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

      //android doesn't take it when app is in FG or BG
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;

        console.log("Forground / background trigerred by " + action + " |||| " + notification)

    });
    }

    //firestore
    componentWillUnmount() {
      this.unsubscribe();

      //notification - does it close Listener? because it looks weird
      this.notificationOpenedListener();

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
    addRandomPost = () => {
      this.ref.add({
        name: 'Added name',
        surname: 'Added surnamename',
        });
    }

    addItem = () => {
      this.props.navigation.navigate('Create');
    }

    deleteRandomPost = (key) => {
      this.ref.doc(key).delete().then(() => {
        console.log("GREAT SUCCESS")
      }).catch(err => {
        console.log('not so much ' + err);
      })
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

              <View style={styles.item}>
                <Button 
                    title='Some fun'
                    onPress={this.goPlaces}
                />
              </View>
              
              {/* //firestore */}
              <View style={styles.item}>
               <Button title="Add random" onPress={() => this.addRandomPost()} />
              </View>

              <View style={styles.item}>
               <Button title="Add item" onPress={() => this.addItem()} />
              </View>

              <View style={{flex: 9, width: '100%'}}>
                      <FlatList
                        containerStyle={{width: '100%'}}
                        data={this.state.tests}
                        contentContainerStyle={{marginVertical: 10, marginHorizontal: 5}}
                        renderItem={({ item }) => <Test test={item} del={this.deleteRandomPost}/>  }
                      />
              </View>

            </View>
              
            );
  }
}

//wat does ({post}) mean? what kind of argument is this?
const Test = ({test, del}) => {

  return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={styles.firstCol}>{test.name}</Text>
        <Text style={styles.secondCol}>{test.surname}</Text>
        <Button
            style={styles.thirdCol}
            onPress={() => del(test.key)}
            title="Delete"
            color="#841584"
          />
      </View>
  ); 
}

const styles = StyleSheet.create({
  firstCol: {
    width: '30%' 
  },
  secondCol: {
    width: '40%' 
  },
  thirdCol: {
    width: '30%' 
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