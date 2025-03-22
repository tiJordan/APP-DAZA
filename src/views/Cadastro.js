import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { loginStyles } from '../assets/css/Css_login';

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [inputFocado, setInputFocado] = useState(null);

    return (
        <View style={loginStyles.container}>
            <ImageBackground
                source={require('../assets/img/background.png')}
                style={loginStyles.backgroundImage}
            >
                <View style={loginStyles.logoContainer}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        resizeMode="contain"
                        style={{ width: 200, height: 100 }}
                    />
                </View>

                <View style={loginStyles.formContainer}>
                    <Text style={loginStyles.titulo}>CRIAR CONTA</Text>

                    {/* Campo Nome */}
                    <View style={loginStyles.inputContainer}>
                        <Text style={loginStyles.label}>Nome:</Text>
                        <TextInput
                            style={[
                                loginStyles.input,
                                inputFocado === 'nome' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite seu nome completo"
                            placeholderTextColor="#666"
                            value={nome}
                            onChangeText={setNome}
                            onFocus={() => setInputFocado('nome')}
                            onBlur={() => setInputFocado(null)}
                        />
                    </View>

                    {/* Campo Email */}
                    <View style={loginStyles.inputContainer}>
                        <Text style={loginStyles.label}>E-mail:</Text>
                        <TextInput
                            style={[
                                loginStyles.input,
                                inputFocado === 'email' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite seu melhor e-mail"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setInputFocado('email')}
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
                            placeholder="Crie uma senha segura"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                            onFocus={() => setInputFocado('senha')}
                            onBlur={() => setInputFocado(null)}
                        />
                    </View>

                    {/* Botão Cadastrar */}
                    <TouchableOpacity
                        style={loginStyles.botaoEntrar}
                        onPress={() => {/* Lógica de cadastro */ }}
                        activeOpacity={0.8}
                    >
                        <Text style={loginStyles.textoBotao}>CRIAR CONTA</Text>
                    </TouchableOpacity>

                    {/* Link para Login */}
                    <View style={loginStyles.linksContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={loginStyles.linkTexto}>Já tem conta? Faça login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Cadastro;