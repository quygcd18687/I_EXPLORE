import React from 'react';
import {
  Button,Image, ImageBackground,StyleSheet, 
  Text, View, TouchableOpacity,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Form from './Screens/Form';
import Detail from './Screens/Detail';


const Stack = createNativeStackNavigator();

function Home({ navigation }) {

  return (
    <ImageBackground source={require('./assets/rentalBackground.jpg')} resizeMode="cover" style={styles.backImage}>
    <View style={styles.container}>
      
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 200, }}>
        <View style={styles.V_button}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Form')
            }}
            style={styles.btn}
          >
            <Text style={{fontSize: 20, color: '#FEFBF3'}}>Create from</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.V_button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail')
            }}
            style={styles.btn}
          >
            <Text style={{fontSize: 20, color: '#FEFBF3'}}>Detail datas</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
    </ImageBackground>
  );
}
const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',


  },
  btn: {
    height: 40,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C527F'
  },
  V_button: {
    padding: 15,
    width: 150,
    justifyContent: 'center',
  },
  backImage:{
    flex: 1,
    justifyContent: "center",
    
  }

});

export default App;
