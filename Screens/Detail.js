import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'



import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';
import firebaseConfig from '../firebase';


const Detail = () => {

    const [data, setData] = useState();
    const navigation = useNavigation();

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        getData();
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Form")} style={{
                    backgroundColor: 'purple',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 30,
                        textAlign: 'center',
                        color: "#ddd",
                        marginBottom: 3
                    }}
                    >+</Text>
                </TouchableOpacity>

            ),
            headerSearchBarOptions: {
                placeholder: 'Activity',
                onChangeText: (e) => {
                    searchFilterFunction(e.nativeEvent.text);
                },
            }
        })

    }, [navigation])


    const searchFilterFunction = (text) => {
        setData({

        })
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
                        desription: childData.Desription,
                    });
                });
                setData(arrayDb);

            });

    };

    function deleteDB(id) {
        Alert.alert('Delete', 'Do you want to delete? ',
            [


                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => firebase.database().ref('userDatas/' + id).remove()
                        + alert('Delete Successfully!!')

                },
            ]
        )

    };

    const ViewData = () => {
        return data?.map((item, index) => {
            return (
                <View key={index} style={styles.itemBb}>
                    <Text style={styles.fieldText}>Activity Name: {item.activityName}</Text>
                    <Text style={styles.fieldText}>Location: {item.location}</Text>
                    <Text style={styles.fieldText}>Date: {item.date}</Text>
                    <Text style={styles.fieldText}>Times: {item.time}</Text>
                    <Text style={styles.fieldText}>Reporter name: {item.name}</Text>
                    <Text style={styles.fieldText}>Desription: {item.desription}</Text>
                    <View style={styles.functionRow}>
                        <TouchableOpacity
                            style={styles.deteleBtn}
                            onPress={() => {
                                deleteDB(item.id)
                            }}
                        >
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            );

        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.viewItem}>
                <View>{ViewData()}</View>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemBb: {
        width: 300,
        margin: 20,
        borderWidth: 1,
        borderRadius: 5
    },
    fieldText: {
        fontSize: 20,
        marginStart: 40

    },
    functionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    deteleBtn: {
        width: 65,
        padding: 10,
        borderWidth: 1,
        margin: 20
    },

});
export default Detail;