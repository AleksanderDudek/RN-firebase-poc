import React, { Component } from 'react';
import { View, Text } from 'react-native';

import firebase from 'react-native-firebase'

//admob contents
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('');


class AdmobBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>
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
      </View>
    );
  }
}

export default AdmobBanner;
