import React, { useEffect, useState } from 'react';
import { View, Image, AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


import Logo from '../../../assets/Logo.png'
import styles from './styles';

export default function Welcome() {

    const [name, setName] = useState('');

    const navigation = useNavigation();


    async function go() {
        await AsyncStorage.setItem('userName', name)
        navigation.navigate('Dashboard');
    }
    useEffect(() => {
        async function loadName() {
            setName(await AsyncStorage.getItem('userName'));

        }
        loadName();
    }, [])


    return (
        <View style={styles.container}>
            <Image style={styles.logowelcome} source={Logo} />
            <Text style={styles.welcome}>Bem-Vindo(a) de volta,</Text>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity style={styles.btn} onPress={go} ><Text style={styles.textbtn}>CONTINUAR</Text></TouchableOpacity>
        </View>
    )
}