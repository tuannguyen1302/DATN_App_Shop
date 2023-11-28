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
    marginTop: '14%',
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

const StaticStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#F6F6F6',
  },
  mainContainer: {
    height: 120,
    backgroundColor: '#D9E1FF',
    borderRadius: 10,
    marginHorizontal: '3%',
    marginTop: '5%',
    padding: '2%',
    elevation: 2,
    marginBottom: '2%',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 28,
    backgroundColor: '#262626',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 105,
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  valueContainer: {
    width: '30%',
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
    marginVertical: '2%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  availabilityDropdown: {
    height: 30,
    backgroundColor: '#262626',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 100,
  },
  itemContainer: {
    height: 100,
    marginVertical: '2%',
    padding: '2%',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: '25%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
    width: '50%',
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
  quantityContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: '5%',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  productListContainer: {
    marginHorizontal: '5%',
    flex: 1,
    marginTop: '2%',
  },
  productList: {
    marginTop: '2%',
  },
});

export {InvenStyle, StaticStyle};
