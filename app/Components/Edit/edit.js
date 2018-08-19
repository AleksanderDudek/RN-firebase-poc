import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

import firebase from 'react-native-firebase';


class EditView extends Component {

   state = {}; 

    // constructor () {
    //     super(props);
    //     this.setState({
    //         key: this.props.navigation.state.params.key,
    //         name: this.props.navigation.state.params.name,
    //         surname: this.props.navigation.state.params.surname 
    //     })
    // }

    constructor() {
        super();
        this.ref = firebase.firestore().collection('test');
    }

   

    saveToFB = (data) => {

        console.log(data)
        this.ref.doc(data.key).update ({
            name: data.name,
            surname: data.surname
            }).then(() => {
                console.log("GREAT SUCCESS")
                this.props.navigation.navigate('Main');
              }).catch(err => {
                console.log('not so much ' + err);
              })
    }

    componentDidMount() {
        this.setState({
            key: this.props.navigation.state.params.key,
            name: this.props.navigation.state.params.name,
            surname: this.props.navigation.state.params.surname 
        })
    }

    render(){
        return (
            this.state ? 
                (
                    <View style={styles.container}>
                    <View style={styles.item}>
                        <TextInput 
                                    value={this.state.name}
                                    style={{alignItems:'center'}} 
                                   onChangeText={(data) => 
                                    { 
                                        console.log( data)
                                        this.setState({name:  data})
                                    }
                                }
                        />
                    </View>
                    <View style={styles.item}>
                        <TextInput 
                                    value={this.state.surname}
                                    style={{alignItems:'center'}}
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
            : null
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


export default EditView;