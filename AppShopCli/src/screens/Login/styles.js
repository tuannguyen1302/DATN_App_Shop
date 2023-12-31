import {StyleSheet} from 'react-native';
import {height, width} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';

const Login1Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: width,
    height: height / 3.3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 40,
    fontFamily: fontFamily.blackFont,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '5%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 12,
    height: 64,
    marginHorizontal: '5%',
    marginBottom: '8%',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  passwordButton: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    borderRadius: 30,
    height: 65,
    marginHorizontal: '5%',
    marginTop: '7%',
  },
  passwordButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  separatorContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  separator: {
    borderWidth: 0.5,
    width: 150,
    height: 1,
  },
  separatorText: {
    fontSize: 22,
  },
  signupContainer: {
    marginTop: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 18,
    color: '#7B7070',
  },
  signupLink: {
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

const Login2Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 45,
    color: '#222',
    fontWeight: '700',
    textAlign: 'center',
  },
  inputField: {
    padding: 10,
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
    marginBottom: 27,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  inputFieldText: {
    flex: 1,
    marginLeft: 10,
    color: '#000000',
    fontSize: 18,
  },
  eyeIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  checkBox: {
    backgroundColor: 'white',
    borderWidth: 0,
    right: '5%',
  },
  signInButton: {
    backgroundColor: 'black',
    height: 60,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '5%',
  },
  signInButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  forgotPassword: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: '5%',
  },
  orContinueWith: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderWidth: 0.2,
    width: 100,
    height: 1,
    color: '#D9D9D9',
    marginHorizontal: '2%',
  },
  orContinueWithText: {
    color: '#585555',
    fontSize: 18,
  },
  socialButtonsContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 82,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  signUpLinkContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLinkText: {
    fontSize: 18,
    color: '#7B7070',
    alignSelf: 'center',
  },
  signUpLink: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

const SignUpStyle = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    padding: 10,
    marginHorizontal: '5%',
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  inputFieldText: {
    flex: 1,
    marginLeft: 10,
    color: '#000000',
    fontSize: 18,
  },
  eyeIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginLeft: '6%',
  },
  signUpButton: {
    backgroundColor: 'black',
    height: 60,
    marginHorizontal: '5%',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '5%',
  },
  signUpButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  orContinueWith: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderWidth: 0.2,
    width: 100,
    height: 1,
    color: '#D9D9D9',
    marginHorizontal: '2%',
  },
  orContinueWithText: {
    color: '#585555',
    fontSize: 18,
  },
  socialButtonsContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 82,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  signUpLinkContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLinkText: {
    fontSize: 18,
    color: '#7B7070',
    alignSelf: 'center',
  },
  signUpLink: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export {Login1Style, Login2Style, SignUpStyle};
