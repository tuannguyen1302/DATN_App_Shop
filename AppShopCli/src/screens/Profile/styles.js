import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    marginVertical: windowHeight * 0.05,
    marginHorizontal: windowWidth * 0.05,

  },
  headerText: {
    fontSize: windowWidth * 0.06,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: windowHeight * 0.03,
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
    marginHorizontal: windowWidth * 0.06,
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

export default ProfileStyles;
