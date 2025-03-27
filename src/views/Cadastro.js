import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert, TouchableWithoutFeedback } from 'react-native';
import { loginStyles } from '../assets/css/Css_login';
import axios from 'axios';
import { useRef } from 'react';

const api = axios.create({ baseURL: 'http://192.168.0.141:3008/api' });

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [inputFocado, setInputFocado] = useState(null);
    const usuarioRef = useRef(null);
    const senhaRef = useRef(null);
    const emailRef = useRef(null);

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

                        <TouchableWithoutFeedback
                            onPress={() => usuarioRef.current?.focus()}
                        >
                            <Text style={loginStyles.label}>Nome:</Text>
                        </TouchableWithoutFeedback>

                        <TextInput
                            ref={usuarioRef}
                            style={[
                                loginStyles.input,
                                inputFocado === 'nome' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite seu nome completo"
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef.current.focus()}
                            placeholderTextColor="#666"
                            value={nome}
                            onChangeText={setNome}
                            onFocus={() => setInputFocado('nome')}
                            onBlur={() => setInputFocado(null)}
                            enablesReturnKeyAutomatically={true}
                        />
                    </View>

                    {/* Campo Email */}
                    <View style={loginStyles.inputContainer}>

                        <TouchableWithoutFeedback
                            onPress={() => emailRef.current?.focus()}
                        >
                            <Text style={loginStyles.label}>E-mail:</Text>
                        </TouchableWithoutFeedback>

                        <TextInput
                            ref={emailRef}
                            style={[
                                loginStyles.input,
                                inputFocado === 'email' && loginStyles.inputFocado
                            ]}
                            placeholder="Digite seu e-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => senhaRef.current.focus()}
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setInputFocado('email')}
                            onBlur={() => setInputFocado(null)}
                            enablesReturnKeyAutomatically={true}
                        />
                    </View>

                    {/* Campo Senha */}
                    <View style={loginStyles.inputContainer}>
                        <Text style={loginStyles.label}>Senha:</Text>
                        <TextInput
                            ref={senhaRef}
                            style={[
                                loginStyles.input,
                                inputFocado === 'senha' && loginStyles.inputFocado
                            ]}
                            returnKeyType="go"
                            placeholder="Digite sua senha segura"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                            onFocus={() => setInputFocado('senha')}
                            submitBehavior="blurAndSubmit"
                            onBlur={() => setInputFocado(null)}
                        />
                    </View>

                    {/* Botão Cadastrar */}
                    <TouchableOpacity
                        style={loginStyles.botaoEntrar}
                        onPress={async () => {
                            try {
                                const response = await api.post('/auth/register', {
                                    nome,
                                    email,
                                    senha
                                });
                                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                                navigation.goBack();
                            } catch (error) {
                                console.log('Erro completo:', error);
                                console.log('Resposta do erro:', error.response?.data);
                                Alert.alert('Erro', error.response?.data?.message || 'Erro ao Cadastrar');
                            }
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={loginStyles.textoBotao}>CRIAR CONTA</Text>
                    </TouchableOpacity>

                    {/* Link para Login */}
                    <View style={loginStyles.linksContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={loginStyles.linkTextoCadastro}>Já tem conta? Faça login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground >
        </View >
    );
};

export default Cadastro;