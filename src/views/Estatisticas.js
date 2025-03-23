// Estatisticas.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { stats_styles } from '../assets/css/Css_estatisticas';

const Estatisticas = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);

    // Dados mockados atualizados
    const temporada = {
        vitorias: [
            { adversario: 'Time A', resultado: '3-1', data: '10/06', status: 'V' },
            { adversario: 'Time B', resultado: '2-0', data: '07/06', status: 'V' }
        ],
        derrotas: [
            { adversario: 'Time C', resultado: '0-1', data: '04/06', status: 'D' }
        ],
        empates: [
            { adversario: 'Time D', resultado: '2-2', data: '01/06', status: 'E' }
        ],
        jogos: [
            { adversario: 'Time A', resultado: '3-1', data: '10/06', status: 'V' },
            { adversario: 'Time B', resultado: '2-2', data: '07/06', status: 'E' },
            { adversario: 'Time C', resultado: '0-1', data: '04/06', status: 'D' },
            { adversario: 'Time D', resultado: '1-0', data: '01/06', status: 'V' }
        ],
        artilharia: [
            { jogador: 'C. Ronaldo', gols: 15 },
            { jogador: 'L. Messi', gols: 12 }
        ],
        assistencias: [
            { jogador: 'K. De Bruyne', assist: 10 },
            { jogador: 'T. Kroos', assist: 8 }
        ],
        cartoesAmarelos: 12,
        cartoesVermelhos: 2
    };

    const stats = [
        { title: 'Vitórias', value: temporada.vitorias.length, data: temporada.vitorias },
        { title: 'Derrotas', value: temporada.derrotas.length, data: temporada.derrotas },
        { title: 'Empates', value: temporada.empates.length, data: temporada.empates },
        { title: 'Jogos Disputados', value: temporada.jogos.length, data: temporada.jogos },
        { title: 'Artilheiros', value: temporada.artilharia[0].gols, data: temporada.artilharia },
        { title: 'Assistências', value: temporada.assistencias[0].assist, data: temporada.assistencias },
        { title: 'Cartões Amarelos', value: temporada.cartoesAmarelos, data: [] },
        { title: 'Cartões Vermelhos', value: temporada.cartoesVermelhos, data: [] },
    ];

    // Função para renderizar a tabela de últimos jogos
    const renderUltimosJogos = () => (
        <View style={stats_styles.tabelaContainer}>
            <Text style={stats_styles.tituloSecao}>Últimos Jogos</Text>
            <View style={stats_styles.tabelaHeader}>
                <Text style={stats_styles.headerCell}>Adversário</Text>
                <Text style={stats_styles.headerCell}>Resultado</Text>
                <Text style={stats_styles.headerCell}>Data</Text>
            </View>

            {temporada.jogos.slice(0, 5).map((jogo, index) => (
                <View key={index} style={stats_styles.tabelaLinha}>
                    <Text style={stats_styles.cell}>{jogo.adversario}</Text>
                    <Text style={[
                        stats_styles.cell,
                        jogo.status === 'V' && stats_styles.resultWin,
                        jogo.status === 'D' && stats_styles.resultLoss,
                        jogo.status === 'E' && stats_styles.resultDraw
                    ]}>
                        {jogo.resultado}
                    </Text>
                    <Text style={stats_styles.cell}>{jogo.data}</Text>
                </View>
            ))}
        </View>
    );

    const handleGridPress = (stat) => {
        if (stat.data.length > 0) {
            setModalTitle(stat.title);
            setModalData(stat.data);
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
                                <Text style={stats_styles.modalText}>{item.jogador}</Text>
                                <Text style={stats_styles.modalValue}>
                                    {isArtilheiro ? `${item.gols} gols` : `${item.assist} assistências`}
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
                    {stats.map((stat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={stats_styles.gridItem}
                            onPress={() => handleGridPress(stat)}
                            disabled={stat.data.length === 0}
                        >
                            <Text style={stats_styles.gridValue}>{stat.value}</Text>
                            <Text style={stats_styles.gridTitle}>{stat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {renderUltimosJogos()}
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