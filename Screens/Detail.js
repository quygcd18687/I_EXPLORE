import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import 'react-native-gesture-handler';


import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';
import firebaseConfig from '../firebase';


const Detail = () => {

    const [item, setItem] = useState();

    useEffect(() => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        getData();
    }, [])


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
                        property: childData.Property,
                        bedroom: childData.Bedroom,
                        date: childData.Date,
                        price: childData.Price,
                        type: childData.Type,
                        note: childData.Note,
                        name: childData.Name,
                    });
                });
                setItem(arrayDb);

            });

    };
    // function updateDataBase(id, property, bedroom, date, price, type, note, name) {
    //     firebase.database().ref('users/' + id).set({

    //         Property: property,
    //         Bedroom: bedroom,
    //         Date: new Date(date).toDateString(),
    //         Price: price,
    //         Type: type,
    //         Note: note,
    //         Name: name
    //     },  function (error) {
    //         if (error) {

    //           alert('Update fail!')
    //         }


    //         else {
    //           alert('Update Successfully!')
    //         }
    //     });

    //   };

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
        return item?.map((item, index) => {
            return (
                <View key={index} style={styles.itemBb}>
                    <Text style={styles.fieldText}>Property type: {item.property}</Text>
                    <Text style={styles.fieldText}>Bedroom: {item.bedroom}</Text>
                    <Text style={styles.fieldText}>Date: {item.date}</Text>
                    <Text style={styles.fieldText}>Price: {item.price}</Text>
                    <Text style={styles.fieldText}>Furniture type: {item.type}</Text>
                    <Text style={styles.fieldText}>Notes: {item.note}</Text>
                    <Text style={styles.fieldText}>Reporter name: {item.name}</Text>
                    <View style={styles.functionRow}>
                        {/* <TouchableOpacity
                            style={styles.updateBtn}
                            onPress={() => {
                                updateDataBase(item.id)
                            }}
                        >
                            <Text>Update</Text>
                        </TouchableOpacity> */}
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
            <ScrollView>
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
        width: 350,
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,

    },
    fieldText: {
        fontSize: 20,
        marginStart: 10

    },
    functionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    deteleBtn: {
        width: 65,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        margin: 20
    },
    updateBtn: {
        width: 70,
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        margin: 20
    }


});
export default Detail;