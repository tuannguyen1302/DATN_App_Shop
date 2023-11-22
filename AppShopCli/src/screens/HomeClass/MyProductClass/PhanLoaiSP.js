import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PhanLoaiSP = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.headerText}>Phân loại sản phẩm</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default PhanLoaiSP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 70,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: '15%',
  },
  horizontalLine: {
    width: '75%',
    alignSelf: 'center',
    borderColor: '#999999',
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
