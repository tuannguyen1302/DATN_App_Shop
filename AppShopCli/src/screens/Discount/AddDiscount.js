import React, {useRef, useState} from 'react';
import {
  Text,
  ToastAndroid,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {API_BASE_URL, DISCOUNT_API} from '../../config/urls';
import {apiPost} from '../../utils/utils';
import {useSelector} from 'react-redux';

const APPLY_OPTIONS = [
  {id: 0, name: 'Tất cả sản phẩm'},
  {id: 1, name: 'Chọn sản phẩm'},
];

const SALE_OPTIONS = [
  {id: 0, name: 'Phần trăm'},
  {id: 1, name: 'Giá tiền'},
];

const renderTextInput = (
  label,
  value,
  field,
  keyboardType = 'default',
  handleTextChange,
  multiline,
  icon,
) => {
  return (
    <TextInput
      label={label}
      value={value}
      multiline={multiline}
      style={styles.input}
      keyboardType={keyboardType}
      onChangeText={text => handleTextChange(text, field)}
      left={
        <TextInput.Icon icon={() => <FontAwesome name={icon} size={24} />} />
      }
    />
  );
};

const AddDiscount = ({navigation}) => {
  const productList = useSelector(state => state?.product?.productData?.all);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isStartDate, setStartDate] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const [selectedApplyOption, setSelectedApplyOption] = useState(
    APPLY_OPTIONS[0],
  );
  const [selectedSaleOption, setSelectedSaleOption] = useState(SALE_OPTIONS[0]);

  const [discountData, setDiscountData] = useState({
    name: '',
    des: '',
    code: '',
    type: 'percentage',
    value: '0',
    uses_count: '0',
    min_order_value: '900000', // Số tiền giảm tối đa là 900,000 VND
    max_uses: '1', // Số lượng sử dụng là 1
    max_uses_per_user: '1', // Giới hạn sử dụng từ 1 - 3
    applies_to: 'all',
    start_date: '',
    end_date: '',
    product_ids: [],
  });

  const handleDropdownChange = (value, field) => {
    value.id !== 0 && bottomSheetModalRef.current?.present();
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
    let newValue = text;

    // Giới hạn giá trị nhập trong khoảng từ 0 đến 100
    if (field === 'value') {
      const numericValue = parseInt(text, 10);
      if (!isNaN(numericValue)) {
        newValue = Math.max(0, Math.min(100, numericValue)).toString();
      }
    }

    if (field === 'min_order_value') {
      const numericValue = parseInt(text, 10);
      if (!isNaN(numericValue)) {
        newValue = Math.max(0, Math.min(999999, numericValue)).toString();
      }
    }

    if (field === 'max_uses') {
      const numericValue = parseInt(text, 10);
      if (!isNaN(numericValue)) {
        newValue = Math.max(0, Math.min(1000, numericValue)).toString();
      }
    }

    if (field === 'max_uses_per_user') {
      const numericValue = parseInt(text, 10);
      if (!isNaN(numericValue)) {
        newValue = Math.max(0, Math.min(3, numericValue)).toString();
      }
    }

    setDiscountData({...discountData, [field]: newValue});
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
        discountData.applies_to == 'specific' &&
        discountData.product_ids.length == 0
      ) {
        ToastAndroid.show(
          'Vui lòng chọn sản phẩm khuyến mãi',
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
      navigation.goBack();
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Pressable
          style={{flex: 1}}
          onPress={() => bottomSheetModalRef.current?.close()}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <AntDesign name="left" size={20} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Add Discount</Text>
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
            {renderTextInput(
              'Tên chương trình',
              discountData['name'],
              'name',
              'default',
              handleTextChange,
              false,
              'bullhorn',
            )}
            {renderTextInput(
              'Mô tả',
              discountData['des'],
              'des',
              'default',
              handleTextChange,
              true,
              'edit',
            )}
            {renderTextInput(
              'Mã giảm giá',
              discountData['code'],
              'code',
              'default',
              handleTextChange,
              false,
              'barcode',
            )}
            {discountData.type === 'percentage' &&
              renderTextInput(
                'Phần trăm giảm',
                discountData['value'],
                'value',
                'numeric',
                handleTextChange,
                false,
                'pagelines',
              )}
            {renderTextInput(
              'Số tiền giảm tối đa (VND)',
              discountData['min_order_value'],
              'min_order_value',
              'numeric',
              handleTextChange,
              false,
              'money',
            )}
            {renderTextInput(
              'Số lượng sử dụng',
              discountData['max_uses'],
              'max_uses',
              'numeric',
              handleTextChange,
              false,
              'user',
            )}
            {renderTextInput(
              'Giới hạn sử dụng (1 - 3)',
              discountData['max_uses_per_user'],
              'max_uses_per_user',
              'numeric',
              handleTextChange,
              false,
              'ban',
            )}
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
          </ScrollView>
        </Pressable>
        <TouchableOpacity
          onPress={postDiscountApi}
          style={{
            width: 55,
            position: 'absolute',
            bottom: '3%',
            height: 55,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            right: 0,
            marginHorizontal: '5%',
          }}>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>
            Save
          </Text>
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['25%', '50%', '100%']}
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
                      ? 'red'
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
                      {item?.product_price.toLocaleString().replace(/,/g, '.')}{' '}
                      VND
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </BottomSheetModal>
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
    padding: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    left: 10,
  },
  contentContainer: {
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
