import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';
import api from '../../services/api';

export default function orderFinal() {
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');

    //addres infos
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [reference, setReference] = useState('');

    let j = 0

    const route = useRoute();
    const navigation = useNavigation();

    const order = route.params.order;
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
        <View style={[styles[0].container, { backgroundColor: `${bgColor}` }]}>
            <View style={styles[0].Header}>
                <Image style={styles[0].enterpriselogo} resizeMode="contain" source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }} />
                <Text style={styles[0].enterprisename}>{enterprise.name}</Text>
                <TouchableOpacity style={styles[0].back} onPress={() => { navigation.goBack() }}><Feather name="arrow-left" size={28} color="#000000" /></TouchableOpacity>
            </View>
            <View style={styles[0].DeliveryInfo}>
                <Text style={styles[0].TitleDelivery}>Endereço de Entrega</Text>
                <View style={styles[0].rowAddressandNumber}>
                    <TextInput
                        style={styles[0].inputadderss}
                        placeholder="Rua"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={true}
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />
                    <TextInput
                        style={styles[0].inputadderssNumber}
                        placeholder="N°"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={addressNumber}
                        onChangeText={text => setAddressNumber(text)}
                    />
                </View>
                <View style={styles[0].neighborhoodReference}>
                    <TextInput
                        style={styles[0].inputneighborhood}
                        placeholder="Seu Bairro"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        value={neighborhood}
                        onChangeText={text => setNeighborhood(text)}
                    />
                    <TextInput
                        style={styles[0].inputreference}
                        placeholder="Ponto de Referencia"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        value={reference}
                        onChangeText={text => setReference(text)}
                    />
                </View>
            </View>
            <View style={styles[0].paymentmethod}>
                <Text style={styles[0].TitlePayment}>Forma De Pagamento</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione uma forma de pagamento',
                        value: null,
                        color: 'red'
                    }}
                    style={styles[1]}
                    Icon={() => {
                        return <MaterialCommunityIcons name="menu-down" size={40} color="#000000" />
                    }}
                    onValueChange={(j) => console.log(j)}
                    items={[
                        { label: 'Dinheiro', value: 'dinheiro', color: "black" },
                        { label: 'Cartão de Debito', value: 'Cartão de Debito', color: "black" },
                        { label: 'Cartão de Credito', value: 'Cartão de Credito', color: "black" },
                    ]}
                />
            </View>
            <View style={styles[0].FinalValue}>
                <Text style={styles[0].TitleFinalValue}>Valor Total Do Pedido</Text>
                <Text style={styles[0].value}>R$52,00</Text>
                <TouchableOpacity style={[styles[0].pedirBtn, {backgroundColor: `${btColor}`}]}>
                    <Text style={styles[0].pedirTitle}>PEDIR</Text>
                    <MaterialCommunityIcons style={{marginRight: 10}} name="cart-arrow-down" size={40} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            
        </View>
    )

}