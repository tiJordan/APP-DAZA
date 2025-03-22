// Home.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform,
    ActivityIndicator
} from 'react-native';
import { loginStyles } from '../assets/css/Css_login';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [inputFocado, setInputFocado] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    //const handleLogin = () => {
    //   navigation.navigate('MainApp')
    //};

    const handleLoginSimulado = () => {
        useEffect(() => {
            if (navigation) {
                console.log('Rotas disponíveis:', navigation.getState().routeNames);
            }
        }, [navigation]);

        if (__DEV__) { // Apenas para ambiente de desenvolvimento
            console.log('Navegando para:', navigation.getState());
        }
        
        setIsLoading(true);
        // Simula delay de API
        setTimeout(() => {
            setIsLoading(false);
            if (usuario.toLowerCase() === 'admin' && senha === '1234') { // Credenciais teste
                navigation.navigate('MainApp');
            } else {
                Alert.alert('Erro', 'Credenciais inválidas!');
            }
            // Verificação simples para demonstração
            if (usuario && senha) {
                navigation.navigate('MainApp');
            } else {
                Alert.alert('Erro', 'Preencha todos os campos!');
            }
        }, 1500);
    };

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
                <View style={loginStyles.formContainer}>
                    <Text style={loginStyles.titulo}>FAÇA SEU LOGIN</Text>

                    {/* Campo Usuário */}
                    <View style={loginStyles.inputContainer}>
                        <Text style={loginStyles.label}>Usuário:</Text>
                        <TextInput
                            style={[
                                loginStyles.input,
                                inputFocado === 'usuario' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite seu usuário"
                            placeholderTextColor="#666"
                            value={usuario}
                            onChangeText={setUsuario}
                            onFocus={() => setInputFocado('usuario')}
                            onBlur={() => setInputFocado(null)}
                        />
                    </View>

                    {/* Campo Senha */}
                    <View style={loginStyles.inputContainer}>
                        <Text style={loginStyles.label}>Senha:</Text>
                        <TextInput
                            style={[
                                loginStyles.input,
                                inputFocado === 'senha' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                            onFocus={() => setInputFocado('senha')}
                            onBlur={() => setInputFocado(null)}
                        />
                    </View>

                    {/* Botão Entrar */}
                    <TouchableOpacity
                        style={[loginStyles.botaoEntrar,
                        isLoading && { backgroundColor: '1a2d5a90' }
                        ]}
                        onPress={handleLoginSimulado}
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
            </ImageBackground>
        </View>
    );
};

export default Home;