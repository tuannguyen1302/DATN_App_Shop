import {Alert, PermissionsAndroid, Platform} from 'react-native';

const requestPermission = async () => {
  if (Platform.OS !== 'android' || Platform.Version <= 22) {
    return true;
  }

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    if (
      Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      )
    ) {
      return true;
    } else {
      showPermissionAlert();
      return false;
    }
  } catch (error) {
    return false;
  }
};

const showPermissionAlert = () => {
  Alert.alert('Alert', 'Permission', [{text: 'OK'}], {cancelable: true});
};

export default requestPermission;
