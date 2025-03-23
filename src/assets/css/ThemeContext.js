// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = {
    daza: {
        primary: '#000000',
        secondary: '#FFD700',
        background: '#1A1A1A',
        text: '#FFFFFF',
        zebra: '#2A2A2A',
        danger: '#DC3545',
        success: '#28A745'
    },
    claro: {
        primary: '#FFFFFF',
        secondary: '#1A2D5A',
        background: '#F8F9FA',
        text: '#000000',
        zebra: '#E9ECEF',
        danger: '#DC3545',
        success: '#28A745'
    }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDazaMode, setIsDazaMode] = useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setIsDazaMode(savedTheme === 'daza');
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newMode = !isDazaMode;
        setIsDazaMode(newMode);
        await AsyncStorage.setItem('theme', newMode ? 'daza' : 'claro');
    };

    const theme = isDazaMode ? themes.daza : themes.claro;
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDazaMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);