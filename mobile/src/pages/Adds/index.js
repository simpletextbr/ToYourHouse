import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import api from '../../services/api';


export default function Adds(){
    const [bgColor, setBgColor] = useState('');
    const [btColor, setBtColor] = useState('');
    const [adds, setAdds] = useState([]);

    //animação do carrinho
    const [orderWidth] = useState(new Animated.Value(0));
    const [orderHeigth] = useState(new Animated.Value(0));

    const route = useRoute();
    const navigation = useNavigation();

    const order = route.params.order;
    const enterprise = route.params.enterprise;
    let j = 0
    let aN = 0
    let lasti = 0



    async function closeAnimations(){
        Animated.timing(
            orderWidth,{
                toValue:0,
                duration: 200
            }
        ).start();

        Animated.timing(
            orderHeigth,{
                toValue:0,
                duration: 100
            }
        ).start();
    } 

    async function seeOrder(){
        Animated.timing(
            orderWidth,{
                toValue: 380,
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
       for(let i = 0 ; i < order.length ; i++){
           if(order[i].orderNumber===add[1].orderNumber){
            console.log(i)
            console.log(lasti)
               if(lasti !== i){
                   j=0
               }
               if(!order[i].productAdd[j]){
                    console.log(i)
                    console.log(lasti)
                    lasti = i
                    order[i].productAdd[j]={
                        name:add[0].name,
                        price:add[0].price,
                        id: add[0].id,
                        AddNumber: aN++
                    }
                j++
                }
            }
        }
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
    },[enterprise.id]);

  return (
    <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
        <View style={styles.Header}>
            <Image style={styles.enterpriselogo} resizeMode="contain" source={enterprise.logo === null ? NOLOGO : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }} />
            <Text style={styles.enterprisename}>{enterprise.name}</Text>
            <TouchableOpacity style={styles.back} onPress={() => {navigation.goBack()}}><Feather name="arrow-left" size={28} color="#000000" /></TouchableOpacity>
        </View>
            <Text style={styles.title}>Adicionar Acréscimos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {order.map(order => (
                    <View key={order.orderNumber}>
                    <TouchableOpacity style={{alignItems: "center", marginBottom: 20}} onPress={() => seeOrder()}>
                    <Text style={styles.productName}>{order.productname}</Text>
                    <Text style={styles.detail}>Mais Detalhes</Text>
                    <Feather name="chevron-down" size={20} color="#000000"/>
                    </TouchableOpacity> 
                    <Animated.View style={{
                        width:orderWidth,
                        height:orderHeigth,
                        backgroundColor: '#FFF',
                        borderRadius: 6,
                        marginRight: 20,
                        marginLeft: 20
                        }}>
                    <TouchableOpacity style={styles.close} onPress={closeAnimations}><Feather name="x" size={20} color="#FFFFFF" style={{backgroundColor: '#FF0000', margin: 5, borderRadius: 50}} /></TouchableOpacity>
                            <Text style={styles.title2}>Acrescimos: </Text>
                            <FlatList 
                                data={order.productAdd}
                                keyExtractor={add => add===undefined ? null : String(add.AddNumber)}
                                renderItem={({item: add}) => (
                                    <Text  style={styles.adds}>{add!==undefined ? add.name : null}</Text>
                                )}
                            />                 
                    </Animated.View>
                <ScrollView style={styles.rowadds} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                    {adds.map(add => (
                        enterprise.id===add.enterprise_id ? 
                        <View key={add.id} style={styles.add}>
                            <Text style={styles.nameadds}>{add.name}</Text>
                                <TouchableOpacity style={styles.input} onPress={() => (Add([add, order]))}>
                                    <Feather name="plus-circle" size={16} color={`${btColor}`} />
                                     <Text style={styles.adc}>Adicionar</Text>
                                </TouchableOpacity>
                            <Text style={styles.priceadds}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(add.price)}</Text>
                        </View> : null ))}  
                    </View> 
                </ScrollView>
                </View>
                    ))}
                </ScrollView>
                <Animatable.Text animation="shake" duration={2000} iterationCount="infinite"  style={styles.dica}>Arraste para o lado para o proximo pedido <Feather name="arrow-right" size={10} color={`${btColor}`} /></Animatable.Text>
        <View style={styles.rowbuttons} >
            <TouchableOpacity style={[styles.nextbutton, { backgroundColor: `${btColor}` }]} onPress={() => next()}><MaterialCommunityIcons name="page-next-outline" size={36} color="#FFFFFF" /></TouchableOpacity>
        </View>
    </View>
  )
}

