import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111015" />
      <Text style={styles.logo}>B&#250;me</Text>
      <View style={styles.inputsBox}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#707070"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}></TextInput>

        <TextInput
          placeholder="Password"
          placeholderTextColor="#707070"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}></TextInput>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.subText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={styles.signUpText}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111015',
  },

  logo: {
    alignSelf: 'center',
    flexDirection: 'row',
    color: '#642D86',
    fontSize: 70,
    top: 150,
    fontWeight: '700',
    // fontFamily: "Urbane Rounded Heavy",
  },

  inputsBox: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  input: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#642D86',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    color: 'white',
    paddingLeft: 16,
  },

  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#642D86',
    borderRadius: 10,
  },

  signInText: {
    color: 'white', 
    fontWeight: '600'},

  textBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    bottom: 60,
  },

  subText: {
    color: '#707070',
  },

  signUpText: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
