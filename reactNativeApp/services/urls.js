import { Platform } from 'react-native';

export const API_URL = Platform.select({
  ios: 'http://localhost:3000/', 
  android: 'http://10.0.2.2:3000/' 
});