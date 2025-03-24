import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { player_styles } from '../assets/css/Css_jogadores';
import api from '../config/api';

const Jogadores = () => {
    const [totalTeamGames] = useState(27);
    const [players, setPlayers] = useState([
        { id: '1', name: 'Neymar Jr', position: 'Atacante', goals: 12, assists: 8, yellowCards: 2, redCards: 0, gamesPlayed: 22 },
        { id: '2', name: 'Vini Jr', position: 'Meia', goals: 8, assists: 10, yellowCards: 3, redCards: 1, gamesPlayed: 25 },
    ]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newPlayer, setNewPlayer] = useState({
        id: '',
        name: '',
        position: '',
        goals: '0',
        assists: '0',
        yellowCards: '0',
        redCards: '0',
        gamesPlayed: '0'

    });

    const handleSavePlayer = () => {
        if (!newPlayer.name || !newPlayer.position) {
            Alert.alert('Erro', 'Preencha nome e posição');
            return;
        }

        const updatedPlayer = {
            ...newPlayer,
            goals: parseInt(newPlayer.goals) || 0,
            assists: parseInt(newPlayer.assists) || 0,
            yellowCards: parseInt(newPlayer.yellowCards) || 0,
            redCards: parseInt(newPlayer.redCards) || 0,
            gamesPlayed: parseInt(newPlayer.gamesPlayed) || 0
        };

        if (newPlayer.id) {
            setPlayers(prev => prev.map(p => p.id === newPlayer.id ? updatedPlayer : p));
        } else {
            setPlayers([...players, { ...updatedPlayer, id: Date.now().toString() }]);
        }

        setNewPlayer({ id: '', name: '', position: '', goals: '', assists: '', yellowCards: '', redCards: '', gamesPlayed: '' });
        setEditModalVisible(false);
    };

    const deletePlayer = (id) => {
        setPlayers(players.filter(player => player.id !== id));
        setModalVisible(false);
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
                <Text style={player_styles.playerName}>{item.name}</Text>
                <Text style={player_styles.playerPosition}>{item.position}</Text>
            </View>
            <View style={player_styles.playerStats}>
                <Text style={player_styles.statItem}>⚽ {item.goals}</Text>
                <Text style={player_styles.statItem}>🎯 {item.assists}</Text>
            </View>
        </TouchableOpacity>
    );



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
                        name: '',
                        position: '',
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
                            value={newPlayer.name}
                            onChangeText={text => setNewPlayer({ ...newPlayer, name: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Posição:</Text>
                        <TextInput
                            style={player_styles.input}
                            placeholder="Ex: Atacante"
                            value={newPlayer.position}
                            onChangeText={text => setNewPlayer({ ...newPlayer, position: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Jogos Participados:</Text>
                        <TextInput
                            style={player_styles.input}
                            keyboardType="numeric"
                            value={newPlayer.gamesPlayed?.toString() || ''}
                            onChangeText={text => setNewPlayer({ ...newPlayer, gamesPlayed: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Gols:</Text>
                        <TextInput
                            style={player_styles.input}
                            keyboardType="numeric"
                            value={newPlayer.goals?.toString() || ''}
                            onChangeText={text => setNewPlayer({ ...newPlayer, goals: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Assistências:</Text>
                        <TextInput
                            style={player_styles.input}
                            keyboardType="numeric"
                            value={newPlayer.assists?.toString() || ''}
                            onChangeText={text => setNewPlayer({ ...newPlayer, assists: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Cartões Amarelos:</Text>
                        <TextInput
                            style={player_styles.input}
                            keyboardType="numeric"
                            value={newPlayer.yellowCards?.toString() || ''}
                            onChangeText={text => setNewPlayer({ ...newPlayer, yellowCards: text })}
                        />
                    </View>

                    <View style={player_styles.formGroup}>
                        <Text style={player_styles.inputLabel}>Cartões Vermelhos:</Text>
                        <TextInput
                            style={player_styles.input}
                            keyboardType="numeric"
                            value={newPlayer.redCards?.toString() || ''}
                            onChangeText={text => setNewPlayer({ ...newPlayer, redCards: text })}
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
            </Modal>
            <Modal visible={modalVisible}
                onRequestClose={() => setEditModalVisible(false)}
                animationType="slide">
                <View style={player_styles.modalContainer}>
                    {selectedPlayer && (

                        <>
                            <Text style={player_styles.modalTitle}>{selectedPlayer.name}</Text>
                            <View style={player_styles.statsContainer}>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Posição:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.position}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Jogos Participados:</Text>
                                    <Text style={player_styles.statValue}>
                                        {selectedPlayer.gamesPlayed} ({(selectedPlayer.gamesPlayed / totalTeamGames * 100).toFixed(1)}%)
                                    </Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Gols:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.goals}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Assistências:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.assists}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Cartões Amarelos:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.yellowCards}</Text>
                                </View>
                                <View style={player_styles.statRow}>
                                    <Text style={player_styles.statLabel}>Cartões Vermelhos:</Text>
                                    <Text style={player_styles.statValue}>{selectedPlayer.redCards}</Text>
                                </View>
                            </View>

                            <View style={player_styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[player_styles.modalButton, player_styles.editButton]}
                                    onPress={() => {
                                        setNewPlayer({
                                            ...selectedPlayer,
                                            goals: selectedPlayer.goals.toString() || '0',
                                            assists: selectedPlayer.assists.toString() || '0',
                                            yellowCards: selectedPlayer.yellowCards.toString() || '0',
                                            redCards: selectedPlayer.redCards.toString() || '0',
                                            gamesPlayed: selectedPlayer.gamesPlayed.toString() || '0'
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

        </View>
    );
};

export default Jogadores;