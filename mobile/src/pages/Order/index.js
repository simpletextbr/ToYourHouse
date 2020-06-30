import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image, FlatList, Animated} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'



import api from '../../services/api';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';


export default function Order() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');

    //controle do pedido
    const [preorder, setPreOrder] = useState([]);
    const [order] = useState([]);
    let j = 0;
    let oN = 0;

    //animação do carrinho
    const [carWidth] = useState(new Animated.Value(0));
    const [carHeigth] = useState(new Animated.Value(0));

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
        for(let i=0; i < products.length; i++){
            if(preorder[i].productid===product.id){
                order[j] = {
                orderNumber: oN++,
                productid: product.id,
                productname: product.name, 
                productvalue: product.price, 
                enterprise: enterprise.id, 
                productqtd: 1,
                productAdd:[]
                    }
                j++
                }
            }
        }


    async function closeShopping(){
        Animated.timing(
            carWidth,{
                toValue:0,
                duration: 100
            }
        ).start();

        Animated.timing(
            carHeigth,{
                toValue:0,
                duration: 400
            }
        ).start();
    }

    async function shopping(){
        Animated.timing(
            carWidth,{
                toValue:360,
                duration: 400
            }
        ).start();

        Animated.timing(
            carHeigth,{
                toValue:140,
                duration: 100
            }
        ).start();
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
            alert('não foi possivel encontrar essa empresa!')
        }
    }

    async function next() {
        if(order.length===0){
            alert('Você ainda não comprou nada, amigo!')
        }else{
            navigation.navigate('Adds', { order, enterprise });
        }
        
    }

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

    //Pre-order
    useEffect(() => {
        async function loadqtds() {
            const response = [products.length - 1]
            for (let i = 0; i < products.length; i++) {
                response[i] = await {
                    productid: products[i].id,
                    productname: products[i].name, 
                    productvalue: products[i].price, 
                    enterprise: enterprise.id, 
                    productqtd: 0,
                    productAdd:[]
                }
            }
            setPreOrder(response)
        }
        loadqtds();
    }, [products])


    return (
        <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
            <View style={styles.Header}>
                <Image style={styles.enterpriselogo} source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }} />
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
                                        <TouchableOpacity style={styles.input}  onPress={() => (Add(product))}>
                                            <Feather name="plus-circle" size={16} color={`${btColor}`} />
                                            <Text style={styles.adc}>Adicionar</Text>
                                        </TouchableOpacity>
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
             <View style={{alignItems: "center", justifyContent: "space-between", marginTop: 10}}>
                <Animated.View style={{
                    width:carWidth,
                    height:carHeigth,
                    backgroundColor: '#FFF',
                    borderRadius: 6
                }}>
                    <TouchableOpacity style={styles.close} onPress={closeShopping}><Feather name="x" size={20} color="#FFFFFF" style={{backgroundColor: '#FF0000', margin: 5, borderRadius: 50}} /></TouchableOpacity>
                    <FlatList 
                        data={order}
                        style={styles.shoppin}
                        keyExtractor={orders => String(orders.orderNumber)}
                        renderItem={({ item: orders }) => (
                            order.length<=0 ?
                            <View style={styles.noShopping}>
                                <Feather name="shopping-cart" size={60} color="#A5A5A566"/>
                                <Text>Você ainda não comprou nada, amigo!</Text>
                            </View> :
                            <View style={styles.roworders}>
                                <Text style={styles.qtdShopping}>{orders.productqtd}</Text>
                                <Text style={styles.nameShopping}>{orders.productname}</Text>
                                <Text style={styles.priceShopping}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orders.productvalue)}</Text>
                            </View>  
                        )}
                        />
                </Animated.View>
            </View>
            <View style={styles.rowbuttons} >
                <View style={styles.cardapio}>
                    <Text style={styles.textCardapio}>Cardapio</Text>
                    <TouchableOpacity style={[styles.cardapiobutton, { backgroundColor: `${btColor}` }]} onPress={() => (goCardapio(enterprise))}><MaterialCommunityIcons name="book-open-outline" size={72} color="#FFFFFF" /></TouchableOpacity>
                </View>
                 <TouchableOpacity style={[styles.shoppingCart, {backgroundColor: `${btColor}`}]} onPress={() => shopping()}><Feather name="shopping-cart" size={36} color="#FFFFFF" /></TouchableOpacity> 
                <TouchableOpacity style={[styles.nextbutton, { backgroundColor: `${btColor}` }]} onPress={() => next()}><MaterialCommunityIcons name="page-next-outline" size={36} color="#FFFFFF" /></TouchableOpacity>
            </View>
        </View>
    )

}

