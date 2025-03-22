import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { stats_styles } from '../assets/css/Css_estatisticas';

const Estatisticas = () => {
    return (
        <View style={stats_styles.container}>
            <Text style={stats_styles.titulo}>Estatísticas</Text>
            {/* Conteúdo da tela */}
        </View>
    );
};

export default Estatisticas;