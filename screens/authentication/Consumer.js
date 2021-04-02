import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import uuid from 'react-uuid';
import PhotoIcon from 'react-native-vector-icons/MaterialIcons';
import {StackActions} from '@react-navigation/native';

export default function Consumer(props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const reference = storage().ref(uuid());
    await reference.putFile(image.uri);
    const imageURL = await reference.getDownloadURL();

    const newConsumer = {
      name: firstName,
      surname: lastName,
      password: password,
      email: email,
      phone: phone,
      image: imageURL,
    };
    const newReference = database().ref('users/consumers/').push();
    newReference.set(newConsumer).then(() => {
      alert('You have just registered!');
      setLoading(false);
      props.navigation.dispatch(StackActions.popToTop());
    });
  }

  function handleChooseImage() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        ImageResizer.createResizedImage(
          image.sourceURL,
          400,
          400,
          'PNG',
          100,
          0,
          null,
        )
          .then((response) => {
            setImage(response);
          })
          .catch((err) => {
            console.log('ERROR RESIZING IMAGE: ', err);
          });
      })
      .catch((error) => {
        console.log('ERROR OPEN IMAGE LIBRARY: ', error);
      });
  }

  async function deleteImage() {
    const reference = storage().refFromURL(
      'https://firebasestorage.googleapis.com/v0/b/bume-307515.appspot.com/o/IMG_0004.JPG?alt=media&token=7b46b02c-c566-4dd6-a4fb-3bd034caa9be',
    );
    await reference.delete();
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputsBox}>
        <TouchableOpacity style={styles.imageBox} onPress={handleChooseImage}>
          {image.path ? (
            <Image
              style={styles.image}
              source={{
                uri: image.path,
              }}
            />
          ) : (
            <PhotoIcon name="add-a-photo" size={80} color={'white'} />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#707070"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#707070"
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#707070"
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <View style={styles.passwordsBox}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#707070"
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#707070"
            style={styles.passwordInput}
            value={confPassword}
            onChangeText={(text) => setConfPassword(text)}
          />
        </View>

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#707070"
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
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

  signInText: {
    color: 'white',
    fontWeight: '600',
  },

  imageBox: {
    backgroundColor: '#642D86',
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 130,
  },

  image: {
    height: '100%',
    width: '100%',
    borderRadius: 130,
  },

  loadingScreen: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
