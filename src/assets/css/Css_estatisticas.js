// Css_estatisticas.js
import { StyleSheet } from 'react-native';

export const stats_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    scrollContent: {
        padding: 15,
        paddingTop: 0,
        backgroundImage: 'linear-gradient(45deg, #2A2A2A 25%, #1A1A1A 25%, #1A1A1A 50%, #2A2A2A 50%, #2A2A2A 75%, #1A1A1A 75%)',
        backgroundSize: '40px 40px'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginVertical: 20,
        textAlign: 'center'
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    gridItem: {
        backgroundColor: '#000000', // Fundo preto
        borderWidth: 2,
        borderColor: '#FFD700', // Borda amarela
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: '48%',
        // backgroundColor: '#F8F9FA',
        //  borderRadius: 10,
        //   padding: 20,
        // marginBottom: 15,
        alignItems: 'center'
    },
    gridValue: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 5
    },
    gridTitle: {
        fontSize: 14,
        color: '#FFD700',
        textAlign: 'center'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderBottomColor: '#FFD700',
        padding: 15
    },
    modalTitle: {
        fontSize: 20,
        color: '#FFD700',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 30
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeText: {
        fontSize: 30,
        color: 'white',
        lineHeight: 30
    },
    modalContent: {
        flex: 1,
        padding: 20
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2A',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        textAlign: 'center'
    },
    modalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A2D5A',
        flex: 1,
        textAlign: 'center'
    },
    tituloSecao: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffffff',
        marginBottom: 15
    },
    tabelaContainer: {
        marginVertical: 20,
        backgroundColor: '#000000',
        borderColor: '#FFD700',
        borderwith: 1,
        borderRadius: 10,
        padding: 15
    },
    tabelaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#1A2D5A',
        paddingBottom: 10,
        marginBottom: 10
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFD700'
    },
    tabelaLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
        paddingVertical: 5
    },
    resultWin: {
        color: '#28A745',
        fontWeight: 'bold'
    },
    resultLoss: {
        color: '#DC3545',
        fontWeight: 'bold'
    },
    resultDraw: {
        color: '#FFC107',
        fontWeight: 'bold'
    },
    destaqueZebrado: {
        backgroundColor: '#FFD700',
        padding: 8,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#000000'
    },
    iconeEstatistica: {
        tintColor: '#FFD700' // Para ícones
    }
});