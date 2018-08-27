import firebase from 'react-native-firebase';

import React from 'react';
import { View } from 'react-native';

const Rewarded = () => {

    const advert = firebase.admob().rewarded('ca-app-pub-5781827896809390/1990837707');

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('');

    // Load the advert with our AdRequest
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
    console.log('Advert ready to show.');
    advert.show();
    });

    advert.on('onAdFailedToLoad', (err) => {
        console.log(err);
    })

    advert.on('onRewarded', (event) => {
    console.log('The user watched the entire video and will now be rewarded!', event);
    });


}

export default Rewarded;

