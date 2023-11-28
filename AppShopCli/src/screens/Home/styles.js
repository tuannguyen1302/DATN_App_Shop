import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyProductStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarShop: {
    width: 60,
    height: 60,
    borderColor: 'green',
    borderWidth: 1,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  shopName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  btnAdd: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '4%',
    right: '8%',
    backgroundColor: '#222',
  },
});

const OrderStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: windowWidth * 1,
    height: windowHeight * 0.2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  horizontalLine: {
    borderColor: '#999',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  content: {
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
  },
  headerText: {
    fontSize: windowWidth * 0.06,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: windowHeight * 0.02,
    height: windowHeight * 0.06,
    borderRadius: 10,
    borderWidth: 0.5,
    elevation: 5,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: windowWidth * 0.04,
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: windowWidth * 0.04,
    left: '30%',
    fontSize: windowWidth * 0.04,
    color: 'black',
  },
});

export {MyProductStyles, OrderStyles};
