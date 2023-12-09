import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
const CategoryItem = ({category, isSelected, onPress}) => (
  <TouchableOpacity
    style={[styles.categoryContainer, isSelected && styles.selectedCategory]}
    onPress={onPress}>
    <Text style={styles.categoryText}>{category}</Text>
    <FontAwesome
      name={isSelected ? 'check-circle' : 'circle'}
      size={20}
      color={isSelected ? 'green' : 'black'}
    />
  </TouchableOpacity>
);

const Nganhsp = ({navigation, route}) => {
  const typeProduct = useSelector(state => state?.product?.typeData);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [id, setid] = useState(null);
  const {buil} = route.params || {};
  console.log(buil);
  const handleCategoryPress = (category, categoryId) => {
    setid(categoryId);
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  const handleDone = () => {
    if (selectedCategory && id) {
      navigation.navigate('AddProduct', {selectedCategory, id, buil});
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
      <View style={styles.horizontalLine} />

      {typeProduct.map(category => (
        <CategoryItem
          key={category._id}
          category={category.category_name}
          isSelected={selectedCategory === category.category_name}
          onPress={() =>
            handleCategoryPress(category.category_name, category._id)
          }
        />
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: 10,
  },
  headerText: {
    left: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  horizontalLine: {
    width: '75%',
    alignSelf: 'center',
    borderColor: '#999999',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  selectedCategory: {
    borderColor: 'red',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
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
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: '5%',
    marginRight: '5%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 25,
    color: '#FFFFFF',
  },
});

export default Nganhsp;
