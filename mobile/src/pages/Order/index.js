import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'



import api from '../../services/api';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';
import { set } from 'react-native-reanimated';


export default function Order() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [userName, setUserName] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');

    //controle do pedido
    const [order, setOrder] = useState([]);

    const [qtd, setQtd] = useState([]);
    const qtd0 = 0;


    const navigation = useNavigation();
    const route = useRoute();

    const enterprise = route.params.enterprise;



    async function goCardapio(enterprise) {
        if (enterprise.cardapio === null) {
            alert('Oopss! Esta empresa ainda não possui um cardapio cadastrado.')
        } else {
            navigation.navigate('Cardapio', { enterprise })
        }
    }

    async function Add(product) {
        alert(`Produto ${product.name} no valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)} Adcionado ao carrinho.`)
        qtd.map(qtds => (
            qtds.productid === product.id ? qtds.productqtd += 1 : qtd0
        ))
    }

    async function Minus(product) {
        alert(`Você retirou 1 ${product.name} no valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)} do seu carrinho.`)
        qtd.map(qtds => (
            qtds.productid === product.id ? qtds.productqtd -= 1 : qtd0  
        ))
        
    }

    async function close() {
        navigation.navigate('Dashboard')
    }

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
            alert('não foi possivel encontrar essas empresa!')
        }
    }

    async function Order() {
       alert(`Seu carrinho atual é: ${qtd.map(qtds => (
            qtds.productqtd>0 ? qtd : null
       ))}`)

    }

    useEffect(() => {
        async function load() {
            setUserName(await AsyncStorage.getItem('userName'));
        }
        load();
    }, [enterprise.id])

    //dados 
    useEffect(() => {
        loaddata();
    }, [enterprise.id])

    // categorias
    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/category', {
                headers: {
                    Authorization: enterprise.id
                }
            })
            setCategories(response.data);
        }
        loadCategories();

    }, [enterprise.id])

    // produtos
    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products', {
                headers: {
                    Authorization: enterprise.id
                }
            })
            setProducts(response.data);
        }
        loadProducts();
    }, [enterprise.id])

    //Qtds
    useEffect(() => {
        async function loadqtds() {
            const response = [products.length - 1]
            for (let i = 0; i < products.length; i++) {
                response[i] = await { productid: products[i].id, enterprise: enterprise.id, productqtd: 0 }
            }
            setQtd(response)
        }
        loadqtds();
    }, [products])



    return (
        <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
            <View style={styles.Header}>
                <Image style={styles.enterpriselogo} source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.11:3333/file/logo/${enterprise.logo}` }} />
                <Text style={styles.enterprisename}>{enterprise.name}</Text>
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
                                            <TouchableOpacity style={styles.minus} onPress={() => (Minus(product))}><Feather name="minus-circle" size={16} color={`${btColor}`} /></TouchableOpacity>
                                            <TouchableOpacity style={styles.add}   onPress={() => (Add(product))}><Feather name="plus-circle" size={16} color={`${btColor}`} /></TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={styles.priceProduct}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</Text>
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        ))}
                    </View>
                )}

            />
            <View style={styles.rowbuttons} >
                <View style={styles.cardapio}>
                    <Text style={styles.textCardapio}>Cardapio</Text>
                    <TouchableOpacity style={[styles.cardapiobutton, { backgroundColor: `${btColor}` }]} onPress={() => (goCardapio(enterprise))}><MaterialCommunityIcons name="book-open-outline" size={72} color="#FFFFFF" /></TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.nextbutton, { backgroundColor: `${btColor}` }]} onPress={() => Order(qtd)}><MaterialCommunityIcons name="page-next-outline" size={36} color="#FFFFFF" /></TouchableOpacity>
            </View>
        </View>
    )

}

