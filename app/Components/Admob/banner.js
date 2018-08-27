import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import firebase from 'react-native-firebase'

import inter from './intersitial.js';
import reward from './rewarded.js';

//admob contents
const Banner = firebase.admob.Banner;

const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('auta szczecin').addKeyword('');

class AdmobBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 20}}>
            Ad unit here
        </Text>
        <Banner
                    unitId={"ca-app-pub-5781827896809390/8199102571"}
                    size={"SMART_BANNER"}
                    onAdLoaded={() => {
                      console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(err) => {
                      console.log('Advert failed to load');
                      console.log(err)
                    }}
        />


        <Text style={{textAlign: 'center', fontSize: 20}}>
            Intersitial unit here (onPress)
        </Text>
        <Button 
        title="Inter"
        onPress={()=>{
            inter();
        }}
        />

        <Text style={{textAlign: 'center', fontSize: 20}}>
            Rewarded unit here (onPress)
        </Text>
        <Button 
        title="Reward"
        onPress={()=>{
            reward();
        }}
        />


      </View>
    );
  }
}

export default AdmobBanner;
