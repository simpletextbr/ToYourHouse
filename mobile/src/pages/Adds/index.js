import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';


export default function Adds(){
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    const orders = route.params.order;
    const enterprise = route.params.enterprise;

    async function loaddata() {
        try {
            const response = await api.get('/config/custom', {
                headers: {
                    Authorization: enterprise.id
                }
            })
            setBgColor(response.data[0].backgound_app);
            setBtColor(response.data[0].button_app);
        } catch (error) {
            alert('não foi possivel encontrar essa empresa!')
        }
    }


    //dados 
    useEffect(() => {
        loaddata();
    }, [enterprise.id])


  return (
    <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
        <View style={styles.Header}>
            <Image style={styles.enterpriselogo} source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }} />
            <Text style={styles.enterprisename}>{enterprise.name}</Text>
            <TouchableOpacity style={styles.back} onPress={() => {navigation.goBack()}}><Feather name="arrow-left" size={28} color="#000000" /></TouchableOpacity>
        </View>
            <Text style={styles.title}>Adicionar Acréscimos</Text>
            <FlatList
                data={orders}
                style={styles.orders}
                keyExtractor={order => String(order.orderNumber)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item: order}) => (
                    <Text style={styles.productName}>{order.productname}</Text>
                )}
            />
    </View>
  )
}

