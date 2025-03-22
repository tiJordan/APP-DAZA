import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { videos_styles } from '../assets/css/Css_videos';

const Videos = () => {
    return (
        <View style={videos_styles.container}>
            <Text style={videos_styles.titulo}>Vídeos</Text>
            {/* Conteúdo da tela */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2D5A',
        marginBottom: 20
    }
});

export default Videos;