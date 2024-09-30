// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar, Image, Platform } from 'react-native';
import AllPosts from './components/AllPosts';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MD<Text style={styles.logoColor}>and</Text>Me Community</Text>
      <AllPosts/>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Platform.OS === 'ios'?  40:0
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
    color: '#949494'
    
  },
  logoColor: {
    color: "#8c98ff"
  }
});
