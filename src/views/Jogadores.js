import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { player_styles } from '../assets/css/Css_jogadores';

const Jogadores = () => {
    return (
        <View style={player_styles.container}>
            <Text style={player_styles.titulo}>Jogadores</Text>
            {/* Conteúdo da tela */}
        </View>
    );
};

export default Jogadores;