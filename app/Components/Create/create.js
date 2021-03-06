import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import firebase from 'react-native-firebase';

class CreateView extends Component {

    static navigationOptions = {
        header: null
      }

    state = {
        name: '',
        surname: '',
        registrationToken: ''
    }

    constructor() {
        super();
        this.ref = firebase.firestore().collection('test');
        
        
        // this.setState({ registrationToken: this.props.registrationToken})
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params.key)
        this.setState({
            registrationToken: this.props.navigation.state.params.key
        })
    }
    saveToFB = (data) => {
        console.log(this.props.navigation.state.params.key)
        console.log(data)
        this.ref.add({
            name: data.name,
            surname: data.surname,
            registrationToken: data.registrationToken
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

//flex tworzy layout pochlaniajacy calosc dostepnej przestrzeni (chyba ze jest dzieckiem jakeigos innego elmentu,
// to wtedy pochlania 100% pozostalej przestrzeni; kazde dziecko oznaczone flex: y pochlania y/y+x przestrzeni 
// czyli np. jesli suma wartosci pozstalych elemnentow flex wynosi 10, a nowy flex: 5 to wtedy 5/15 zajmuje 1/3 calego
// dostepego miejsca w danym kontenerze )

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  item:{
      marginBottom: 10,
      marginTop: 10,
    //   flex: 1,
      width: '50%',
      // backgroundColor: '#F33222'
  }
})

export default CreateView;