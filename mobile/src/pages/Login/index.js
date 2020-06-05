import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, AsyncStorage, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import Logo from '../../assets/Logo.png'
import styles from './styles';

export default function Login() {
    const [name, setName] = useState('');

    const navigation = useNavigation();

    async function createUser() {
        const data = {
            name
        }
            const response = await api.post('/mobile', data);
            
            if(response.data.send==="Opa! Parece que esse nome ja esta em uso!, por favor tente outro"){
                alert('Opa! Parece que esse nome ja esta em uso!, por favor tente outro');
            }else if(response.data.send==="Você precisa digitar o seu nome para entar"){
                alert('Você precisa digitar o seu nome para entar')
            }else{
             await AsyncStorage.setItem('userName', response.data.name);
             await AsyncStorage.setItem('userId', response.data.id[0].toString());
             navigation.navigate('Dashboard');
            }
        }

return (

    <KeyboardAvoidingView style={styles.container} enabled={Platform.OS === 'ios'} behavior='padding'>
        <View style={styles.logoLogin}>
            <Image source={Logo} />
        </View>
        <Text style={styles.p}>Para iniciar diga-nos qual é o seu nome</Text>
        <TextInput
            style={styles.input}
            placeholder="Alô, Quem esta ai?"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onChangeText={text => setName(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={createUser}><Text style={styles.btnText}>ENTRAR</Text></TouchableOpacity>
    </KeyboardAvoidingView>
)
}