import { StyleSheet, Platform } from 'react-native';

export const player_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 20
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 25,
        marginTop: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.5
    },
    listContainer: {
        paddingBottom: 100
    },
    playerItem: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5
    },
    playerInfo: {
        flex: 1,
        marginRight: 15
    },
    playerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFD700',
        marginBottom: 5,
        zIndex: 1,
    },
    playerPosition: {
        fontSize: 14,
        color: '#FFD700',
        opacity: 0.8,
    },
    playerStats: {
        flexDirection: 'row',
        gap: 20,
        color: '#FFD700',
    },
    statItem: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: '600',
        // zIndex:999,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#FFD700',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 999,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 25,
        // borderLeftWidth: 2,
        //  borderRightWidth: 2,
        borderColor: '#FFD700'
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#b4b4d1',
        marginBottom: 25,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FFD700',
        paddingBottom: 10
    },
    statsContainer: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFD700'
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center'
    },
    statLabel: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: '600'
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    formGroup: {
        marginBottom: 20
    },
    inputLabel: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8
    },
    input: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FFD700'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        gap: 10,
        flexWrap: 'wrap'
    },
    modalButton: {
        padding: 12,
        borderRadius: 8,
        minWidth: 100,
        flex: 1,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#1A1A1A',
        marginHorizontal: 2
    },
    saveButton: {
        backgroundColor: '#FFD700'
    },
    deleteButton: {
        backgroundColor: '#B22222'
    },
    closeButton: {
        backgroundColor: '#2F4F4F'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    teamStatsContainer: {
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        padding: 15,
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#FFD700'
    },
    teamStatText: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    editButton: {
        backgroundColor: '#FFD700',
        borderColor: '#000000'
    },
    positionButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    selectedPosition: {
        backgroundColor: '#4CAF50',
    },
    positionOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    warningText: {
        color: '#FF9800',
        fontSize: 12,
        marginTop: 4,

    },
    refreshButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 999,
        backgroundColor: '#FFD700', // Novo
        padding: 8, // Novo
        borderRadius: 20, // Novo
    },

});