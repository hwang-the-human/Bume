import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import {setUserId} from '../../redux/vendorReducer';

function mapStateToProps(state) {
  return {
    consumer: state.consumerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: (id) => dispatch(setUserId(id)),
  };
}

function ProfileView(props) {
  const consumer = props.consumer.values;
  function handleFavorites() {
    props.navigation.navigate('FavoriteView');
  }
  function handlePayment() {}
  function handleSupport() {}
  function handleSettings() {}
  function handleLogOut() {
    props.setUserId('');
  }

  const myCustomShare = async () => {
    const shareOptions = {
      message:
        'Order your next meal from Bume App! A convenient way to to interact with street vendors',
      //url: files.appLogo,
      // urls: [files.image1, files.image2]
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <SafeAreaView style={styles.profile}>
      <StatusBar barStyle="light-content" />

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: consumer.image,
            }}
            size={80}
          />

          <View style={{marginLeft: 20, width: 270}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Title
                style={[
                  styles.title,
                  {
                    color: '#f5f5f5',
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {consumer.name} {consumer.surname}
              </Title>
              <View>
                <Icon.Button
                  name="account-edit"
                  size={25}
                  backgroundColor={'#111015'}
                  color={'#fff'}
                  onPress={() => props.navigation.navigate('EditProfileScreen')}
                />
              </View>
            </View>

            <Caption
              style={
                (styles.caption,
                {
                  color: '#f5f5f5',
                })
              }>
              @j_doe
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" color="#a9a9a9" size={20} />
          <Text style={{color: '#a9a9a9', marginLeft: 20}}>229-564-8956</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#a9a9a9" size={20} />
          <Text style={{color: '#a9a9a9', marginLeft: 20}}>
            john_doe@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#663399',
              borderRightWidth: 1,
            },
          ]}>
          <Title style={{color: '#f5f5f5'}}>$140.50</Title>
          <Caption style={{color: '#f5f5f5'}}>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{color: '#f5f5f5'}}>12</Title>
          <Caption style={{color: '#f5f5f5'}}>Orders</Caption>
        </View>
      </View>

      <ScrollView style={styles.menuWrapper}>
        <TouchableRipple onPress={handleFavorites}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handlePayment}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSupport}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSettings}>
          <View style={styles.menuItem}>
            <Icon name="account-settings" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleLogOut}>
          <View style={styles.menuItem}>
            <Logout name="log-out" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
        </TouchableRipple>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#111015',
    //alignItems: 'center',
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#663399',
    borderBottomWidth: 1,
    borderTopColor: '#663399',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#f5f5f5',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  bottomContainer: {
    backgroundColor: 'black',
    padding: 16,
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
