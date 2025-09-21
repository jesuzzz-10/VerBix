// app/Register.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { FirebaseUserDatasource } from '../src/data/datasources/FirebaseUserDatasource';
import { FirebaseUserRepository } from '../src/data/repositories/FirebaseUserRepository';
import { RegisterUser } from '../src/domain/usecases/RegisterUser';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const datasource = new FirebaseUserDatasource();
  const repository = new FirebaseUserRepository(datasource);
  const registerUser = new RegisterUser(repository);

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg('');

    const result = await registerUser.execute(email, password, name);

    setLoading(false);

    if (result.success && result.user) {
      // Redirige a la app con las tabs
      router.push('/(tabs)/comida');
    } else {
      setErrorMsg(result.error || 'Ocurrió un error al registrar');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Registro</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMsg ? <ThemedText type="default">{errorMsg}</ThemedText> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText type="link">Registrarse</ThemedText>
        )}
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    alignItems: 'center',
  },
});
