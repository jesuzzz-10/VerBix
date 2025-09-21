// app/index.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// Importa tu usecase y repositorio
import { FirebaseUserDatasource } from '../src/data/datasources/FirebaseUserDatasource';
import { FirebaseUserRepository } from '../src/data/repositories/FirebaseUserRepository';
import { LoginUser } from '../src/domain/usecases/LoginUser';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Instanciamos datasource, repositorio y usecase
  const datasource = new FirebaseUserDatasource();
  const repository = new FirebaseUserRepository(datasource);
  const loginUser = new LoginUser(repository);

  const handleLogin = async () => {
    const result = await loginUser.execute(email, password);

    if (result.success && result.user) {
      router.push('/(tabs)/comida'); // Si login OK, va a tabs
    } else {
      Alert.alert('Error', result.error || 'No se pudo iniciar sesión');
    }
  };

  const goToRegister = () => {
    router.push('/Register'); // Redirige a pantalla de registro
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">¡Bienvenido!</ThemedText>
      <ThemedText>Ingresa tus credenciales para continuar</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="link">Ingresar</ThemedText>
      </TouchableOpacity>

      <ThemedText style={{ marginTop: 20 }}>¿No tienes una cuenta?</ThemedText>
      <TouchableOpacity style={styles.registerButton} onPress={goToRegister}>
        <ThemedText type="link">Registrarse</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginTop: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
});
