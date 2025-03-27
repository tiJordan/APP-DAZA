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
        color: '#000000',
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
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
        //  paddingVertical: 8,
        //  width: '100%',

    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        zIndex: 999,

    },
    inputFocado: {
        borderColor: '#FFD700',
        borderWidth: 2,
    },
    botaoEntrar: {
        backgroundColor: '#FFD700',
        borderWidth: 1,
        borderColor: '#000000',
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
        backgroundColor: '#1A2D5A',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
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
        color: '#000000',
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
        })
    },
    linkTextoCadastro:
    {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3,
        marginLeft: 70,
        textDecorationLine: 'none',
        fontFamily: 'Inter-SemiBold',
        ...Platform.select({
            ios: {
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000000',
            },
            android: {
                borderBottomWidth: 1.5,
                borderBottomColor: '#000000',
                paddingBottom: 2,
                textAlign: "center"
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