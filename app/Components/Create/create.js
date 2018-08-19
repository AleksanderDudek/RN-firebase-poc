import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import firebase from 'react-native-firebase';

class CreateView extends Component {

    static navigationOptions = {
        header: null
      }

    state = {
        name: '',
        surname: ''
    }

    constructor() {
        super();
        this.ref = firebase.firestore().collection('test');
    }

   

    saveToFB = (data) => {

        console.log(data)
        this.ref.add({
            name: data.name,
            surname: data.surname
            }).then(() => {
                console.log("GREAT SUCCESS")
                this.props.navigation.navigate('Main');
              }).catch(err => {
                console.log('not so much ' + err);
              })
    }

    render(){
            return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <TextInput style={{alignItems:'center'}} 
                               onChangeText={(data) => 
                                { 
                                    console.log( data)
                                    this.setState({name:  data})
                                }
                            }
                    />
                </View>
                <View style={styles.item}>
                    <TextInput style={{alignItems:'center'}}
                               onChangeText={(data) => 
                                { 
                                    console.log( data)
                                    this.setState({surname: data})
                                }
                            }
                    />
                </View>
                <View style={styles.item}>
                    <Button style={{alignItems:'center'}}
                            title="Save"
                            onPress={() => this.saveToFB(this.state)}
                    />
                </View>
            </View>
            )
    }

} 

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item:{
      marginBottom: 10,
      marginTop: 10,
      flex: 1,
      width: '50%',
      // backgroundColor: '#F33222'
  }
})

export default CreateView;