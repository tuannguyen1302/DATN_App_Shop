import {StyleSheet} from 'react-native';

const MessageScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    width: '70%',
  },
  timeText: {
    fontSize: 15,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const MessageItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    justifyContent: 'space-between',
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    right: '15%',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: '2%',
    backgroundColor: '#19B9EC',
  },
});

export {MessageScreenStyles, MessageItemStyles};
