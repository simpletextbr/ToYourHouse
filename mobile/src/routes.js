import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const Stack = createStackNavigator();

export default function Routes(){
return (

    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
    </NavigationContainer>    
    
    ) 
}




