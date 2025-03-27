import { StyleSheet } from 'react-native';

export const calendar_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    calendarTheme: {
        backgroundColor: '#000000',
        calendarBackground: '#000000',
        textSectionTitleColor: '#FFD700',
        todayTextColor: '#FFD700',
        dayTextColor: '#FFFFFF',
        arrowColor: '#FFD700',
        monthTextColor: '#FFD700',
        textDisabledColor: '#2A2A2A'
    },
    resultColors: {
        win: '#4CAF50',
        loss: '#F44336',
        draw: '#FF9800',
        future: '#17A2B8'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20
    },
    detailsContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15
    },
    detailText: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        marginVertical: 5
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        color: '#000000'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    saveButton: {
        backgroundColor: '#28A745'
    },
    deleteButton: {
        backgroundColor: '#DC3545'
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    pickerContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        marginVertical: 10
    },
    picker: {
        color: '#FFFFFF',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    pickerItem: {
        color: '#FFFFFF',
        backgroundColor: '#2A2A2A'
    },
    sectionContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10
    },
    sectionTitle: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    eventoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    icone: {
        marginRight: 10,
        fontSize: 20
    },
    detalheTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        flexShrink: 1
    },
    label: {
        fontWeight: '600',
        color: '#FFD700'
    },
    assistencia: {
        color: '#28A745',
        fontStyle: 'italic'
    },
    inputGroup: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3A3A3A',
        paddingBottom: 15,
        marginBottom: 15,
        gap: 8
    },
    addButton: {
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    detailContainer: {
        padding: 20,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    detailLabel: {
        fontWeight: 'bold',
        width: 100,
    },
});