import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const GetStart2 = () => {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Login1');
  };

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Image source={require('../../assets/anh1.jpg')} style={styles.anh1} />
      </View>
      <View>
        <Image source={require('../../assets/mhc2.jpg')} style={styles.anh2} />
      </View>
      <View style={styles.view3}>
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Post what you want to sell
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStart2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  view1: {
    alignSelf: 'flex-end',
    marginTop: 67,
    marginRight: 20,
    marginBottom: 30,
  },
  anh1: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  anh2: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  view3: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 270,
    height: 105,
    marginBottom: 50,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    height: 60,
    width: 335,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
});
