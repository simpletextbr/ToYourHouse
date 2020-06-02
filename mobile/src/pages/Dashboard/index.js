import React from 'react';
import { View, Image, Text } from 'react-native';

import LogoHeader from '../../assets/LogoHeader.png';
import styles from './styles';


export default function Dashboard(){
    return(
        <View style={styles.container}>
                <Image source={LogoHeader} />
        

                <Text style={{fontSize: 30, color: '#000000'}}>Dashboard</Text>


        </View>
    )
}