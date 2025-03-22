// Css_login.js
import { StyleSheet, Platform } from 'react-native';

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '70',
        marginTop: Platform.OS === 'ios' ? 60 : 40,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2D5A',
        textAlign: 'center',
        marginVertical: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingVertical: 270,
        paddingBottom: '260',
        marginBottom: Platform.OS === 'ios' ? 80 : 60,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#1A2D5A',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
    },
    inputFocado: {
        borderColor: '#1A2D5A',
        borderWidth: 2,
    },
    botaoEntrar: {
        backgroundColor: '#1A2D5A',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 40,
    },
    linkTexto: {
        color: '#1A2D5A',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3,
        textDecorationLine: 'none',
        position: 'relative',
        fontFamily: 'Inter-SemiBold',
        ...Platform.select({
            ios: {
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#1A2D5A',
            },
            android: {
                borderBottomWidth: 1.5,
                borderBottomColor: '#1A2D5A',
                paddingBottom: 2,
            },
        }),
    },
    botaoCadastrar: {
        backgroundColor: '#28a745', // Verde para diferenciar
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
            android: { elevation: 3 },
        }),
    },
});