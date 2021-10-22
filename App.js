import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

import {
  StyleSheet, Text, View, TextInput,
  Button, TouchableOpacity, FlatList, Alert,
  ScrollView, Dimensions, Picker
} from 'react-native';
import firebase from 'firebase/app';
import Logb1 from './Screens/logb1'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export default function App() {

  const [property, setProperty] = useState(null)
  const [bedroom, setBedroom] = useState(null)
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(null)
  const [type, setType] = useState(null)
  const [note, setNote] = useState(null)
  const [name, setName] = useState(null)

  const [data, setData] = useState([])
  ///OpenDate

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    console.log({ event, selectedDate })
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  /////

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyB10pcZBngk_gEyVJ4Pn-anCmMnKsq5zJw",
      authDomain: "rentalz-59131.firebaseapp.com",
      databaseURL: "https://rentalz-59131-default-rtdb.firebaseio.com",
      projectId: "rentalz-59131",
      storageBucket: "rentalz-59131.appspot.com",
      messagingSenderId: "784254174104",
      appId: "1:784254174104:web:b448deccd4ef3058c6e1ed",
      measurementId: "G-K6SYRSYD26"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      console.log("\nFirebase connection successful!!!")
    }
    GetData();

  }, [])

  ////Addn 
  function addDataBase(property, bedroom, date, price, type, note, name) {

    firebase.database().ref('userDatas/').push().set({
      Property: property,
      Bedroom: bedroom,
      Date: new Date(date).toDateString(),
      Price: price,
      Type: type,
      Note: note,
      Name: name,
    }, function (error) {
      if (error) {

        alert('Submit fail!')
      }


      else {
        alert('Submit Successfully!')
      }
    });

  }
  const GetData = () => {
    firebase.database().ref('users/').on('value', function (snapshot) {

      let array = [];
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          id: childSnapshot.key,
          property: childData.property,
          bedroom: childData.bedroom,
          date: childData.date,
          price: childData.price,
          type: childData.type,
          note: childData.note,
          name: childData.name,

        });
      });
      // console.log(array)
      setData(array)

    });
  }

  //Delete
  // function deleteDataBase(id) {
  //   firebase.database().ref('users/' + id).remove()
  //   alert("Delete Successfully!  !!!")
  // }

  ////Get
  // const get_Data = () => {
  //   firebase.database().ref('users/').on('value', function (snapshot) {
  //     let array = [];
  //     snapshot.forEach(function (childSnapshot) {
  //       var childData = childSnapshot.val();
  //       array.push({
  //         id: childSnapshot.key,
  //         bedroom: childData.Bedroom,
  //         date: childData.Date,
  //         price: childData.Price,
  //         type: childData.Type,
  //         note: childData.Note,
  //         name: childData.Name,
  //         property: childData.Property,
  //       });
  //     });
  //     console.log(array)
  //   });
  // }
  ///Valisator/////

  const saveData = () => {


    if (!property) {

      alert('Please enter Property field!')
    }

    else if (!bedroom) {

      alert('Please enter Bedroom field!')
    }

    else if (!price) {

      alert('Please enter Price field!')
    }
    else if (!type) {

      alert('Please enter Type field!')
    }
    else if (!name) {

      alert('Please enter Reporter Name field!')
    }
    else {
      var value = 
        {"property": property,
        "furniture": type,
        "bedroom": bedroom,
        "price": price,
        "date": date,
        "note": note,
        "name": name,
      }

      Alert.alert('Do you want to submit?', 'Data: '+JSON.stringify(value, null, '\t'),
        [


          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => {
              addDataBase(property, bedroom, date, price, type, note, name)

            },

          },
        ]
      )
      
      
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={{ fontSize: 30, color: '#fff', fontWeight: "bold", }}>RentalZ App</Text>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.dropDown}>
          <Text style={styles.tx}>Property:</Text>
          <Text style={styles.tx}>Flat</Text>
          <RadioButton
            value="Flat"
            status={property === 'Flat' ? 'checked' : 'unchecked'}
            onPress={() => setProperty('Flat')}

          />
          <Text style={styles.tx}>House</Text>
          <RadioButton

            value="House"
            status={property === 'House' ? 'checked' : 'unchecked'}
            onPress={() => setProperty('House')}
          />
          <Text style={styles.tx}>Bungalow</Text>
          <RadioButton

            value="Bungalow"
            status={property === 'Bungalow' ? 'checked' : 'unchecked'}
            onPress={() => setProperty('Bungalow')}
          />
        </View>

        <View style={styles.dropDown}>
          <Text style={styles.tx}>BedRooms:</Text>
          <Picker
            style={{ marginStart: 85, height: 50, width: 190, }}
            onValueChange={(itemBedroom) => setBedroom(itemBedroom)}
            value={bedroom}
            selectedValue={bedroom}
          >
            <Picker.Item label="__Select__" />
            <Picker.Item label="One" value="Two" />
            <Picker.Item label="Two" value="Three" />
            <Picker.Item label="Three" value="Four" />
          </Picker>
        </View>

        <View style={styles.rowInput}>
          <Text style={styles.tx}>Date: </Text>
          <TouchableOpacity style={styles.enter}
            onPress={showDatepicker}
            placeholder='Date' onChangeText={(date) => { setDate(date) }}
            selectedValue={date}
            value={date}
          >
            <Text>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              display="default"
              maximumDate={Date.now()}
              onChange={onChange}
            />
          )}
        </View>


        <View style={styles.rowInput}>
          <Text style={styles.tx}>Price: </Text>
          <TextInput style={styles.enter}
            keyboardType='numeric'
            placeholder='Price($/M)'
            onChangeText={(text) => { setPrice(text) }}
            value={price}
          />
          <Text></Text>
        </View>

        <View style={styles.dropDown}>
          <Text style={styles.tx}>Furniture types:</Text>
          <Picker
            selectedValue={type}
            style={{ marginStart: 85, height: 50, width: 150, }}
            onValueChange={(itemType) => setType(itemType)}
            value={type}
          >
            <Picker.Item label="__Select__" />
            <Picker.Item label="Furnished" value="Furnished" />
            <Picker.Item label="Unfurnished" value="Unfurnished" />
            <Picker.Item label="Part Furnished" value="Part Furnished" />
          </Picker>
        </View>

        <View style={styles.rowInput}>
          <Text style={styles.tx}>Notes: </Text>
          <TextInput style={styles.textArea}
            multiline={true}
            numberOfLines={3}
            underlineColorAndroid="transparent"
            placeholder='Notes' onChangeText={(text) => { setNote(text) }}
            value={note} maxLength={50}
          />
        </View>


        <View style={styles.rowInput}>
          <Text style={styles.tx}>Name: </Text>
          <TextInput style={styles.enter}
            placeholder='Reporter Name' onChangeText={(text) => { setName(text) }}
            value={name}
            selectedValue={name}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => {
          saveData()
        }}>
          <Text > Submit</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.del} onPress={() => {
          deleteDataBase(property, bedroom, date, price, type, note, name)
        }}>
          <Text >Delete: </Text>
        </TouchableOpacity> */}
      </ScrollView>


      <View
        style={styles.statusbar}>
        <Text style={{ color: '#F3F1F5' }}>Nguyen The Quy                         GCD18687</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
  },
  enter: {
    width: "50%",
    padding: 7,
    borderWidth: 1,
    marginStart: 80,
    marginBottom: 20,

  },
  textArea: {
    width: "50%",
    padding: 7,
    borderWidth: 1,
    marginStart: 80,
    marginBottom: 20,
    justifyContent: "flex-start"
  },
  btn: {
    backgroundColor: '#77ACF1',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
  },
  rowInput: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  dropDown: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  del: {
    backgroundColor: '#77ACF1',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 60,
  },

  tx: {

    textDecorationColor: '#fff',
    marginStart: 20,
    marginTop: 10,
  },
  statusbar: {
    height: 50,
    backgroundColor: '#334756',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    backgroundColor: '#334756'
  }
});
