import React from 'react';
import {
  Button,
  Image,
  StyleSheet, Text, useColorScheme, View, ViewPagerAndroidBase,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Form from './Screens/Form'
import Detail from './Screens/Detail'


const Stack = createNativeStackNavigator();
function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('./assets/HomeLogo.png')}
      />
      <View style={styles.V_button}>
        <Button title='Go to Form'
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Form')
          }} />
      </View>

      {/* <View style={styles.V_button}>
        <Button title='View Data'
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Detail')
          }}
        />
      </View> */}

    </View>
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
    alignItems: 'center'

  },
  btn: {
    fontSize: 24,
    margin: 20,

  },
  V_button: {
    padding: 15,
    width: 150,
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: '400',

  },
  logo: {
    width: 300,
    height: 300,
  },

});

export default App;
