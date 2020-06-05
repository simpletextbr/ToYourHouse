import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants';


import api from '../../services/api';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';


export default function Order() {
    const [enterprises, setEnterprises] = useState([]);
    const [categories, setCategories ] = useState([]);
    const [products, setProducts ] = useState([]);
    const [enterprise_id, setEnterprise_Id] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');


    const navigation = useNavigation();

async function close(){
    navigation.navigate('Dashboard')
}

useEffect(() => {
    async function loaddata() {
        setEnterprise_Id(await AsyncStorage.getItem('enterprise_id'));
        try {
            const response =  await api.get('/config/custom', {
                headers: {
                    Authorization: enterprise_id
                }
            })
             setBgColor(response.data[0].backgound_app);
             setBtColor(response.data[0].button_app);
        } catch (error) {}
    }
    loaddata();
}, [enterprise_id]);

//dados da empresa
useEffect(() => {
 async function loaedenterprise(){
    const response = await api.get('enterprise/list',{
        headers:{
            Authorization: enterprise_id
        }
    })
    setEnterprises(response.data);
}
    loaedenterprise();
},[enterprise_id])

// categorias
useEffect(() => {
 async function loadCategories(){
    const response = await api.get('/category', {
        headers:{
            Authorization: enterprise_id
        }
    })
    setCategories(response.data);
}
    loadCategories();

},[enterprise_id])

// produtos
useEffect(() => {
 async function loadProducts(){
   const response = await api.get('/products', {
        headers:{
            Authorization: enterprise_id
        }
    })
    setProducts(response.data);
}
    loadProducts();
},[enterprise_id])





    return (
        <View style={{flex:1, paddingTop: Constants.statusBarHeight + 10, backgroundColor: `${bgColor}`}}>
            {enterprises.map(enterprise => (
            <View style={styles.Header} key={enterprise.id} >
                <Image  style={styles.enterpriselogo} source={enterprise.logo===null ? NOLOGO : {uri: `http://192.168.1.14:3333/file/logo/${enterprise.logo}`}}/>
                <Text style={styles.enterprisename}>{enterprise.name}</Text>
                <TouchableOpacity style={styles.close} onPress={close}><Feather name="x" size={28} color="#000000" /></TouchableOpacity>
            </View>
            ))}
            <FlatList
                data={categories}
                style={styles.Main}
                showsVerticalScrollIndicator={false}
                keyExtractor={categorie => String(categorie.id)}
                renderItem={({item: categorie}) =>(
                    <View style={styles.categories}>
                        <Text style={styles.nameCat}>{categorie.name}</Text>
                        {products.map(product => (
                            <View style={styles.products} key={product.id}>
                                <Text style={styles.nameProduct}>{categorie.id===product.cat_id ? product.name : null}</Text>
                                <Text style={styles.IngProduct}>{categorie.id===product.cat_id ? product.Ing : null}</Text>
                                <TextInput 
                                    style={styles.qtd}
                                    placeholder="0"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    />
                                <Text style={styles.priceProduct}>{categorie.id===product.cat_id ? product.price : null}</Text>
                            </View>
                        ))}
                    </View>
                )}

             />
                
        </View>
    )

}



