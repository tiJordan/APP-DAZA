import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calendar_styles } from '../assets/css/Css_calendario';

const Calendario = () => {
    return (
        <View style={calendar_styles.container}>
            <Text style={calendar_styles.titulo}>Calendário</Text>
            {/* Conteúdo da tela */}
        </View>
    );
};

export default Calendario;