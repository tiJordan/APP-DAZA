// Home.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform
} from 'react-native';
import { loginStyles } from '../assets/css/Css_login';

const Home = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [inputFocado, setInputFocado] = useState(null);

    const handleLogin = () => {
        // Lógica de login aqui
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
                        style={loginStyles.botaoEntrar}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={loginStyles.textoBotao}>ENTRAR</Text>
                    </TouchableOpacity>

                    {/* Links */}
                    <View style={loginStyles.linksContainer}>
                        <TouchableOpacity>
                            <Text style={loginStyles.linkTexto}>Esqueci a senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={loginStyles.linkTexto}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Home;