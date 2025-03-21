import React, { useEffect } from 'react';
import { Image, View, TouchableOpacity, Text } from "react-native";
import { css } from "../assets/css/Css";


export default function Home({ navigation }) {

    return (
        <View style={css.container}>

            <View style={css.header}>
                <Image style={css.header__img} source={require('../assets/img/background_home.png')} />
            </View>


            <View style={css.footer}>

                <TouchableOpacity
                    style={css.button}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={css.button__text}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}