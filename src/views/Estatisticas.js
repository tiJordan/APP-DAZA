// Estatisticas.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { stats_styles } from '../assets/css/Css_estatisticas';
import PropTypes from 'prop-types';
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.0.141:3008';

const Estatisticas = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);
    const [gamesData, setGamesData] = useState([]);

    const [stats, setStats] = useState({
        vitorias: 0,
        derrotas: 0,
        empates: 0,
        jogosDisputados: 0,
        artilharia: [],
        assistencias: [],
        cartoesAmarelos: 0,
        cartoesVermelhos: 0,
        carregando: true // 👈 Novo estado de loading
    });

    Estatisticas.propTypes = {
        stats: PropTypes.shape({
            vitorias: PropTypes.number,
            derrotas: PropTypes.number,
            empates: PropTypes.number,
            artilharia: PropTypes.array,
            assistencias: PropTypes.array,
            cartoesAmarelos: PropTypes.number,
            cartoesVermelhos: PropTypes.number,
            carregando: PropTypes.bool
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Iniciando busca de Estatísticas...');
                const [gamesRes, playersRes] = await Promise.all([
                    axios.get('/api/jogos'),
                    axios.get('/api/jogadores/estatisticas')
                ]);

                const gamesData = gamesRes.data;
                const playersData = playersRes.data;
                const games = gamesRes.data || [];

                console.log('Resposta Jogos:', gamesRes.data); // 👈 Novo log
                console.log('Resposta Jogadores:', playersRes.data); // 👈 Novo log

                setGamesData(games);
                // Calcular estatísticas
                const newStats = {
                    vitorias: gamesData.filter(g => g.resultado === 'V').length,
                    derrotas: gamesData.filter(g => g.resultado === 'D').length,
                    empates: gamesData.filter(g => g.resultado === 'E').length,
                    jogosDisputados: gamesData.length,
                    artilharia: (playersData || []).sort((a, b) => (b.total_gols || 0) - (a.total_gols || 0)).slice(0, 5),
                    assistencias: (playersData || []).sort((a, b) => (b.total_assistencias || 0) - (a.total_assistencias || 0)).slice(0, 5),
                    cartoesAmarelos: (playersData || []).reduce((acc, curr) => acc + (curr.cartoes_amarelos || 0), 0),
                    cartoesVermelhos: (playersData || []).reduce((acc, curr) => acc + (curr.cartoes_vermelhos || 0), 0),
                    carregando: false
                };

                setStats(newStats);

            } catch (error) {
                console.error('Erro completo: ', error);
                console.log('Config da requisição:', error.config);
                if (error.response) {
                    console.log('Resposta do erro: ', error.response.data);
                }
                setStats(prev => ({ ...prev, carregando: false }));
            }
        };

        fetchData();
    }, []);

    // Função para renderizar a tabela de últimos jogos
    const renderUltimosJogos = (jogos) => (
        <View style={stats_styles.tabelaContainer}>
            <Text style={stats_styles.tituloSecao}>Últimos Jogos</Text>
            <View style={stats_styles.tabelaHeader}>
                <Text style={stats_styles.headerCell}>Adversário</Text>
                <Text style={stats_styles.headerCell}>Resultado</Text>
                <Text style={stats_styles.headerCell}>Data</Text>
            </View>

            {(jogos || []).slice(0, 5).map((jogo, index) => ( // 👈 Adicione fallback
                <View key={index} style={stats_styles.tabelaLinha}>
                    <Text style={stats_styles.cell}>{jogo.adversario}</Text>
                    <Text style={[
                        stats_styles.cell,
                        jogo.resultado === 'V' && stats_styles.resultWin,
                        jogo.resultado === 'D' && stats_styles.resultLoss,
                        jogo.resultado === 'E' && stats_styles.resultDraw
                    ]}>
                        {jogo.resultado}
                    </Text>
                    <Text style={stats_styles.cell}>
                        {new Date(jogo.data).toLocaleDateString('pt-BR')} {/* 👈 Formate a data */}
                    </Text>
                </View>
            ))}
        </View>
    );

    const handleGridPress = (statTitle) => {
        let data = [];

        switch (statTitle) {
            case 'Jogos Disputados':
                data = gamesData;
                break;
            case 'Vitórias':
                data = gamesData.filter(jogo => jogo.resultado === 'V');
                break;
            case 'Derrotas':
                data = gamesData.filter(jogo => jogo.resultado === 'D');
                break;
            case 'Empates':
                data = gamesData.filter(jogo => jogo.resultado === 'E');
                break;
            default:
                data = [];
            case 'Artilheiros':
                data = stats.artilharia;
                break;
            case 'Assistências':
                data = stats.assistencias;
                break;
            case 'Cartões Amarelos':
                data = stats.cartoesAmarelos;
                break;
            case 'Cartões Vermelhos':
                data = stats.cartoesVermelhos;
                break;
            // ... Adicione casos para outras estatísticas
        }

        if (data.length > 0) {
            setModalTitle(statTitle);
            setModalData(data);
            setModalVisible(true);
        }
    };

    const renderModalContent = () => {
        const isJogo = modalData[0]?.resultado;
        const isArtilheiro = modalData[0]?.gols;
        const isAssistencia = modalData[0]?.assist;

        return (
            <ScrollView style={stats_styles.modalContent}>
                {modalData.map((item, index) => (
                    <View key={index} style={stats_styles.modalItem}>
                        {isJogo && (
                            <>
                                <Text style={stats_styles.modalText}>{item.adversario}</Text>
                                <Text style={[
                                    stats_styles.modalText,
                                    item.status === 'V' && stats_styles.resultWin,
                                    item.status === 'D' && stats_styles.resultLoss,
                                    item.status === 'E' && stats_styles.resultDraw
                                ]}>
                                    {item.resultado}
                                </Text>
                                <Text style={stats_styles.modalText}>{item.data}</Text>
                            </>
                        )}

                        {(isArtilheiro || isAssistencia) && (
                            <>
                                <Text style={stats_styles.modalText}>{item.jogador || 'Sem nome'}</Text>
                                <Text style={stats_styles.modalValue}>
                                    {isArtilheiro ? `${item.gols} gols` : `${item.assist} assistências` || 0}
                                </Text>
                            </>
                        )}
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={stats_styles.container}>
            <StatusBar backgroundColor="#1A2D5A" barStyle="light-content" />

            <ScrollView contentContainerStyle={stats_styles.scrollContent}>
                <Text style={stats_styles.titulo}>Estatísticas da Temporada</Text>

                {/* Grid Principal */}
                <View style={stats_styles.gridContainer}>
                    {!stats.carregando && (
                        <>
                            <View style={stats_styles.gridContainer}>
                                {/* Vitórias */}
                                <TouchableOpacity style={stats_styles.gridItem} onPress={() => handleGridPress('Vitórias', stats.vitorias)}>
                                    <Text style={stats_styles.gridValue}>{stats.vitorias}</Text>
                                    <Text style={stats_styles.gridTitle}>Vitórias</Text>
                                </TouchableOpacity>

                                {/* Derrotas */}
                                <TouchableOpacity style={stats_styles.gridItem} onPress={() => handleGridPress('Derrotas', stats.derrotas)}>
                                    <Text style={stats_styles.gridValue}>{stats.derrotas}</Text>
                                    <Text style={stats_styles.gridTitle}>Derrotas</Text>
                                </TouchableOpacity>

                                {/* ... Repita para outras estatísticas seguindo o mesmo padrão ... */}
                            </View>

                            {renderUltimosJogos(gamesData)}
                        </>
                    )}

                    {stats.carregando && (
                        <ActivityIndicator size="large" color="#1A2D5A" style={{ marginTop: 20 }} />
                    )}
                </View>
                {renderUltimosJogos(gamesData)}
                {/* Modal */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={stats_styles.modalHeader}>
                        <TouchableOpacity
                            style={stats_styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={stats_styles.closeText}>×</Text>
                        </TouchableOpacity>
                        <Text style={stats_styles.modalTitle}>{modalTitle}</Text>
                    </View>
                    {renderModalContent()}
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Estatisticas;