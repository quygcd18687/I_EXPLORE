import React from 'react';
import {
  StyleSheet,
  Text, View, TouchableOpacity, ScrollView
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Form from './Screens/Form';
import Detail from './Screens/Detail';
import ViewData from './Screens/Detail';



const Stack = createNativeStackNavigator();

function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Form') }}>
          <Text style={{ fontSize: 18, color: '#FEFBF3' }}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Detail') }}>
          <Text style={{ fontSize: 18, color: '#FEFBF3' }}>Detail</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ViewData}>
        <View >{ViewData()}</View>
      </View>
    </View>
  );
};
const App = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="I-Explore" component={Home} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>


  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  navbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: 50,
  },
  btn: {
    height: '80%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C527F',
    marginTop: 40,
    marginLeft: 20,
    borderRadius: 10,
  },
  ViewData: {
    marginTop: 50
  }
});

export default App;
