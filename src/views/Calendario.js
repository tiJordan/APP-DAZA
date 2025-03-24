import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { calendar_styles, calendar_styles as styles } from '../assets/css/Css_calendario';

const Calendario = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [games, setGames] = useState({});
    const [currentGame, setCurrentGame] = useState({
        type: 'past',
        status: 'pending',
        adversario: '',
        estadio: '',
        horario: ''
    });
    const [editMode, setEditMode] = useState(false);
    // const [isFutureGame, setIsFutureGame] = useState(false);


    // Dados mockados
    const initialGames = {
        '2025-03-15': {
            type: 'past',
            status: 'win',
            adversario: 'Time A',
            estadio: 'Estádio Municipal',
            horario: '19:30',
            gols: [
                { jogador: 'Jogador 1', minuto: '23', assistencia: 'Jogador 2' },
                { jogador: 'Jogador 3', minuto: '67', assistencia: 'Jogador 4' }
            ],
            cartoes: [
                { jogador: 'Jogador 5', minuto: '45', tipo: 'amarelo' },
                { jogador: 'Jogador 6', minuto: '89', tipo: 'vermelho' }
            ]
        },
        '2025-03-10': {
            type: 'past',
            status: 'loss',
            adversario: 'Time A',
            estadio: 'Estádio Municipal',
            horario: '19:30',
            gols: [],
            cartoes: [
                { jogador: 'Jogador 5', minuto: '45', tipo: 'amarelo' },
                { jogador: 'Jogador 6', minuto: '89', tipo: 'vermelho' }
            ]
        },
        '2025-03-06': {
            type: 'past',
            status: 'draw',
            adversario: 'Time A',
            estadio: 'Estádio Municipal',
            horario: '19:30',
            gols: [
                { jogador: 'Jogador 1', minuto: '23', assistencia: 'Jogador 2' },
                { jogador: 'Jogador 3', minuto: '67', assistencia: 'Jogador 4' }
            ],
            cartoes: [
                { jogador: 'Jogador 5', minuto: '45', tipo: 'amarelo' },
                { jogador: 'Jogador 6', minuto: '89', tipo: 'vermelho' }
            ]
        },
        '2025-03-25': {
            type: 'future',
            status: 'scheduled',
            adversario: 'Time B',
            estadio: 'Arena Principal',
            horario: '16:00'
        }
    };

    const renderEvento = (icone, label, valor) => (
        <View style={styles.eventoContainer}>
            <Text style={styles.icone}>{icone}</Text>
            <Text style={styles.detalheTexto}>
                <Text style={styles.label}>{label}:</Text> {valor}
            </Text>
        </View>
    );

    useEffect(() => {
        setGames(initialGames);
    }, []);

    const getStatusColor = (date) => {
        const game = games[date];
        if (!game) return null;

        if (game.type === 'past') return styles.resultColors[game.status];
        if (game.type === 'future') return styles.resultColors.future;

        return '#CCCCCC';
    };

    const handleDatePress = (day) => {
        const today = new Date();
        const selectedDate = new Date(day.dateString);
        const isFuture = selectedDate > today;

        const existingGame = games[day.dateString] || {
            type: isFuture ? 'future' : 'past',
            status: isFuture ? 'scheduled' : 'pending',
            adversario: '',
            estadio: '',
            horario: '',
            gols: [],
            cartoes: []
        };

        setCurrentGame(existingGame);
        setSelectedDate(day.dateString);
        setEditMode(!games[day.dateString] && !isFuture);
        setModalVisible(true);
    };

    const handleSave = () => {
        if (!currentGame.adversario || !currentGame.horario) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
            return;
        }

        setGames(prev => ({
            ...prev,
            [selectedDate]: currentGame
        }));
        setModalVisible(false);
        setEditMode(false);
    };

    const renderDetails = () => (
        <ScrollView>

            {/* Informações básicas */}
            <View style={styles.detailsContainer}>
                {renderEvento('🆚', 'Adversário', currentGame.adversario)}
                {renderEvento('🏟', 'Estádio', currentGame.estadio)}
                {renderEvento('⏰', 'Horário', currentGame.horario)}
            </View>

            {/* Gols */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>⚽ Gols</Text>
                {currentGame.gols?.map((gol, index) => (
                    <View key={index} style={styles.eventoContainer}>
                        <Text style={styles.detalheTexto}>
                            {gol.jogador} ({gol.minuto}')
                            <Text style={styles.assistencia}> [🎯 {gol.assistencia}]</Text>
                        </Text>
                    </View>
                ))}
            </View>

            {/* Cartões */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>🟨🟥 Cartões</Text>
                {currentGame.cartoes?.map((cartao, index) => (
                    <View key={index} style={styles.eventoContainer}>
                        <Text style={styles.detalheTexto}>
                            {cartao.tipo === 'amarelo' ? '🟨' : '🟥'}
                            {cartao.jogador} ({cartao.minuto}')
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                {currentGame.type === 'past' && (
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => setEditMode(true)}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderGolForm = (index) => {
        if (!currentGame.gols?.[index]) return null;
        return (
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Jogador"
                    value={currentGame.gols[index].jogador || ''}
                    onChangeText={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], jogador: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Minuto"
                    value={currentGame.gols[index].minuto || ''}
                    onChangeText={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], minuto: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Assistência"
                    value={currentGame.gols[index].assistencia || ''}
                    onChangeText={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], assistencia: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                />
            </View>
        );
    };
    
    const renderEditForm = () => (
        <ScrollView>
            <View style={styles.detailsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adversário"
                    value={currentGame.adversario}
                    onChangeText={text => setCurrentGame(prev => ({ ...prev, adversario: text }))}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Estádio"
                    value={currentGame.estadio}
                    onChangeText={text => setCurrentGame(prev => ({ ...prev, estadio: text }))}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Horário"
                    value={currentGame.horario}
                    onChangeText={text => setCurrentGame(prev => ({ ...prev, horario: text }))}
                />

                {currentGame?.type === 'past' && (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={currentGame?.status}
                            onValueChange={value => setCurrentGame(prev => ({
                                ...prev,
                                status: value
                            }))}
                            style={styles.picker}
                            dropdownIconColor="#FFD700"
                        >
                            <Picker.Item label="Vitória" value="win" />
                            <Picker.Item label="Derrota" value="loss" />
                            <Picker.Item label="Empate" value="draw" />
                        </Picker>
                    </View>
                )}
            </View>

            {/* Seção de Gols */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>⚽ Gols</Text>
                {currentGame.gols?.map((_, index) => renderGolForm(index))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setCurrentGame(prev => ({
                        ...prev,
                        gols: [...prev.gols, { jogador: '', minuto: '', assistencia: '' }]
                    }))}
                >
                    <Text style={styles.buttonText}>+ Adicionar Gol</Text>
                </TouchableOpacity>
            </View>

            {/* Seção de Cartões (implementação similar) */}

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>🟨🟥 Cartões</Text>
                {currentGame.cartoes?.map((_, index) => renderGolForm(index))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setCurrentGame(prev => ({
                        ...prev,
                        cartoes: [...prev.cartoes, { jogador: '', minuto: '' }]
                    }))}
                >
                    <Text style={styles.buttonText}>+ Adicionar Cartão</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => setEditMode(false)}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                theme={styles.calendarTheme}
                markedDates={Object.keys(games).reduce((acc, date) => ({
                    ...acc,
                    [date]: {
                        selected: true,
                        selectedColor: getStatusColor(date),
                        dotColor: '#FFFFFF'
                    }
                }), {})}
                onDayPress={handleDatePress}
            />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    {editMode ? renderEditForm() : renderDetails()}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Calendario;