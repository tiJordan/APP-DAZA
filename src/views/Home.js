// Home.js
import { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { loginStyles } from '../assets/css/Css_login';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';


// Configurar axios
const api = axios.create({
    baseURL: 'http://192.168.0.141:3008/api' // Altere para seu IP em desenvolvimento mobile
});

const Home = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const usuarioRef = useRef(null);
    const senhaRef = useRef(null);
    const [inputFocado, setInputFocado] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();


    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await api.post('/auth/login', {
                nome: usuario, // 👈 Certifique-se que "usuario" é o email
                senha
            });

            await AsyncStorage.setItem('@token', response.data.token);
            navigation.navigate('MainApp');

        } catch (error) {
            console.log('Erro detalhado:', error.response?.data || error.message); // 👈 Log completo
            Alert.alert('Erro', error.response?.data?.message || 'Falha na conexão');
        } finally {
            setIsLoading(false);
        }
    };

    // Adicionar interceptor para o token
    api.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return (
        <View style={loginStyles.container}>
            <ImageBackground
                source={require('../assets/img/background.png')}
                style={loginStyles.backgroundImage}
            >
                {/* Logo */}
                <View style={loginStyles.logoContainer}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        resizeMode="contain"
                        style={{ width: 200, height: 200 }}
                    />
                </View>

                {/* Formulário */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <View style={loginStyles.formContainer}>
                        <Text style={loginStyles.titulo}>FAÇA SEU LOGIN</Text>

                        {/* Campo Usuário */}
                        <View style={loginStyles.inputContainer}>
                            <TouchableWithoutFeedback
                                onPress={() => usuarioRef.current?.focus()}

                            >
                                <Text style={loginStyles.label}>Usuário:</Text>
                            </TouchableWithoutFeedback>

                            <TextInput
                                ref={usuarioRef}
                                style={[
                                    loginStyles.input,
                                    inputFocado === 'usuario' && loginStyles.inputFocado
                                ]}

                                placeholder="Digite seu nome de usuário"
                                returnKeyType="next"
                                onSubmitEditing={() => senhaRef.current.focus()}
                                placeholderTextColor="#666"
                                value={usuario}
                                onChangeText={setUsuario}
                                onFocus={() => setInputFocado('usuario')}
                                onBlur={() => setInputFocado(null)}
                                enablesReturnKeyAutomatically={true}
                            />

                        </View>

                        {/* Campo Senha */}
                        <View style={loginStyles.inputContainer}>
                            <TextInput
                                ref={senhaRef}
                                style={[
                                    loginStyles.input,
                                    inputFocado === 'senha' && loginStyles.inputFocado
                                ]}
                                returnKeyType="go"
                                onSubmitEditing={handleLogin}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#666"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                onFocus={() => setInputFocado('senha')}
                                submitBehavior="blurAndSubmit"
                                onBlur={() => setInputFocado(null)}
                            />
                        </View>

                        {/* Botão Entrar */}
                        <TouchableOpacity
                            style={[loginStyles.botaoEntrar,
                            isLoading && { backgroundColor: '#1a2d5a90' }
                            ]}
                            onPress={handleLogin}
                            //activeOpacity={0.8}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={"#FFF"} /> // Ícone de Loading
                            ) : (
                                <Text style={loginStyles.textoBotao}>ENTRAR</Text>
                            )}

                        </TouchableOpacity>

                        {/* Links */}
                        <View style={loginStyles.linksContainer}>
                            <TouchableOpacity>
                                <Text style={loginStyles.linkTexto}>Esqueci a senha</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>

                                <Text style={loginStyles.linkTexto}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
            </ImageBackground >
        </View >
    );
};

export default Home;