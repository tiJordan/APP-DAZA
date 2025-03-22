import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Cadastro from '../views/Cadastro';
import MainTabs from '../views/MainTabs'; // Importe as abas

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {/* Telas do Stack */}
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ headerShown: false }}
                />
                {/* Adicione a rota MainApp */}
                <Stack.Screen
                    name="MainApp"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;