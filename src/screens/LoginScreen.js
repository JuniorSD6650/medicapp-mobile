import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { login, error } = useContext(AuthContext);

  const handleLogin = async () => {
    // Validación básica
    if (!email.trim() || !password.trim()) {
      setSnackbarMessage('Por favor ingresa tu email y contraseña');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result) {
      setSnackbarMessage(error || 'Error al iniciar sesión');
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>MedicApp</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        
        <View style={styles.formContainer}>
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)} 
              />
            }
            style={styles.input}
          />
          
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
          >
            Iniciar Sesión
          </Button>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
  },
  forgotPassword: {
    marginTop: 20,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#2196F3',
  },
});

export default LoginScreen;
