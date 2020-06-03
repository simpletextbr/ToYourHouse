import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, AsyncStorage} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';

import LogoHeader from '../../assets/LogoHeader.png';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';



export default function Dashboard() {
    const [enterprise, setEnterprise] = useState([]);
    
    
    const [userName, setUserSame] = useState('');
    const [useId, setUserId] = useState('');

    const navigation = useNavigation();


    async function go(){
        navigation.navigate('Order');
    }

    async function loadlist(){
        const response = await api.get('/mobile/list');

        setEnterprise(response.data);
    }

    //Enterprise List
    useEffect(() => {
        loadlist();
    }, [])
    //dados do usuario
    useEffect(() => {
        async function loaddata() {
            setUserSame(await AsyncStorage.getItem('userName'));
            setUserId(await AsyncStorage.getItem('userId'));
        }
        loaddata();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Image source={LogoHeader} />
                <Text style={styles.welcome}>Olá {userName}, Seja Bem-Vindo</Text>
            </View>

            <FlatList
                data={enterprise}
                style={styles.enterpriseList}
                showsVerticalScrollIndicator={false}
                keyExtractor={enterprises => String(enterprises.id)}
                renderItem={({item: enterprises}) => (
                    <View style={styles.enterprise}>
                        <View style={styles.row}>
                            <Image style={styles.enterpriselogo} source={enterprises.logo===null ? NOLOGO : {uri: `http://192.168.1.14:3333/file/logo/${enterprises.logo}`} } /> 
                            <View style={styles.dados} >
                                <Text style={styles.name}>{enterprises.name}</Text>
                                <Text style={styles.cityUf}>{enterprises.city}, {enterprises.uf}</Text>
                            </View>
                            <TouchableOpacity onPress={go}>
                                <View style={styles.contato}>
                                    <Text style={styles.Textphone}>Whatsapp</Text>
                                    <Text style={styles.phone}>{enterprises.phone}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}