import React from 'react';
import {
  StyleSheet,
  Text, View, TouchableOpacity
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
        <TouchableOpacity
          onPress={() => navigation.navigate("Form")}
          style={styles.createBtn}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}
          >+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailBtn} onPress={() => { navigation.navigate('Detail') }}>
          <Text style={{ fontSize: 18,  }}>more</Text>
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
    backgroundColor: '#DFDFDE'
  },
  navbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: '10%'
  },
  ViewData: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22577E',
    margin: 30,
    marginRight: 100
  },
  detailBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22577E',
    marginTop: 30,
    marginLeft: 100,
  }
});

export default App;
