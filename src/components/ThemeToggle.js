// ThemeToggle.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../assets/css/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme, isDazaMode } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.secondary }]}
            onPress={toggleTheme}
        >
            <Text style={[styles.text, { color: theme.primary }]}>
                {isDazaMode ? 'Modo Claro' : 'Modo DAZA'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 20,
        margin: 10
    },
    text: {
        fontWeight: 'bold'
    }
});

export default ThemeToggle;