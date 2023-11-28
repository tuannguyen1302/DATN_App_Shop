import {Alert, PermissionsAndroid, Platform} from 'react-native';

const requestCameraPermission = async () => {
  if (Platform.OS !== 'android' || Platform.Version <= 22) {
    return true;
  }

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

export default requestCameraPermission;
