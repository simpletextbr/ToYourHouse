import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Login/Welcome';
import Order from './pages/Order';




const Stack = createStackNavigator();


export default function Routes() {

    const[autho, setAutho] = useState(''); 

    useEffect(() => {
        async function loadName() {
            setAutho(await AsyncStorage.getItem('userName'));

        }
        loadName();
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!autho ?
                    <Stack.Screen name="Singin" component={Login} /> :
                    <Stack.Screen name="welcome" component={Welcome} />}
                <Stack.Screen name="Login" component={Login} /> 
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Order" component={Order} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}




