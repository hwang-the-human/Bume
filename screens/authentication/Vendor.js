import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Vendor({navigation}) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [ssn, setSsn] = useState('');
  const [date, setDate] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputsBox}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#707070"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}></TextInput>

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#707070"
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}></TextInput>

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#707070"
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}></TextInput>

        <View style={styles.passwordsBox}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#707070"
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => setPassword(text)}></TextInput>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#707070"
            style={styles.passwordInput}
            value={confPassword}
            onChangeText={(text) => setConfPassword(text)}></TextInput>
        </View>
        <TextInput
          placeholder="SSN"
          placeholderTextColor="#707070"
          style={styles.input}
          value={ssn}
          onChangeText={(text) => setSsn(text)}></TextInput>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signInText}>Sign Up</Text>
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

  passwordsBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 300,
  },

  passwordInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#642D86',
    height: 50,
    width: 145,
    borderRadius: 10,
    marginBottom: 30,
    color: 'white',
    paddingLeft: 16,
  },

  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#642D86',
    borderRadius: 10,
  },

  signInText: {color: 'white', fontWeight: '600'},
});
