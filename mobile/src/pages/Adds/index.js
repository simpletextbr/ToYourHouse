import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';


export default function Adds(){
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');
    const [adds, setAdds] = useState([]);

    //animação do carrinho
    const [carWidth] = useState(new Animated.Value(0));
    const [carHeigth] = useState(new Animated.Value(0));
    const [orderWidth] = useState(new Animated.Value(0));
    const [orderHeigth] = useState(new Animated.Value(0));

    const route = useRoute();
    const navigation = useNavigation();

    const order = route.params.order;
    const enterprise = route.params.enterprise;



    async function closeAnimations(){
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

        Animated.timing(
            orderWidth,{
                toValue:0,
                duration: 100
            }
        ).start();

        Animated.timing(
            orderHeigth,{
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
    async function seeOrder(){
        Animated.timing(
            orderWidth,{
                toValue:200,
                duration: 100
            }
        ).start();

        Animated.timing(
            orderHeigth,{
                toValue:100,
                duration: 400
            }
        ).start();
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

    async function Add(add){
        console.log(add)
    }

    async function next() {
        console.log(order)
            //navigation.navigate('Adds', { order, enterprise });  
    }


    //dados 
    useEffect(() => {
        loaddata();
    }, [enterprise.id])

    useEffect(() =>{
        async function loadAdds(){
            const response = await api.get('/adds',{
                headers:{
                    Authorization: enterprise.id
                }
            })
            setAdds(response.data)
        }
            loadAdds()
    },[enterprise.id])

  return (
    <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
        <View style={styles.Header}>
            <Image style={styles.enterpriselogo} source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }} />
            <Text style={styles.enterprisename}>{enterprise.name}</Text>
            <TouchableOpacity style={styles.back} onPress={() => {navigation.goBack()}}><Feather name="arrow-left" size={28} color="#000000" /></TouchableOpacity>
        </View>
            <Text style={styles.title}>Adicionar Acréscimos</Text>
            <FlatList
                data={order}
                style={styles.orders}
                keyExtractor={order => String(order.orderNumber)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item: order}) => (
                <View>
                    <TouchableOpacity style={{alignItems: "center", marginBottom: 20}} onPress={() => seeOrder()}>
                    <Text style={styles.productName}>Pedido {order.orderNumber}</Text>
                    <Feather name="chevron-down" size={20} color="#000000"/>
                    </TouchableOpacity>
                    <Animated.View style={{
                        width:orderWidth,
                        height:orderHeigth,
                        backgroundColor: '#FFF',
                        borderRadius: 6,
                        marginRight: 10,
                        marginLeft: 10
                        }}>
                            <TouchableOpacity style={styles.close} onPress={closeAnimations}><Feather name="x" size={20} color="#FFFFFF" style={{backgroundColor: '#FF0000', margin: 5, borderRadius: 50}} /></TouchableOpacity>
                        <Text style={styles.productName}>{order.productname}</Text>
                    </Animated.View>
                <ScrollView style={styles.rowadds} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                    {adds.map(add => (
                        enterprise.id===add.enterprise_id ? 
                        <View key={add.id} style={styles.add}>
                            <Text style={styles.nameadds}>{add.name}</Text>
                                <TouchableOpacity style={styles.input} onPress={() => (Add([add,order]))}>
                                    <Feather name="plus-circle" size={16} color={`${btColor}`} />
                                     <Text style={styles.adc}>Adicionar</Text>
                                </TouchableOpacity>
                            <Text style={styles.priceadds}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(add.price)}</Text>
                        </View> : null ))}  
                    </View> 
                </ScrollView>
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
                <TouchableOpacity style={styles.close} onPress={closeAnimations}><Feather name="x" size={20} color="#FFFFFF" style={{backgroundColor: '#FF0000', margin: 5, borderRadius: 50}} /></TouchableOpacity>
                <FlatList 
                    data={order}
                    style={styles.shoppin}
                    keyExtractor={orders => String(orders.orderNumber)}
                    renderItem={({ item: orders }) => (
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
                <Text style={styles.textCardapio}>Pedido Atual</Text>
                <TouchableOpacity style={[styles.shoppingCart, {backgroundColor: `${btColor}`}]} onPress={() => shopping()}><Feather name="shopping-cart" size={72} color="#FFFFFF" /></TouchableOpacity>
            </View> 
            <TouchableOpacity style={[styles.nextbutton, { backgroundColor: `${btColor}` }]} onPress={() => next()}><MaterialCommunityIcons name="page-next-outline" size={36} color="#FFFFFF" /></TouchableOpacity>
        </View>
    </View>
  )
}

