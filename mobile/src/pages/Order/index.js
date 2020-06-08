import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'



import api from '../../services/api';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';


export default function Order() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');


    const navigation = useNavigation();
    const route = useRoute();

    const enterprises = route.params.enterprises


    async function close() {
        navigation.navigate('Dashboard')
    }

    async function loaddata() {
        try {
            const response = await api.get('/config/custom', {
                headers: {
                    Authorization: enterprises.id
                }
            })
            setBgColor(response.data[0].backgound_app);
            setBtColor(response.data[0].button_app);
        } catch (error) {
            alert('não foi possivel encontrar essas empresa!')
        }
    }

    //dados da empresa
    useEffect(() => {
        loaddata();
    }, [enterprises.id])

    // categorias
    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/category', {
                headers: {
                    Authorization: enterprises.id
                }
            })
            setCategories(response.data);
        }
        loadCategories();

    }, [enterprises.id])

    // produtos
    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products', {
                headers: {
                    Authorization: enterprises.id
                }
            })
            setProducts(response.data);
        }
        loadProducts();
    }, [enterprises.id])





    return (
        <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
            <View style={styles.Header}>
                <Image style={styles.enterpriselogo} source={enterprises.logo === null ? NOLOGO : { uri: `http://192.168.1.14:3333/file/logo/${enterprises.logo}` }} />
                <Text style={styles.enterprisename}>{enterprises.name}</Text>
                <TouchableOpacity style={styles.close} onPress={close}><Feather name="x" size={28} color="#000000" /></TouchableOpacity>
            </View>
            <FlatList
                data={categories}
                style={styles.Main}
                showsVerticalScrollIndicator={false}
                keyExtractor={categorie => String(categorie.id)}
                renderItem={({ item: categorie }) => (
                    <View style={styles.categories}>
                        <Text style={styles.nameCat}>{categorie.name}</Text>
                        {products.map(product => (
                            <View style={styles.listProducts} key={product.id}>
                                {product.cat_id === categorie.id ?
                                    <View style={styles.products}>
                                        <View>
                                        <Text style={styles.nameProduct}>{product.name}</Text>
                                        <Text style={styles.IngProduct}>{product.Ing}</Text>
                                        </View>
                                        <View style={styles.input}>
                                        <TouchableOpacity><Feather name="minus-circle" size={16} color={btColor} /></TouchableOpacity>
                                        <TextInput
                                            style={styles.qtd}
                                            placeholder="0"
                                            placeholderTextColor="#999"
                                            keyboardType="number-pad"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity><Feather name="plus-circle" size={16} color={btColor} /></TouchableOpacity>
                                        </View>
                                        <View>
                                        <Text style={styles.priceProduct}>{   Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(product.price)}</Text>
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        ))}
                    </View>
                )}

            />

        </View>
    )

}



