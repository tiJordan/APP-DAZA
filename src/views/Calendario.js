import React, { useState, useEffect } from 'react';
import {
    View, Text, Modal, TouchableOpacity,
    TextInput, ScrollView, SafeAreaView, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { calendar_styles, calendar_styles as styles } from '../assets/css/Css_calendario';
import axios from 'axios';

const Calendario = () => {
    const [games, setGames] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [jogadores, setJogadores] = useState([]);
    const [currentGame, setCurrentGame] = useState({
        adversario: '',
        estadio: '',
        horario: '',
        gols: [],
        cartoes: []
    });
    const [editMode, setEditMode] = useState(false);
    // const [isFutureGame, setIsFutureGame] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/api/jogos');
                if (response.data.length === 0) {
                    Alert.alert('Aviso', 'Nenhum jogo cadastrado ainda!')
                }
                const formattedGames = response.data.reduce((acc, game) => ({
                    ...acc,
                    [game.data]: {
                        selected: true,
                        selectedColor: getStatusColor(game.resultado),
                        dotColor: '#FFF'
                    }
                }), {});
                setGames(formattedGames);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
            }
        };
        fetchGames();
    }, []);

    //COR DO MARCADOR

    const getStatusColor = (resultado) => {
        switch (resultado) {
            case 'V': return '#4CAF50';
            case 'D': return '#F44336';
            case 'E': return '#FF9800';
            default: return '#6cc3eb';
        }
    };

    // Ao pressionar DATA

    const handleDatePress = async (date) => {
        const today = new Date();
        const selectedDate = new Date(date.dateString);
        const isFuture = selectedDate > today;

        try {
            const response = await axios.get(`/api/jogos?date=${date.dateString}`);
            const existingGameData = response.data[0] || {
                data: date.dateString,
                resultado: isFuture ? 'agendado' : null,
                adversario: '',
                estadio: '',
                horario: '',
                gols: [],
                cartoes: [],
                type: isFuture ? 'future' : 'past'
            };
            setCurrentGame(existingGameData);
            setSelectedDate(date.dateString);
            setEditMode(!existingGameData.id && !isFuture);
            setModalVisible(true);
        } catch (error) {
            console.error('Erro ao buscar jogo:', error);
        }
    };

    const handleSave = async () => {
        // Validação antes da requisição
        const camposObrigatorios = !currentGame.adversario || !currentGame.horario;
        const golsInvalidos = currentGame.gols.some(gol => !gol.jogador || !gol.minuto);
        const cartoesInvalidos = currentGame.cartoes.some(cartao => !cartao.jogador || !cartao.minuto);

        if (camposObrigatorios || golsInvalidos || cartoesInvalidos) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
            return;
        }

        try {
            const payload = {
                data: selectedDate,
                adversario: currentGame.adversario,
                estadio: currentGame.estadio,
                horario: currentGame.horario,
                resultado: currentGame.resultado,
                gols: currentGame.gols.map(gol => ({
                    jogador_id: gol.jogador,
                    assistencia_jogador_id: gol.assistencia,
                    minuto: gol.minuto
                })),
                cartoes: currentGame.cartoes.map(cartao => ({
                    jogador_id: cartao.jogador,
                    tipo: cartao.tipo,
                    minuto: cartao.minuto
                }))
            };

            const method = currentGame.id ? 'put' : 'post';
            const url = currentGame.id ? `/api/jogos/${currentGame.id}` : '/api/jogos';

            const response = await axios[method](url, payload);

            // Atualizar lista de jogos após salvar
            const updatedGames = { ...games };
            updatedGames[selectedDate] = {
                ...payload,
                marked: {
                    selected: true,
                    selectedColor: getStatusColor(payload.resultado),
                    dotColor: '#FFF'
                }
            };
            setGames(updatedGames);

            setModalVisible(false);
            setEditMode(false);
        } catch (error) {
            console.error('Erro ao salvar:', error.response?.data);
            Alert.alert('Erro', error.response?.data?.message || 'Falha ao Salvar Jogo');
        }
    };

    //render formulario

    const renderDetails = () => (
        <View style={styles.detailsContainer}>
            <Text style={styles.detailTitle}>Detalhes do Jogo</Text>

            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Adversário:</Text>
                <Text style={styles.detailText}>{currentGame.adversario || 'Não informado'}</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Estádio:</Text>
                <Text style={styles.detailText}>{currentGame.estadio || 'Não informado'}</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Horário:</Text>
                <Text style={styles.detailText}>{currentGame.horario || 'Não informado'}</Text>
            </View>

            {currentGame.type === 'past' && (
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Resultado:</Text>
                    <Text style={styles.detailText}>
                        {currentGame.resultado === 'V' && 'Vitória'}
                        {currentGame.resultado === 'D' && 'Derrota'}
                        {currentGame.resultado === 'E' && 'Empate'}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditMode(true)}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );

    const renderGolForm = (index) => {
        return (
            <View style={styles.inputGroup} key={`gol-${index}`}>
                <Picker
                    selectedValue={currentGame.gols[index]?.jogador}
                    onValueChange={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], jogador: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                >
                    <Picker.Item label="Jogador" value="" />
                    {jogadores.map(j => (
                        <Picker.Item key={j.id} label={j.nome} value={j.id} />
                    ))}
                </Picker>

                <TextInput
                    placeholder="Minuto"
                    value={currentGame.gols[index]?.minuto || ''}
                    onChangeText={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], minuto: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                />

                <Picker
                    placeholder="Assistência"
                    selectedValue={currentGame.gols[index]?.assistencia}
                    onValueChange={text => {
                        const newGols = [...currentGame.gols];
                        newGols[index] = { ...newGols[index], assistencia: text };
                        setCurrentGame({ ...currentGame, gols: newGols });
                    }}
                >
                    <Picker.Item label="Assistência" value="" />
                    {jogadores.map(j => (
                        <Picker.Item key={j.id} label={j.nome} value={j.id} />
                    ))}
                </Picker>
            </View >
        );
    };

    const renderEditForm = () => (
        <ScrollView>
            <View style={styles.detailsContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        Alert.prompt(
                            'Cadastrar Jogador',
                            'Digite o nome:',
                            (nome) => {
                                if (nome) {
                                    axios.post('/api/jogadores', { nome, posicao: 'Não definida' })
                                        .then(response => {
                                            setJogadores([...jogadores, response.data]);
                                        });
                                }
                            }
                        );
                    }}
                >
                    <Text>+ Novo Jogador</Text>
                </TouchableOpacity>
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
                            selectedValue={currentGame.resultado || 'V'}
                            onValueChange={value => setCurrentGame(prev => ({ ...prev, resultado: value }))}
                            style={styles.picker}
                            dropdownIconColor="#FFD700"
                        >
                            <Picker.Item label="Vitória" value="V" />
                            <Picker.Item label="Derrota" value="D" />
                            <Picker.Item label="Empate" value="E" />
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
                    onPress={() => {
                        // Abrir modal de cadastro rápido
                        Alert.prompt(
                            'Cadastrar Jogador',
                            'Digite o nome do jogador:',
                            (nome) => {
                                if (nome) {
                                    axios.post('/api/jogadores', { nome, posicao: 'Não definida' })
                                        .then(response => {
                                            setJogadores([...jogadores, response.data]);
                                        })
                                        .catch(error => Alert.alert('Erro', 'Falha ao cadastrar jogador'));
                                }
                            }
                        );
                    }}
                >
                    <Text style={styles.buttonText}>+ Cadastrar Novo Jogador</Text>
                </TouchableOpacity>
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
                <Text style={styles.sectionTitle}>Cartões 🟨🟥</Text>
                {currentGame.cartoes?.map((_, index) => renderCartaoForm(index))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setCurrentGame(prev => ({
                        ...prev,
                        cartoes: [...prev.cartoes, { jogador: '', minuto: '' }]
                    }))}>
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
        </ScrollView >
    );

    // Buscar jogadores
    useEffect(() => {
        const fetchJogadores = async () => {
            try {
                const response = await axios.get('/api/jogadores');
                setJogadores(response.data);
            } catch (error) {
                console.error('Erro ao buscar jogadores:', error);
            }
        };
        fetchJogadores();
    }, []);

    // Novo componente para cartões
    const renderCartaoForm = (index) => {
        return (
            <View style={styles.inputGroup} key={`cartao-${index}`}>
                <Picker
                    selectedValue={currentGame.cartoes[index]?.jogador}
                    onValueChange={text => {
                        const newCartoes = [...currentGame.cartoes];
                        newCartoes[index] = { ...newCartoes[index], jogador: text };
                        setCurrentGame({ ...currentGame, cartoes: newCartoes });
                    }}>
                    <Picker.Item label="Selecione o jogador" value="" />
                    {jogadores.map(j => (
                        <Picker.Item key={j.id} label={j.nome} value={j.id} />
                    ))}
                </Picker>

                <TextInput
                    placeholder="Minuto"
                    value={currentGame.cartoes[index]?.minuto || ''}
                    onChangeText={text => {
                        const newCartoes = [...currentGame.cartoes];
                        newCartoes[index] = { ...newCartoes[index], minuto: text };
                        setCurrentGame({ ...currentGame, cartoes: newCartoes });
                    }}
                />
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                theme={styles.calendarTheme}
                markedDates={games}
                onDayPress={handleDatePress}
            />
            {modalVisible && currentGame && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>

                        {editMode ? renderEditForm() : renderDetails()}
                    </View>
                </Modal>
            )}

        </SafeAreaView >
    );
};

export default Calendario;