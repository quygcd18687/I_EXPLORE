import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import 'react-native-gesture-handler';


import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Picker
} from 'react-native';



import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';
import firebaseConfig from '../firebase';


export default function Form({ navigation }) {

    const [activityName, setActivityName] = useState(null);
    const [location, setLocation] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [desription, setDesription] = useState(null);
    const [name, setName] = useState(null);

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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
            console.log("\nFirebase connection successful!!!")
        }
        getData();

    }, [])

    ////Addn 
    function addDataBase(activityName, location, date, time, name, desription) {

        firebase.database().ref('userDatas/').push().set({
            ActivityName: activityName,
            Location: location,
            Date: new Date(date).toDateString(),
            Time: time,
            Name: name,
            Desription: desription
        }, function (error) {
            if (error) {

                alert('Submit fail!')
            } else {
                alert('Submit Successfully!')
            }
        });

    }
    const getData = () => {
        firebase
            .database()
            .ref('userDatas/')
            .on('value', function (snapshot) {
                let arrayDb = [];
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    arrayDb.push({
                        id: childSnapshot.key,
                        activityName: childData.ActivityName,
                        location: childData.Location,
                        date: childData.Date,
                        time: childData.Time,
                        name: childData.Name,
                        desription: childData.Desription
                    });
                });
                setData(arrayDb);
            });

    };


    const saveData = () => {
        const itemDb = data?.filter((itemDb) => {
            if (
                itemDb.activityName !== activityName
            ) {
                return false;
            } else {
                return true;
            }
        });

        if (!activityName) {
            alert(' Please enter Activity Name field !!')

        } else if (!location) {

            alert('Please enter Location field !!')
        } else if (!time) {

            alert('Please enter Time field !!')
        } else if (time < 1) {

            alert(' Activity time must be greater than or equal to 1')
        } else if (isNaN(time)) {

            alert('Activity time must enter the value is numbers !!!')
        } else if (!name) {

            alert('Please enter Reporter Name field!')
        } else if (itemDb[0])
            return Alert.alert('checkDuplicate', 'Information already in Database!!1');

        else {
            var value = {
                "activityName": activityName,
                "location": location,
                "date": date,
                "time": time,
                "name": name,
                "desription": desription,
            }

            Alert.alert('Do you want to submit?', 'Data: ' + JSON.stringify(value, null, '\t'), [


                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        addDataBase(activityName, location, date, time, name, desription)
                        navigation.goBack("Home");
                    },

                },
            ])


        }

    }

    ///////////////////////////
    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 20 }}>
                <View style={styles.rowInput} >
                    <Text style={styles.tx} > Activity Name: </Text>
                    <TextInput style={styles.enter}
                        placeholder='Activity Name'
                        onChangeText={(text) => { setActivityName(text) }}
                        value={activityName}
                        maxLength={30}
                        selectedValue={activityName} />
                </View >

                <View style={styles.rowInput} >
                    < Text style={styles.tx}> Location: </Text>
                    < Picker selectedValue={location}
                        style={{ marginStart: 85, height: 50, width: 150, }}
                        onValueChange={(itemType) => setLocation(itemType)}
                        value={location} >
                        < Picker.Item label="__Select__" />
                        <Picker.Item label="Da Nang"
                            value="Da Nang" />
                        <Picker.Item label="TP. Ho Chi Minh"
                            value="TP. Ho Chi Minh" />
                        <Picker.Item label="Ha Tinh"
                            value="Ha Tinh" />
                        <Picker.Item label="Ha Noi"
                            value="Ha Noi" />
                    </Picker>
                </View >

                <View style={styles.rowInput}>
                    <Text style={styles.tx} >Date: </Text>
                    <TouchableOpacity style={styles.enter}
                        onPress={showDatepicker}
                        placeholder='Date'
                        onChangeText={(date) => { setDate(date) }}
                        selectedValue={date}
                        value={date}
                    >
                        <Text>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    {show && (<
                        DateTimePicker testID="dateTimePicker"
                        value={date}
                        display="default"
                        maximumDate={Date.now()}
                        onChange={onChange} />
                    )}
                </View>


                < View style={styles.rowInput} >
                    <Text style={styles.tx} > Time Of Attending: </Text>
                    <TextInput style={styles.enter}
                        keyboardType='numeric'
                        maxLength={10}
                        placeholder='Time(h)'
                        onChangeText={
                            (text) => { setTime(text) }
                        }
                        value={time} />
                </ View >

                <View style={styles.rowInput} >
                    <Text style={styles.tx} > Repoter Name: </Text>
                    <TextInput style={styles.enter}
                        placeholder='Repoter Name'
                        onChangeText={(text) => { setName(text) }}
                        value={name}
                        maxLength={15}
                        selectedValue={name} />
                </View >

                <View style={styles.rowInput} >
                    <Text style={styles.tx} > Desription: </Text>
                    <TextInput style={styles.textArea}
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid="transparent"
                        placeholder='Desription'
                        onChangeText={
                            (text) => { setDesription(text) }
                        }
                        value={desription}
                        maxLength={50} />
                </ View >

                <TouchableOpacity style={styles.btn}
                    onPress={() => { saveData() }}>
                    <Text style={{ fontSize: 16 }}>
                        Submit
                    </Text>
                </TouchableOpacity >
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    enter: {
        width: "80%",
        padding: 7,
        borderWidth: 1,
        marginStart: 40,
        borderRadius: 5
    },
    textArea: {
        width: "80%",
        padding: 7,
        borderWidth: 1,
        marginStart: 40,
        marginBottom: 20,
        borderRadius: 5
    },
    btn: {
        width: 120,
        backgroundColor: '#2D31FA',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    rowInput: {
        margin: 20
    },
    tx: {
        fontSize: 16,
        margin: 15
    },
    textAreaInput: {
        width: 100
    }
});