import React from 'react';
import { Text, View } from 'react-native';

import firebase from 'react-native-firebase'




const IntersitialV = () => {

    const advert = firebase.admob().interstitial('ca-app-pub-5781827896809390/3239915165');

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('auta szczecin');

    // Load the advert with our AdRequest
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
    console.log('Advert ready to show.');
    });

    // Simulate the interstitial being shown "sometime" later during the apps lifecycle
    setTimeout(() => {
    if (advert.isLoaded()) {
        advert.show();
    } else {
        // Unable to show interstitial - not loaded yet.
    }
    }, 1000);
}

export default IntersitialV;
