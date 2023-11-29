import {StyleSheet} from 'react-native';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  avatarShop: {
    width: 45,
    height: 45,
    borderColor: 'green',
    borderWidth: 1,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginLeft: 10,
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  btnAdd: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '4%',
    right: '8%',
    backgroundColor: '#222',
  },
});

export default HomeStyle;
