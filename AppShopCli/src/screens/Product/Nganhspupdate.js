import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Nganhsp = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const click = category => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  const renderIcon = category => {
    if (selectedCategory === category) {
      return <FontAwesome name="check-circle" size={20} color="green" />;
    } else {
      return <FontAwesome name="circle" size={20} color="black" />;
    }
  };
  const { destinationScreen } = route.params || {};
  const handleDone = () => {
    if (selectedCategory) {

      // const isAddScreen = destinationScreen === 'AddProduct';

      // if (isAddScreen) {
      //   navigation.navigate('AddProduct', { selectedCategory });
      // } else {
      //   navigation.navigate('UpdateProduct', { selectedCategory });
      // }
      navigation.navigate('UpdateProduct', { selectedCategory });

    } else {
      Alert.alert(
        'Cảnh báo',
        'Vui lòng chọn một danh mục trước khi nhấn "Xong"',
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEE',
              borderRadius: 15,
            }}>
            <AntDesign name="left" size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Ngành Sản Phẩm</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />

      <TouchableOpacity
        style={[styles.form, selectedCategory === 'Áo' && styles.selectedText]}
        onPress={() => click('Áo')}>
        <Text style={styles.textfrom}>Áo</Text>
        <View style={styles.icon}>{renderIcon('Áo')}</View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.form,
          selectedCategory === 'Quần' && styles.selectedText,
        ]}
        onPress={() => click('Quần')}>
        <Text style={styles.textfrom}>Quần</Text>
        <View style={styles.icon}>{renderIcon('Quần')}</View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.form, selectedCategory === 'Mũ' && styles.selectedText]}
        onPress={() => click('Mũ')}>
        <Text style={styles.textfrom}>Mũ</Text>
        <View style={styles.icon}>{renderIcon('Mũ')}</View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.form,
          selectedCategory === 'Trang sức' && styles.selectedText,
        ]}
        onPress={() => click('Trang sức')}>
        <Text style={styles.textfrom}>Trang sức </Text>
        <View style={styles.icon}>{renderIcon('Trang sức')}</View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.form, selectedCategory === 'Túi' && styles.selectedText]}
        onPress={() => click('Túi')}>
        <Text style={styles.textfrom}>Túi</Text>
        <View style={styles.icon}>{renderIcon('Túi')}</View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.form,
          selectedCategory === 'Đồng Hồ' && styles.selectedText,
        ]}
        onPress={() => click('Đồng Hồ')}>
        <Text style={styles.textfrom}>Đồng Hồ </Text>
        <View style={styles.icon}>{renderIcon('Đồng Hồ')}</View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.form,
          selectedCategory === 'Nước Hoa' && styles.selectedText,
        ]}
        onPress={() => click('Nước Hoa')}>
        <Text style={styles.textfrom}>Nước Hoa </Text>
        <View style={styles.icon}>{renderIcon('Nước Hoa')}</View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.form,
          selectedCategory === 'Giầy' && styles.selectedText,
        ]}
        onPress={() => click('Giầy')}>
        <Text style={styles.textfrom}>Giầy </Text>
        <View style={styles.icon}>{renderIcon('Giầy')}</View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Nganhsp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 70,
    justifyContent: 'space-around',
    //backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
  },
  headerText: {
    fontSize: 30,
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
  form: {
    justifyContent: 'space-between',
    height: 50,
    width: 360, // Ví dụ: 40 là tổng khoảng cách từ cả hai bên
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15, // Đặt khoảng cách từ horizontalLine
    marginLeft: 30, // Cách trái
    marginRight: 30, // Cách phải
    flexDirection: 'row', // Đặt hướng dòng là dọc để cách đều trên và dưới
    alignItems: 'center', // Đặt căn chỉnh theo trục ngang để căn giữa
    borderColor: '#000000',
  },
  selectedText: {
    borderColor: 'red', // Màu viền khi được chọn
    borderWidth: 1, // Độ rộng viền khi được chọn
  },
  textfrom: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 29,
  },
  footer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    flex: 1, // Sử dụng flex để nút chiếm hết chiều rộng của footer
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 29, // Cách trái
    marginRight: 29, // Cách phải
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
    color: '#000000',
  },
  icon: {
    marginRight: 10,
  },
});
