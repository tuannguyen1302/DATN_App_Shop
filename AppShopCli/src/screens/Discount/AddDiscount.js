import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  ToastAndroid,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {API_BASE_URL, DISCOUNT_API, PRODUCT_API} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';

const APPLY_OPTIONS = [
  {id: 0, name: 'Tất cả sản phẩm'},
  {id: 1, name: 'Chọn sản phẩm'},
];

const SALE_OPTIONS = [
  {id: 0, name: 'Phần trăm '},
  {id: 1, name: 'Giá tiền'},
];

const AddDiscount = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isStartDate, setStartDate] = useState(null);
  const bottomSheetModalRef = useRef(null);

  const [discountData, setDiscountData] = useState({
    name: '',
    des: '',
    code: '',
    type: '',
    value: '0',
    uses_count: '0',
    min_order_value: '0',
    max_uses: '0',
    max_uses_per_user: '0',
    applies_to: '',
    start_date: '',
    end_date: '',
    product_ids: [],
  });

  const [selectedApplyOption, setSelectedApplyOption] = useState();
  const [selectedSaleOption, setSelectedSaleOption] = useState();

  const handleDropdownChange = (value, field) => {
    value.id !== 0 && presentBottomSheet();
    setSelectedApplyOption(value);
    setDiscountData({
      ...discountData,
      [field]: value.id === 0 ? 'all' : 'specific',
    });
  };

  const handleSaleOptionChange = (value, field) => {
    setSelectedSaleOption(value);
    setDiscountData({
      ...discountData,
      [field]: value.id === 0 ? 'percentage' : 'fixed_amount',
    });
  };

  const handleTextChange = (text, field) => {
    setDiscountData({...discountData, [field]: text});
  };

  const presentBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const postDiscountApi = async () => {
    try {
      if (!isDataValid()) {
        ToastAndroid.show(
          'Vui lòng điền đầy đủ thông tin và giá trị hợp lệ.',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (
        new Date(discountData.start_date) >= new Date(discountData.end_date)
      ) {
        ToastAndroid.show(
          'Ngày bắt đầu phải trước ngày kết thúc.',
          ToastAndroid.SHORT,
        );
        return;
      }

      await apiPost(DISCOUNT_API, discountData);
      ToastAndroid.show('Thêm thành công', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const isDataValid = () => {
    return (
      discountData.name &&
      discountData.code &&
      discountData.value > 0 &&
      discountData.min_order_value > 0 &&
      discountData.max_uses > 0 &&
      discountData.max_uses_per_user > 0
    );
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${PRODUCT_API}/getAllProductByShop/con_hang`);
      setProductList(res?.message);
    } catch (error) {
      console.log('Call api: ', error.response.data);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={30}
            color={'#FFF'}
          />
          <Text style={styles.headerText}>Thêm Giảm Giá</Text>
          <AntDesign
            onPress={postDiscountApi}
            name="check"
            size={30}
            color={'#FFF'}
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.label}>Áp dụng</Text>
          <Dropdown
            placeholder="Chọn loại áp dụng"
            data={APPLY_OPTIONS}
            labelField="name"
            valueField="id"
            style={styles.dropdown}
            value={selectedApplyOption}
            onChange={value => handleDropdownChange(value, 'applies_to')}
          />
          <Text style={styles.label}>Giảm</Text>
          <Dropdown
            placeholder="Chọn loại giảm giá"
            data={SALE_OPTIONS}
            labelField="name"
            valueField="id"
            style={styles.dropdown}
            value={selectedSaleOption}
            onChange={value => handleSaleOptionChange(value, 'type')}
          />
          <TextInput
            label="Tên chương trình"
            value={discountData['name']}
            style={styles.input}
            onChangeText={text => handleTextChange(text, 'name')}
            left={
              <TextInput.Icon
                icon={() => <FontAwesome name="bullhorn" size={24} />}
              />
            }
          />
          <TextInput
            label="Mô tả"
            value={discountData['des']}
            multiline={true}
            onChangeText={text => handleTextChange(text, 'des')}
            style={styles.input}
            left={
              <TextInput.Icon
                icon={() => <AntDesign name="form" size={24} />}
              />
            }
          />
          <TextInput
            label="Mã giảm giá"
            value={discountData['code']}
            style={styles.input}
            onChangeText={text => handleTextChange(text, 'code')}
            left={
              <TextInput.Icon
                icon={() => <FontAwesome name="barcode" size={24} />}
              />
            }
          />
          {discountData.type == 'percentage' && (
            <TextInput
              label={'Phần trăm giảm'}
              value={discountData['value']}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={text => handleTextChange(text, 'value')}
              left={
                <TextInput.Icon
                  icon={() => <FontAwesome name="percent" size={24} />}
                />
              }
              theme={{
                colors: {
                  primary: 'black',
                },
              }}
            />
          )}
          <TextInput
            label="Số tiền giảm tối đa"
            value={discountData['min_order_value']}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => handleTextChange(text, 'min_order_value')}
            left={
              <TextInput.Icon
                icon={() => <FontAwesome name="money" size={24} />}
              />
            }
          />
          <TextInput
            label="Số lượng sử dụng"
            value={discountData['max_uses']}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => handleTextChange(text, 'max_uses')}
            left={
              <TextInput.Icon
                icon={() => <AntDesign name="codesquareo" size={24} />}
              />
            }
          />
          <TextInput
            label="Giới hạn sử dụng"
            value={discountData['max_uses_per_user']}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => handleTextChange(text, 'max_uses_per_user')}
            left={
              <TextInput.Icon
                icon={() => <FontAwesome name="linode" size={24} />}
              />
            }
          />
          <TextInput
            label="Ngày bắt đầu"
            editable={false}
            style={styles.input}
            value={discountData['start_date'] + ''}
            left={
              <TextInput.Icon
                onPress={() => {
                  setStartDate(true), setDatePickerOpen(true);
                }}
                icon={() => <Fontisto name="date" size={24} />}
              />
            }
          />
          <TextInput
            label="Ngày kết thúc"
            value={discountData['end_date'] + ''}
            editable={false}
            style={styles.input}
            left={
              <TextInput.Icon
                onPress={() => {
                  setStartDate(false), setDatePickerOpen(true);
                }}
                icon={() => <Fontisto name="date" size={24} />}
              />
            }
          />
          <DatePicker
            title={`Thời gian ${isStartDate ? 'bắt đầu' : 'kết thúc'}`}
            mode="datetime"
            modal
            open={isDatePickerOpen}
            date={new Date()}
            confirmText="Xác nhận"
            onConfirm={date => {
              setDiscountData({
                ...discountData,
                [isStartDate ? 'start_date' : 'end_date']: date,
              });
              setDatePickerOpen(false);
            }}
            cancelText="Hủy"
            onCancel={() => setDatePickerOpen(false)}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={['25%', '50%']}
            backgroundStyle={{
              borderRadius: 25,
              borderWidth: 0.5,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: '1%',
                }}>
                Chọn sản phẩm
              </Text>
              <FlatList
                data={productList}
                keyExtractor={item => item?._id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (!discountData?.product_ids.includes(item?._id)) {
                        setDiscountData(prevData => ({
                          ...prevData,
                          product_ids: [...prevData.product_ids, item?._id],
                        }));
                      } else {
                        setDiscountData(prevData => ({
                          ...prevData,
                          product_ids: prevData.product_ids.filter(
                            id => id !== item?._id,
                          ),
                        }));
                      }
                    }}
                    style={{
                      height: 60,
                      borderWidth: 1,
                      borderColor: discountData?.product_ids.includes(item?._id)
                        ? 'blue'
                        : 'gray',
                      marginHorizontal: '5%',
                      marginTop: '2%',
                      borderRadius: 10,
                      alignItems: 'center',
                      padding: '2%',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 5}}
                      source={{
                        uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`,
                      }}
                    />
                    <View style={{left: 5}}>
                      <Text style={styles.productName} numberOfLines={1}>
                        {item?.product_name}
                      </Text>
                      <Text style={styles.productPrice}>
                        Giá:{' '}
                        {item?.product_price
                          .toLocaleString()
                          .replace(/,/g, '.')}{' '}
                        VND
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </BottomSheetModal>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#9999FF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    marginVertical: 8,
    color: 'black',
  },
  productName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    width: 200,
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
  },
});

export default AddDiscount;
