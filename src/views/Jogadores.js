import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { player_styles } from '../assets/css/Css_jogadores';
import api from '../config/api';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { useIsFocused } from '@react-navigation/native';

const Jogadores = () => {
    const [totalTeamGames] = useState(1);
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const [newPlayer, setNewPlayer] = useState({
        id: '',
        nome: '',
        positions: [],
        goals: '0',
        assists: '0',
        yellowCards: '0',
        redCards: '0',
        gamesPlayed: '0'

    });



    const handleSavePlayer = async () => {
        if (!newPlayer.nome || newPlayer.positions.length === 0) {  // Verificar positions.length
            Alert.alert('Erro', 'Preencha nome e selecione pelo menos uma posição');
            return;
        }

        try {
            const method = newPlayer.id ? 'put' : 'post';
            const url = newPlayer.id ? `/api/jogadores/${newPlayer.id}` : '/api/jogadores';

            // Envie os dados para o backend
            const response = await api[method](url, {
                nome: newPlayer.nome,
                posicao: newPlayer.positions.join(', '),
                gols: parseInt(newPlayer.goals) || 0,
                assistencias: parseInt(newPlayer.assists) || 0,
                cartoes_amarelos: parseInt(newPlayer.yellowCards) || 0,
                cartoes_vermelhos: parseInt(newPlayer.redCards) || 0,
                jogos_participados: parseInt(newPlayer.gamesPlayed) || 0,
            });

            if (method === 'post') {
                setPlayers([...players, {
                    ...response.data,
                    gols: response.data.gols || 0,
                    assistencias: response.data.assistencias || 0,
                    cartoes_amarelos: response.data.cartoes_amarelos || 0,
                    cartoes_vermelhos: response.data.cartoes_vermelhos || 0,
                    jogos_participados: response.data.jogos_participados || 0
                }]);
            } else {
                setPlayers(prev => prev.map(p =>
                    p.id === newPlayer.id ? {
                        ...response.data,
                        gols: response.data.gols || 0,
                        assistencias: response.data.assistencias || 0,
                        cartoes_amarelos: response.data.cartoes_amarelos || 0,
                        cartoes_vermelhos: response.data.cartoes_vermelhos || 0,
                        jogos_participados: response.data.jogos_participados || 0
                    } : p
                ));
            }

            setEditModalVisible(false);
        } catch (error) {
            console.error('Erro detalhado:', error.response?.data || error.message);
            Alert.alert('Erro', error.response?.data?.message || 'Falha ao salvar jogador');
        }
    };

    const deletePlayer = async (id) => {
        try {
            await api.delete(`/api/jogadores/${id}`);
            setPlayers(prev => prev.filter(player => player.id !== id));
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao excluir jogador');
        }
    };

    const renderPlayerItem = ({ item }) => (
        <TouchableOpacity
            style={player_styles.playerItem}
            onPress={() => {
                setSelectedPlayer(item);
                setModalVisible(true);
            }}
        >
            <View style={player_styles.playerInfo}>
                <Text style={player_styles.playerName}>{item.nome}</Text>
                <Text style={player_styles.playerPosition}>{item.posicao}</Text>
            </View>
            <View style={player_styles.playerStats}>
                <Text style={player_styles.statItem}>⚽ {item.gols || 0}</Text>
                <Text style={player_styles.statItem}>🎯 {item.assistencias || 0}</Text>
            </View>
        </TouchableOpacity>
    );

    const handlePositionSelect = (pos) => {
        const currentPositions = newPlayer.positions || [];

        if (currentPositions.includes(pos)) {
            setNewPlayer(prev => ({
                ...prev,
                positions: prev.positions.filter(p => p !== pos)
            }));
        } else if (currentPositions.length < 2) {
            setNewPlayer(prev => ({
                ...prev,
                positions: [...prev.positions, pos]
            }));
        }
    };

    useEffect(() => {
        if (isFocused) {
            const fetchPlayers = async () => {
                try {
                    const response = await api.get('/api/jogadores');
                    setPlayers(response.data);
                } catch (error) {
                    console.error('Erro na requisição:', error.message);
                    if (error.response) {
                        console.error('Resposta do servidor:', error.response.data);
                    }
                    Alert.alert('Erro', 'Não foi possível carregar os jogadores');
                }
            };
            fetchPlayers();
        }
    }, [isFocused]);

    return (
        <View style={player_styles.container}>
            <Text style={player_styles.titulo}>Jogadores</Text>

            <View style={player_styles.teamStatsContainer}>
                <Text style={player_styles.teamStatText}>Jogos do Time: {totalTeamGames}</Text>
            </View>

            <TouchableOpacity
                style={player_styles.addButton}
                onPress={() => {
                    setNewPlayer({
                        id: '',
                        nome: '',
                        positions: [],
                        goals: '',
                        assists: '',
                        yellowCards: '',
                        redCards: '',
                        gamesPlayed: ''
                    });
                    setEditModalVisible(true);
                    setModalVisible(false);
                }}
            >
                <Ionicons name="add" size={30} color="black" />
            </TouchableOpacity>

            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={renderPlayerItem}
                contentContainerStyle={player_styles.listContainer}
            />
            <Modal visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
                animationType="slide">
                <View style={player_styles.modalContainer}>
                    <Text style={player_styles.modalTitle}>
                        {newPlayer.id ? 'Editar Jogador' : 'Novo Jogador'}
                    </Text>

                    {/* Campos do Formulário com Labels */}
                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Nome do Jogador:</Text>
                        <TextInput
                            style={player_styles.input}
                            placeholder="Ex: Neymar Jr"
                            value={newPlayer.nome}
                            onChangeText={text => setNewPlayer({ ...newPlayer, nome: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Posições (máx. 2):</Text>
                        <View style={player_styles.positionOptions}>
                            {["Atacante", "Meio-Campo", "Volante", "Zagueiro", "Lateral", "Goleiro"].map((pos) => (
                                <TouchableOpacity
                                    key={pos}
                                    style={[
                                        player_styles.positionButton,
                                        (newPlayer.positions || []).includes(pos) && player_styles.selectedPosition
                                    ]}
                                    onPress={() => handlePositionSelect(pos)}
                                >
                                    <Text>{pos}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {newPlayer.positions.length === 2 && (
                            <Text style={player_styles.warningText}>Máximo de 2 posições selecionadas</Text>
                        )}
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Jogos Participados: {newPlayer.gamesPlayed}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={parseInt(newPlayer.gamesPlayed) || 0}
                            onValueChange={value => setNewPlayer(prev => ({ ...prev, gamesPlayed: value.toString() }))}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#e0e0e0"
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Gols: {newPlayer.goals}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={parseInt(newPlayer.goals) || 0}
                            onValueChange={value => setNewPlayer(prev => ({ ...prev, goals: value.toString() }))}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#e0e0e0"
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Assistências: {newPlayer.assists}</Text>

                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={parseInt(newPlayer.assists) || 0}
                            onValueChange={value => setNewPlayer(prev => ({ ...prev, assists: value.toString() }))}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#e0e0e0"
                        />
                    </View>


                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Cartões Amarelos: {newPlayer.yellowCards}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={parseInt(newPlayer.yellowCards) || 0}
                            onValueChange={value => setNewPlayer(prev => ({ ...prev, yellowCards: value.toString() }))}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#e0e0e0"
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Cartões Vermelhos:{newPlayer.redCards}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={parseInt(newPlayer.redCards) || 0}
                            onValueChange={value => setNewPlayer(prev => ({ ...prev, redCards: value.toString() }))}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#e0e0e0"
                        />
                    </View>

                    <View style={player_styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[player_styles.modalButton, player_styles.saveButton]}
                            onPress={handleSavePlayer}
                        >
                            <Text style={player_styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[player_styles.modalButton, player_styles.closeButton]}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={player_styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
            <Modal visible={modalVisible}
                onRequestClose={() => setEditModalVisible(false)}
                animationType="slide">
                <View style={player_styles.modalContainer}>
                    {selectedPlayer && (

                        <>
                            <Text style={player_styles.modalTitle}>{selectedPlayer.nome}</Text>
                            <View style={player_styles.statsContainer}>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Posição:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.posicao}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Jogos Participados:</Text>
                                    <Text style={player_styles.statValue}>
                                        {(parseInt(selectedPlayer.jogos_participados) / (totalTeamGames || 1) * 100).toFixed(1)}%
                                    </Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Gols:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.gols}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Assistências:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.assistencias}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Cartões Amarelos:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.cartoes_amarelos}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Cartões Vermelhos:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.cartoes_vermelhos}</Text>
                                </View>
                            </View>

                            <View style={player_styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[player_styles.modalButton, player_styles.editButton]}
                                    onPress={() => {
                                        setNewPlayer({
                                            ...selectedPlayer,
                                            positions: selectedPlayer.posicao ? selectedPlayer.posicao.split(', ') : [],
                                            goals: selectedPlayer.gols?.toString() || '0',
                                            assists: selectedPlayer.assistencias?.toString() || '0',
                                            yellowCards: selectedPlayer.cartoes_amarelos?.toString() || '0',
                                            redCards: selectedPlayer.cartoes_vermelhos?.toString() || '0',
                                            gamesPlayed: selectedPlayer.jogos_participados?.toString() || '0'
                                        });
                                        setEditModalVisible(true);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={player_styles.buttonText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[player_styles.modalButton, player_styles.deleteButton]}
                                    onPress={() => deletePlayer(selectedPlayer.id)}
                                >
                                    <Text style={player_styles.buttonText}>Excluir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[player_styles.modalButton, player_styles.closeButton]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={player_styles.buttonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    {/* Modal de Detalhes (mantenha igual) */}
                </View>
            </Modal>

        </View >
    );
};

export default Jogadores;