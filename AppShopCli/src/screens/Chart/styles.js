import {StyleSheet} from 'react-native';

const InvenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inventoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    padding: '2%',
    marginHorizontal: '4%',
    elevation: 5,
    marginBottom: '2%',
  },
  inventoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: '2%',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 25,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 92,
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  valueContainer: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  valueLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4%',
    marginVertical: '1%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  availabilityDropdown: {
    height: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '3%',
    width: 100,
  },
  productContainer: {
    height: 100,
    marginVertical: '2%',
    marginHorizontal: '4%',
    padding: '2%',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: 85,
    height: 85,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: '2%',
  },
  productName: {
    fontSize: 18,
    margin: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
  },
  priceText: {
    color: 'red',
  },
  quantityContainer: {
    marginHorizontal: '1%',
    alignItems: 'center',
  },
});

export default InvenStyle;
