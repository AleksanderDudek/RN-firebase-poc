import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';

class StorageView extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        imgPath: ''
    };
  }


  saveToStorage = (state) => {

    firebase
    .storage()
    .ref('/upload'+state.imgPath+'.jpeg')
    .putFile(
      `${firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/${state.imgPath}`
    )
    .then( (info) => {
        console.log(info)
    })
    .catch( (info) => {
        console.log(info)
    });
  }

  render(){
    return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={{alignItems:'center', fontSize: 30}}>
                Storage
            </Text>
        </View>
        <View style={styles.item}>
            <TextInput style={{alignItems:'center'}} 
                       onChangeText={(data) => 
                        { 
                            console.log( data)
                            this.setState({imgPath:  data})
                        }
                    }
            />
        </View>
        
        <View style={styles.item}>
            <Button style={{alignItems:'center'}}
                    title="Save"
                    onPress={() => this.saveToStorage(this.state)}
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

export default StorageView;
