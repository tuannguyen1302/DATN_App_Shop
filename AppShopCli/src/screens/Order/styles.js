import {StyleSheet} from 'react-native';

const OrderScrStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    elevation: 3,
    height: 120,
    padding: '2%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
    width: '55%',
  },
  productName: {
    fontSize: 19,
    margin: '2%',
    color: 'black',
    fontWeight: '600',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  quantityAndStatus: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quantityBadge: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  statusBadge: {
    width: 70,
    height: 25,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
  },
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
    alignSelf: 'center',
  },
});

const OrderHisStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#A4D3EE',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    padding: 10,
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  button: {
    height: 50,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export {OrderScrStyle, OrderHisStyle};
